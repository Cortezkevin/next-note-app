import { INote } from '@/interfaces/note';
import { NoteState } from './'
import { ITag } from '@/interfaces';

type NoteAction =
| { 
  type: '[Note] - CREATE NEW NOTE',
  payload: INote
}
| { 
  type: '[Note] - UPDATE NOTE',
  payload: INote
}
| { 
  type: '[Note] - DELETE NOTE',
  payload: string
}
| { 
  type: '[Note] - DELETE MANY NOTES',
  payload: string[]
}
| {
  type: '[Note] - ADD TAGS TO MANY NOTES',
  payload: {
    ids: string[];
    newTags: ITag[];
  }
}
| { 
  type: '[Note] - LOAD ALL NOTES',
  payload: INote[]
}
| { 
  type: '[Note] - LOAD ALL TAGS',
  payload: ITag[]
}
| {
  type: '[Note] - CHANGE SELECTED NOTES',
  payload: INote[]
}
| {
  type: '[Note] - RESET SELECTED NOTES'
}
;

export const noteReducer = ( state: NoteState, action: NoteAction ): NoteState => {
  switch( action.type ) {
    case '[Note] - LOAD ALL NOTES':
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    case '[Note] - CREATE NEW NOTE':
      return {
        ...state,
        notes: [
          ...state.notes,
          action.payload
        ]
      };
    case '[Note] - UPDATE NOTE':
      return {
        ...state,
        notes: state.notes.map( n => {
          if( n._id === action.payload._id ){
            return action.payload;
          }
          return n;
        })
      };
    case '[Note] - DELETE NOTE':
      return {
        ...state,
        notes: state.notes.filter( n => n._id !== action.payload )
      };
    case '[Note] - CHANGE SELECTED NOTES':
      return {
        ...state,
        selectedNotes: action.payload
      }
    case '[Note] - DELETE MANY NOTES':
      return {
        ...state,
        notes: state.notes.filter( note => !action.payload.includes( note._id! ) )
      }
    case '[Note] - ADD TAGS TO MANY NOTES':
      return {
        ...state,
        tags: [ ...state.tags, ...action.payload.newTags ],
        notes: state.notes.map( note => {
          if( action.payload.ids.includes( note._id! ) ){
            const newNote = {
              ...note, tags: [ ...note.tags, ...action.payload.newTags.map( t => t.name ) ]
            };
            return newNote;
          }
          return note
        })
      }
    case '[Note] - LOAD ALL TAGS':
      return {
        ...state,
        tags: action.payload
      }
    case '[Note] - RESET SELECTED NOTES':
      return {
        ...state,
        selectedNotes: []
      }
    default:
      return state;
  }
}