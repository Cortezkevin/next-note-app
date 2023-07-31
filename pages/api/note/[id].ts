import { db } from '@/database';
import { ITag } from '@/interfaces';
import { INote } from '@/interfaces/note';
import Note from '@/models/Note';
import Tag from '@/models/Tag';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| { message: string, oldId: string }
| INote

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch( req.method ){
    case 'PUT':
      return updateNote( req, res );
    case 'DELETE':
      return deleteNote( req, res );
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const deleteNote = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query as { id: string };
  if( !isValidObjectId( id ) ) return res.status(400).json({ message: 'This id is invalid' });

  await db.connect();

  const noteToDelete = await Note.findById( id );
  if( !noteToDelete ) return res.status(400).json({ message: 'Not exists an note with this id' });

  try {
    await Note.deleteOne({ _id: noteToDelete._id });
    await db.disconnect();
    return res.status(200).json({ message: 'Note delete successfully', oldId: id });
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: 'An error has ocurred' });
  }
}

const updateNote = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query as { id: string };
  if( !isValidObjectId( id ) ) return res.status(400).json({ message: 'This id is invalid' });

  const newNoteData = req.body as any;
  if( !newNoteData ) return res.status(400).json({ message: 'Bad Request' });

  await db.connect();
  
  const noteToUpdate = await Note.findById( id );  
  if( !noteToUpdate ) return res.status(400).json({ message: 'Not exists an note with this id' });

  try {
    noteToUpdate.title = newNoteData.title;
    noteToUpdate.description = newNoteData.description;

    newNoteData.tags.forEach( async (t: ITag) => {
      const foundTag = await Tag.findOne({ name: t.name });
      if( !foundTag ){
        await Tag.create( t );
      }
    })

    noteToUpdate.tags = newNoteData.tags.map( (t: ITag) => t.name );

    const noteUpdated = await noteToUpdate.save();

    await db.disconnect();
    return res.status(200).json( noteUpdated );
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: 'An error has ocurred' });
  }
}