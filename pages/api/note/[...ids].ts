import { db } from '@/database';
import { ITag } from '@/interfaces';
import Note from '@/models/Note';
import Tag from '@/models/Tag';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| { message: string, oldId: string[] }
| { message: string, updatedIds: string[], newTags: ITag[] }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch( req.method ){
    case 'PUT':
      return addTagsToManyNotes( req, res );
    case 'DELETE':
      return deleteManyNotes( req, res );
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const addTagsToManyNotes = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { ids } = req.query as { ids: string[] };
  const { tags } = req.body as { tags: ITag[] };
  ids.pop();
  const noteIds = ids.map( n => n.replace('many','').replace(',', ''))
  await db.connect();
  try {

    tags.forEach( async (t: ITag) => {
      const foundTag = await Tag.findOne({ name: t.name.trim() });
      if( !foundTag ){
        await Tag.create( t );
      }
    })

    const tagsNames = tags.map( t => t.name );

    noteIds.forEach( async noteId => {
      const noteFound = await Note.findById( noteId );
      if( noteFound ){
        tagsNames.forEach( async t => {
          if( !noteFound.tags.includes(t) ){
            noteFound.tags.push(t);
            await noteFound.save();
          }
        })
      }
    });
    //const note = await Note.updateMany({_id: { $in: noteIds }, tags: { $nin: tagsNames }}, { $push: tagsNames });
    await db.disconnect();
    console.log(noteIds, tagsNames);
    return res.status(201).json({ message: `${noteIds.length} notes updated successfully`, updatedIds: noteIds, newTags: tags });
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ message: 'An error has ocurred' + error.message });
  }  
}

const deleteManyNotes = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { ids } = req.query as { ids: string[] };
  const noteIds = ids.map( n => n.replace(',', ''))
  await db.connect();
  try {
    await Note.deleteMany({_id: { $in: noteIds }});
    await db.disconnect();
    return res.status(201).json({ message: `${noteIds.length} notes deleted successfully`, oldId: noteIds });
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ message: 'An error has ocurred' });
  }  
}