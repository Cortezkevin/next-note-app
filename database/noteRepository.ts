import Note from "@/models/Note";
import { db } from "."
import { INote } from "@/interfaces/note";

export const getById = async ( id: string ): Promise<INote> => {
  await db.connect();
  const note = await Note.findById( id );
  await db.disconnect();

  return JSON.parse( JSON.stringify(note) );
}

export const getAllNotes = async (): Promise<INote[]> => {
  await db.connect();
  const notes = await Note.find();
  await db.disconnect();

  return JSON.parse( JSON.stringify(notes) );
}

export const createNote = async ( title: string, description: string ): Promise<INote> => {

  await db.connect();
  const newNote = await Note.create({ title, description });
  await db.disconnect();

  return JSON.parse( JSON.stringify(newNote) );
}