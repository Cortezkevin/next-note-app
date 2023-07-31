import Tag from "@/models/Tag";
import { db } from "."
import { ITag } from "@/interfaces";

export const getAllTags = async (): Promise<ITag[]> => {
  await db.connect();
  const tags = await Tag.find();
  await db.disconnect();

  return JSON.parse( JSON.stringify(tags) );
}
