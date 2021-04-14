import { Component } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { GuidService } from '../guid.service';
import { Tidbit } from './tidbits.model';

@Component({
  selector: 'app-tidbits',
  templateUrl: './tidbits.component.html',
  styleUrls: ['./tidbits.component.scss'],
})
export class TidbitsComponent {
  tidbits$ = this.afs
    .collection<Tidbit>('tidbits', (ref) => ref.orderBy('timestamp', 'desc'))
    .snapshotChanges();

  public isIOS =
    /iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  constructor(public guid: GuidService, private afs: AngularFirestore) {}

  delete(item: DocumentChangeAction<Tidbit>) {
    item.payload.doc.ref.delete();
  }
}
