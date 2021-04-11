import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GuidService } from '../guid.service';
import { Tidbit } from '../tidbits/tidbits.model';

import firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.scss'],
})
export class AddMemoryComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  form = this.fb.group({
    name: [''],
    text: ['', Validators.required],
    file: [''],
  });

  public task: undefined | AngularFireUploadTask;
  public uploadProgress$: undefined | Observable<number | undefined>;
  public downloadURL$: Observable<any> = new Subject<any>().asObservable();
  public storageRef: undefined | AngularFireStorageReference;
  public uploading = false;
  public sizeError: string | undefined;

  private tidbitsCollection: AngularFirestoreCollection<Tidbit>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMemoryComponent>,
    private guid: GuidService,
    private afStorage: AngularFireStorage,
    afs: AngularFirestore
  ) {
    this.tidbitsCollection = afs.collection<Tidbit>('tidbits');
  }

  ngOnInit(): void {}

  submit($event: Event): void {
    if (this.form.invalid || this.uploading) {
      $event.stopPropagation();
      return;
    }
    // process the form
    const formValues = this.form.getRawValue();
    const tidbit: Tidbit = {
      name: formValues.name === '' ? 'anonymous' : formValues.name,
      text: formValues.text,
      guid: this.guid.GUID,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (this.storageRef) {
      this.downloadURL$.pipe(take(1)).subscribe((url) => {
        tidbit.imageURL = url as string;
        this.tidbitsCollection.add(tidbit);
        this.dialogRef.close();
      });
    } else {
      this.tidbitsCollection.add(tidbit);
      this.dialogRef.close();
    }
  }

  upload(event: any) {
    this.uploading = false;
    this.sizeError = undefined;
    this.storageRef = undefined;
    if (event.target && event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 2 * 1024 * 1024) {
        this.sizeError = 'This file is too large to upload';
        return;
      }
      const randomId = Math.random().toString(36).substring(2);
      this.storageRef = this.afStorage.ref(randomId);
      const task = this.storageRef.put(event.target.files[0]);
      this.uploading = true;
      this.uploadProgress$ = task.percentageChanges();

      // get notified when the download URL is available
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            if (this.storageRef) {
              this.downloadURL$ = this.storageRef.getDownloadURL();
            }
            this.uploading = false;
          })
        )
        .subscribe();
    }
  }
}
