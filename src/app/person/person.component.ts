import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-person]',
  templateUrl: './person.component.svg',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() size: number = 0;
  @Input() xPos: number = 0;
  @Input() yPos: number = 0;
  @Input() gender: string = 'female';
  @Input() name: string = '';
  @Input() level: string = 'great';

  constructor() {}

  ngOnInit(): void {}
}
