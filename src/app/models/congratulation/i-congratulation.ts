import { OwnerModel } from "../owner/owner-model";

export interface ICongratulation {
  id: number;
  title: string;
  body: string;
  ownerId: string;
  categoryName: string;
  category: any;
  price: number;
  categoryId: number;
  regionId: number;
  address: string;
  comments: any[];
  createdAt: string;
  tags: string[];
  status: number;
  userFiles: number[];
}
