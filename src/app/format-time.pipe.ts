import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/app';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(
    value: firebase.firestore.Timestamp | firebase.firestore.FieldValue
  ): string {
    const time = (value as firebase.firestore.Timestamp).toDate();
    return (
      time.toDateString() +
      ' ' +
      time.toLocaleString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
    );
  }
}
