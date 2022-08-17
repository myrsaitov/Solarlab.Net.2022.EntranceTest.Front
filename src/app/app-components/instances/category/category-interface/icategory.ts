export interface ICategory {
  id: number;
  name: string;
  parentCategoryId: number;

}

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'День рождения',
    parentCategoryId: 0
  },
  {
    id: 2,
    name: 'День свадьбы',
    parentCategoryId: 0
  },
  {
    id: 3,
    name: 'День шахматиста',
    parentCategoryId: 0
  },
  {
    id: 4,
    name: 'День пожарника',
    parentCategoryId: 0
  }
];
