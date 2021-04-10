import firebase from 'firebase/app';

export interface Tidbit {
  name: string;
  text: string;
  guid: string;
  timestamp: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
}
