import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuidService {
  GUID: string;
  constructor() {
    let guid = localStorage.getItem('GUID');
    if (!guid) {
      guid = this.guidGenerator();
      localStorage.setItem('GUID', guid);
    }
    this.GUID = guid;
  }

  private guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }
}
