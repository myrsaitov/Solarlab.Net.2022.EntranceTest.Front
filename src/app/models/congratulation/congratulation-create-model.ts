import { IUserFile } from "../user-files/userfile-model";

export interface ICreateCongratulation {
  title: string;
  body: string;
  price: number;
  categoryId: number;
  regionId: number;
  address: string;
  tagBodies: string[];
  status: number;
  userFiles: IUserFile[];
}

export class CreateCongratulation implements ICreateCongratulation {
  title: string;
  body: string;
  price: number;
  categoryId: number;
  regionId: number;
  address: string;
  tagBodies: string[];
  status: number;
  userFiles: IUserFile[];

  constructor(
    data?: Partial<ICreateCongratulation>) {
    const defaults: ICreateCongratulation = {
      title: '',
      body: '',
      price: 0,
      categoryId: null,
      regionId: 1,
      address: '',
      tagBodies: [],
      status: 0,
      userFiles: [],
      ...data
    };
    this.title = defaults.title;
    this.body = defaults.body;
    this.price = defaults.price;
    this.categoryId = defaults.categoryId;
    this.regionId = defaults.regionId;
    this.address = defaults.address;
    this.tagBodies = defaults.tagBodies;
    this.status = defaults.status;
    this.userFiles = defaults.userFiles;
  }
}