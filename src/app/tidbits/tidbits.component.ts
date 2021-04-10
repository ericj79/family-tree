import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Tidbit } from './tidbits.model';

@Component({
  selector: 'app-tidbits',
  templateUrl: './tidbits.component.html',
  styleUrls: ['./tidbits.component.scss'],
})
export class TidbitsComponent implements OnInit {
  tidbits$ = this.afs
    .collection<Tidbit>('tidbits', (ref) => ref.orderBy('timestamp', 'desc'))
    .valueChanges();
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {}
}
