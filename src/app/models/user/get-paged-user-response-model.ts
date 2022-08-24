import { IUser } from "./user-model";

export class GetPagedUserResponseModel {
    public total: number;
    public limit: number;
    public offset: number;
    public items: IUser[];
}