import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GuidService } from '../guid.service';
import { graph } from './ancestry.static';

interface Counts {
  self: Array<{ [key: string]: string }>;
  parent: Array<{ [key: string]: string }>;
  grand: Array<{ [key: string]: string }>;
  great: Array<{ [key: string]: string }>;
}

@Component({
  selector: 'app-ancestry',
  templateUrl: './ancestry.component.html',
  styleUrls: ['./ancestry.component.scss'],
})
export class AncestryComponent implements OnInit, OnDestroy {
  size = 5;

  chart = graph;

  currentCounts: Counts = { self: [], parent: [], grand: [], great: [] };
  countsDoc: AngularFirestoreDocument<Counts>;
  destructor$: Subject<boolean> = new Subject();

  count$: Observable<Counts | undefined>;

  constructor(public guid: GuidService, private afs: AngularFirestore) {
    this.countsDoc = this.afs.doc('tree/counts');
    this.count$ = this.countsDoc.valueChanges();
  }

  ngOnDestroy() {
    this.destructor$.next(true);
    this.destructor$.complete();
  }

  ngOnInit(): void {
    this.count$.pipe(takeUntil(this.destructor$)).subscribe((data) => {
      console.log(data);
      if (data) {
        this.currentCounts = data;
      }
    });
  }

  getSize(item: { [key: string]: string }): number {
    return Object.keys(item).length;
  }

  onClick(level: string, index: number): void {
    console.log(level, index);
    switch (level) {
      case 'self':
      case 'parent':
      case 'grand':
      case 'great':
        const list = this.currentCounts[level][index];
        if (!list) {
          return;
        }
        const levelInfo = [...this.currentCounts[level]];
        if (list[this.guid.GUID]) {
          // remove it
          delete levelInfo[index][this.guid.GUID];
        } else {
          // add it
          levelInfo[index][this.guid.GUID] = new Date().toISOString();
        }
        this.countsDoc.update({ [level]: levelInfo });
        break;
    }
  }
}
