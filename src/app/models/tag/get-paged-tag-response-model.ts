import { ITag } from "./tag-model";

export class GetPagedTagResponseModel {
    public total: number;
    public limit: number;
    public offset: number;
    public items: ITag[];
}