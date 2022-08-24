import { SafeResourceUrl } from "@angular/platform-browser";

export interface IThumbnailImage {
    id?: number;
    uri: SafeResourceUrl;
    file: any;
}

export class ThumbnailImage implements IThumbnailImage {
    id?: number;
    uri: SafeResourceUrl;
    file: any;
  
    constructor(
      data?: Partial<IThumbnailImage>) {
      const defaults: IThumbnailImage = {
        id: null,
        uri: '',
        file: null,
        ...data
      };
      this.id = defaults.id;
      this.uri = defaults.uri;
      this.file = defaults.file;
    }
  }