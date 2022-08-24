import { IUserFile } from "./userfile-model";

export class GetPagedUserFilesResponseModel {
    public total: number;
    public limit: number;
    public offset: number;
    public items: IUserFile[];
}