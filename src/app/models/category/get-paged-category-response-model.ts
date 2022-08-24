import {ICategory} from './category-model';

export class GetPagedCategoryResponseModel {
    public total: number;
    public limit: number;
    public offset: number;
    public items: ICategory[];
}