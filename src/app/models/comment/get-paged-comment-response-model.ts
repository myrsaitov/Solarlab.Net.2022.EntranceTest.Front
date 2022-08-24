import {IComment} from './i-comment';

export class GetPagedCommentResponseModel {
    public total: number;
    public limit: number;
    public offset: number;
    public items: IComment[];
}