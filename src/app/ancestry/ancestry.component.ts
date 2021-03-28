import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ancestry',
  templateUrl: './ancestry.component.svg',
  styleUrls: ['./ancestry.component.scss'],
})
export class AncestryComponent implements OnInit {
  constructor() {}

  size = 5;

  chart = {
    self: {
      name: 'Me',
      gender: 'self',
      checked: false,
      y: 60,
      x: 45,
      count: 0,
    },
    parents: {
      y: 45,
      people: [
        {
          name: 'Father',
          gender: 'male',
          x: 22,
          checked: false,
          count: 0,
        },
        {
          name: 'Mother',
          gender: 'female',
          x: 68,
          checked: false,
          count: 0,
        },
      ],
    },
    grandparents: {
      y: 30,
      people: [
        {
          name: 'Grandfather',
          gender: 'male',
          x: 10.5,
          checked: false,
          count: 0,
        },
        {
          name: 'Grandmother',
          gender: 'female',
          x: 33.5,
          checked: false,
          count: 0,
        },
        {
          name: 'Grandfather',
          gender: 'male',
          x: 56.5,
          checked: false,
          count: 0,
        },
        {
          name: 'Grandmother',
          gender: 'female',
          x: 79.5,
          checked: false,
          count: 0,
        },
      ],
    },
    greatGrandparents: {
      y: 15,
      people: [
        {
          name: 'Great Grandfather',
          gender: 'male',
          x: 5,
          checked: false,
          count: 0,
        },
        {
          name: 'Great Grandmother',
          gender: 'female',
          x: 16,
          checked: false,
          count: 0,
        },
        {
          name: 'Great Grandfather',
          gender: 'male',
          x: 28,
          checked: false,
          count: 0,
        },
        {
          name: 'Great Grandmother',
          gender: 'female',
          x: 39,
          checked: false,
          count: 0,
        },
        {
          name: 'Great Grandfather',
          gender: 'male',
          x: 51,
          checked: false,
          count: 0,
        },
        {
          name: 'Great Grandmother',
          gender: 'female',
          x: 62,
          checked: false,
          count: 0,
        },
        {
          name: 'Great Grandfather',
          gender: 'male',
          x: 74,
          checked: false,
          count: 0,
        },
        {
          name: 'Great Grandmother',
          gender: 'female',
          x: 85,
          checked: false,
          count: 0,
        },
      ],
    },
  };

  ngOnInit(): void {}
}
