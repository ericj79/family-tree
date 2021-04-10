import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GuidService } from '../guid.service';
import { Tidbit } from '../tidbits/tidbits.model';

import firebase from 'firebase/app';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.scss'],
})
export class AddMemoryComponent implements OnInit {
  public form = this.fb.group({
    name: [''],
    text: ['', Validators.required],
  });

  private tidbitsCollection: AngularFirestoreCollection<Tidbit>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMemoryComponent>,
    private guid: GuidService,
    private afs: AngularFirestore
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

    console.log(tidbit);
    this.tidbitsCollection.add(tidbit);
    this.dialogRef.close();
  }
}
