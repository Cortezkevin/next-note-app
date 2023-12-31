import { ITag } from "./tag";

export interface INote {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}