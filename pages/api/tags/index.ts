import { db } from '@/database';
import { ITag } from '@/interfaces';
import Tag from '@/models/Tag';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| ITag[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch(req.method){
    case 'GET':
      return getAllTags(res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getAllTags = async ( res: NextApiResponse<Data> ) => {
  await db.connect();
  const tags = await Tag.find();
  await db.disconnect();
  return res.status(200).json( tags );
}