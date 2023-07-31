import { ITag } from '@/interfaces';
import { INote } from '@/interfaces/note';
import { createContext } from 'react';

export interface NoteProps {
  notes: INote[];
  tags: ITag[];
  loading: boolean;

  selectedNotes: INote[];

  saveNote: ( note: INote, message: string ) => void;
  deleteNote: ( id: string, message: string ) => void;
  deleteManyNotes: ( ids: string[], message: string ) => void;
  addTagsInManyNotes: ( ids: string[], newTags: ITag[], message: string ) => void;
  selectNote: ( id: string ) => void;
  clearSelectedNotes: () => void;
}
export const NoteContext = createContext({} as NoteProps);