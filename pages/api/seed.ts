import { db } from '@/database';
import { notes } from '@/database/seedData';
import Note from '@/models/Note';
import Tag from '@/models/Tag';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if( req.method !== 'GET' ) return res.status(401).json({ message: 'Bad Request :(' });

  await db.connect();

  try {
    await Note.deleteMany();
    await Note.insertMany( notes );
    await Tag.deleteMany();
  } catch (error: any) {
    await db.disconnect();
    res.status(500).json({ message: error.message });
  }

  await db.disconnect();

  res.status(200).json({ message: 'Database is reseted' });
}
