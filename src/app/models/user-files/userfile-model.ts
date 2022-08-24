import { SafeResourceUrl } from "@angular/platform-browser";

export interface IUserFile  {
  
  // Идентификатор файла в базе
  id?: number;

  // Ссылка на файл в облаке
  filePath: string;

  // Идентификатор файла на форме UI
  fileIdOnForm?: number;
  
  // Безопасная ссылка, см. https://angular.io/api/platform-browser/DomSanitizer#description
  tmpPreviewUri: SafeResourceUrl;
  
  // Идентификатор поздравления, к которому относится этот файл
  congratulationId?: number;

  // Пользователь, который загрузил файл
  ownerId: string;

  // Массив данных файла
  content: any;

  // Массив данных файла
  contentBase64: string;

  // FormFile Headers
  // The form field name from the Content-Disposition header.
  name: string;
  // The file name from the Content-Disposition header.
  fileName: string;
  // The raw Content-Type header of the uploaded file.
  contentType: string;
  // The raw Content-Disposition header of the uploaded file.
  contentDisposition: string;
  // The file length in bytes.
  length: number;
}

export class UserFile implements IUserFile {
  id?: number;
  filePath: string;
  fileIdOnForm?: number;
  tmpPreviewUri: SafeResourceUrl;
  congratulationId?: number;
  ownerId: string;
  content: any;
  contentBase64: string;
  name: string;
  fileName: string;
  contentType: string;
  contentDisposition: string;
  length: number;
  
  constructor(
    data?: Partial<IUserFile>) {
    const defaults: IUserFile = {
      id: null,
      filePath: '',
      fileIdOnForm: null,
      tmpPreviewUri: '',
      congratulationId: null,
      ownerId: '',
      content: null,
      contentBase64: '',
      name: '',
      fileName: '',
      contentType: '',
      contentDisposition: '',
      length: null,
      ...data
    };
    this.id = defaults.id;
    this.filePath = defaults.filePath;
    this.fileIdOnForm = defaults.fileIdOnForm;
    this.tmpPreviewUri = defaults.tmpPreviewUri;
    this.congratulationId = defaults.congratulationId;
    this.ownerId = defaults.ownerId;
    this.content = defaults.content;
    this.contentBase64 = defaults.contentBase64;
    this.name = defaults.name;
    this.fileName = defaults.fileName;
    this.contentType = defaults.contentType;
    this.contentDisposition = defaults.contentDisposition;
    this.length = defaults.length;
  }
}