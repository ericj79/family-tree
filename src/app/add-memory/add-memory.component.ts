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

  fileAttr = 'Choose File';
  public task: undefined | AngularFireUploadTask;
  public uploadProgress$: undefined | Observable<number | undefined>;
  public downloadURL$: Observable<any> = new Subject<any>().asObservable();
  public storageRef: undefined | AngularFireStorageReference;
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
    if (this.form.invalid) {
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
    if (
      event.target &&
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].size < 1024 * 1024
    ) {
      console.log(event.target.files[0].size);
      const randomId = Math.random().toString(36).substring(2);
      this.storageRef = this.afStorage.ref(randomId);
      const task = this.storageRef.put(event.target.files[0]);
      this.uploadProgress$ = task.percentageChanges();

      // get notified when the download URL is available
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            if (this.storageRef) {
              this.downloadURL$ = this.storageRef.getDownloadURL();
            }
          })
        )
        .subscribe();
    }
  }

  // uploadFileEvt(imgFile: any) {
  //   if (imgFile.target.files && imgFile.target.files[0]) {
  //     this.fileAttr = '';
  //     Array.from(imgFile.target.files).forEach((file: unknown) => {
  //       this.fileAttr += (file as File).name + ' - ';
  //     });

  //     // HTML5 FileReader API
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const image = new Image();
  //       image.src = e.target.result;
  //       image.onload = (rs) => {
  //         const imgBase64Path = e.target.result;
  //       };
  //     };
  //     reader.readAsDataURL(imgFile.target.files[0]);

  //     // Reset if duplicate image uploaded again
  //     this.fileInput.nativeElement.value = '';
  //   } else {
  //     this.fileAttr = 'Choose File';
  //   }
  // }
}
