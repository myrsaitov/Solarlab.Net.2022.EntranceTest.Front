import {ICongratulation} from './i-congratulation';

export class GetPagedContentResponseModel {
    public total: number;
    public limit: number;
    public offset: number;
    public items: ICongratulation[];
}