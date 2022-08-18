export interface ICategory {
  id: number;
  name: string;
  parentCategoryId: number;

}

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'Личные праздники',
    parentCategoryId: 0
  },
  {
    id: 2,
    name: 'Дни рождения',
    parentCategoryId: 1
  },
  {
    id: 3,
    name: 'Дни свадьбы',
    parentCategoryId: 1
  },
  {
    id: 4,
    name: 'Гражданские праздники',
    parentCategoryId: 0
  },
  {
    id: 5,
    name: 'День шахматиста',
    parentCategoryId: 4
  },
  {
    id: 6,
    name: 'День пожарника',
    parentCategoryId: 4
  },
  {
    id: 7,
    name: 'День рыбака',
    parentCategoryId: 4
  },
  {
    id: 8,
    name: 'Политические праздники',
    parentCategoryId: 0
  },
  {
    id: 9,
    name: 'День России',
    parentCategoryId: 8
  },
  {
    id: 10,
    name: 'День Конституции',
    parentCategoryId: 8
  },
  {
    id: 11,
    name: 'День флота',
    parentCategoryId: 8
  }
];
