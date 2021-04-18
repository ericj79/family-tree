import { AfterViewInit, Component } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Platform } from '@angular/cdk/platform';
import { GuidService } from '../guid.service';
import { Tidbit } from './tidbits.model';

@Component({
  selector: 'app-tidbits',
  templateUrl: './tidbits.component.html',
  styleUrls: ['./tidbits.component.scss'],
})
export class TidbitsComponent implements AfterViewInit {
  tidbits$ = this.afs
    .collection<Tidbit>('tidbits', (ref) => ref.orderBy('timestamp', 'desc'))
    .snapshotChanges();

  public limitHeight: string | null = null;
  public alternateView =
    this.platform.IOS || this.platform.SAFARI || this.platform.WEBKIT;

  constructor(
    public guid: GuidService,
    private platform: Platform,
    private afs: AngularFirestore
  ) {}

  ngAfterViewInit() {
    if (this.alternateView && window.innerWidth >= 825) {
      this.limitHeight = document.getElementById('ancestryContent')
        ? document.getElementById('ancestryContent')?.offsetHeight.toString() +
          'px'
        : null;
      console.log(this.limitHeight);
    }
  }

  delete(item: DocumentChangeAction<Tidbit>) {
    item.payload.doc.ref.delete();
  }
}
