export interface ICategory {
  id: number;
  name: string;
  parentCategoryId: number;
  childCategoriesId: number[];
  count: number;
}