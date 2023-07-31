import { db } from '@/database';
import { ITag } from '@/interfaces';
import { INote } from '@/interfaces/note';
import Note from '@/models/Note';
import Tag from '@/models/Tag';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| INote
| INote[]
| { message: string, oldIds: string[] }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch( req.method ){
    case 'GET':
      return getAllNotes( res );
    case 'POST':
      return createNote( req, res );
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const getAllNotes = async ( res: NextApiResponse<Data> ) => {
  await db.connect();
  const notes = await Note.find().lean();
  await db.disconnect();
  return res.status(200).json( notes );
}

const createNote = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const note = req.body as any;
  if( !note ) return res.status(400).json({ message: 'Bad Request' });
  console.log(note);

  await db.connect();

  try {

    note.tags.forEach( async (t: ITag) => {
      const foundTag = await Tag.findOne({ name: t.name });
      if( !foundTag ){
        await Tag.create( t );
      }
      console.log("FOUND TAG?", foundTag);
    })

    const newNote = new Note({ ...note, tags: note.tags.map( (t: ITag) => t.name )});
    console.log(newNote);
    await newNote.save();
    await db.disconnect();

    return res.status(201).json( newNote );

  } catch (error) {

    await db.disconnect();
    return res.status(500).json({ message: 'An error has ocurred' });

  }
}