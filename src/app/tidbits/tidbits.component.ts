import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tidbit } from './tidbits.model';

@Component({
  selector: 'app-tidbits',
  templateUrl: './tidbits.component.html',
  styleUrls: ['./tidbits.component.scss'],
})
export class TidbitsComponent {
  tidbits$ = this.afs
    .collection<Tidbit>('tidbits', (ref) => ref.orderBy('timestamp', 'desc'))
    .valueChanges();
  constructor(private afs: AngularFirestore) {}
}
