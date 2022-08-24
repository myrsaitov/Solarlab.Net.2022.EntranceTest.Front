import {IRegion} from './region-model';

export class GetPagedRegionResponseModel {
    public total: number;
    public limit: number;
    public offset: number;
    public items: IRegion[];
}