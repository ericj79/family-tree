export interface Individual {
  name: string;
  gender: string;
  x: number;
}
export interface Level {
  [key: string]: {
    y: number;
    people: Individual[];
  };
}

export const graph: Level = {
  self: {
    people: [
      {
        name: 'Me',
        gender: 'self',
        x: 45,
      },
    ],
    y: 60,
  },
  parent: {
    y: 45,
    people: [
      {
        name: 'Father',
        gender: 'male',
        x: 22,
      },
      {
        name: 'Mother',
        gender: 'female',
        x: 68,
      },
    ],
  },
  grand: {
    y: 30,
    people: [
      {
        name: 'Paternal Grandfather',
        gender: 'male',
        x: 10.5,
      },
      {
        name: 'Paternal Grandmother',
        gender: 'female',
        x: 33.5,
      },
      {
        name: 'Maternal Grandfather',
        gender: 'male',
        x: 56.5,
      },
      {
        name: 'Maternal Grandmother',
        gender: 'female',
        x: 79.5,
      },
    ],
  },
  great: {
    y: 15,
    people: [
      {
        name: 'Great Grandfather',
        gender: 'male',
        x: 5,
      },
      {
        name: 'Great Grandmother',
        gender: 'female',
        x: 16,
      },
      {
        name: 'Great Grandfather',
        gender: 'male',
        x: 28,
      },
      {
        name: 'Great Grandmother',
        gender: 'female',
        x: 39,
      },
      {
        name: 'Great Grandfather',
        gender: 'male',
        x: 51,
      },
      {
        name: 'Great Grandmother',
        gender: 'female',
        x: 62,
      },
      {
        name: 'Great Grandfather',
        gender: 'male',
        x: 74,
      },
      {
        name: 'Great Grandmother',
        gender: 'female',
        x: 85,
      },
    ],
  },
};
