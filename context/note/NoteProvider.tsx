import { FC, ReactElement, useEffect, useReducer, useState } from 'react';
import { NoteContext, noteReducer } from './';
import { INote } from '@/interfaces/note';
import { ITag } from '@/interfaces';
import { Snackbar, Alert } from '@mui/material';

interface Props {
  children: ReactElement | ReactElement[];
}

export interface NoteState {
  notes: INote[];
  tags: ITag[];
  loading: boolean;
  selectedNotes: INote[];
}

const NOTE_INITIAL_STATE: NoteState = {
  notes: [],
  tags: [],
  loading: true,
  selectedNotes: []
}

export const NoteProvider: FC<Props> = ({ children }) => {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [ state, dispatch ] = useReducer( noteReducer , NOTE_INITIAL_STATE );

  const loadNotes = async () => {
    try {
      const data = await (await fetch('/api/note', { method: 'GET' })).json();
      dispatch({
        type: '[Note] - LOAD ALL NOTES',
        payload: data
      })
    } catch (error) {
      dispatch({
        type: '[Note] - LOAD ALL NOTES',
        payload: []
      })
    }
  }

  const loadTags = async () => {
    try {
      const data = await (await fetch('/api/tags', { method: 'GET' })).json();
      console.log("TAGS" , {data});
      dispatch({
        type: '[Note] - LOAD ALL TAGS',
        payload: data
      })
      loadNotes();
    } catch (error) {
      dispatch({
        type: '[Note] - LOAD ALL TAGS',
        payload: []
      })
    }
  }

  useEffect(() => {
    loadTags();
    
  }, []);

  const saveNote = async ( note: INote, message: string ) => {
    if( state.notes.find( n => n._id === note._id ) ){
      dispatch({
        type: '[Note] - UPDATE NOTE',
        payload: note
      })
    }else {
      dispatch({
        type: '[Note] - CREATE NEW NOTE',
        payload: note
      })
    }
    showAlert( message );
    await loadTags();
  }

  const deleteNote = ( id: string, message: string ) => {
    dispatch({
      type: '[Note] - DELETE NOTE',
      payload: id
    })
    showAlert( message );
  }

  const deleteManyNotes = ( ids: string[], message: string ) => {
    dispatch({
      type: '[Note] - DELETE MANY NOTES',
      payload: ids
    })
    showAlert( message );
  }
  
  const addTagsInManyNotes = async ( ids: string[], newTags: ITag[], message: string ) => {
    dispatch({
      type: '[Note] - ADD TAGS TO MANY NOTES',
      payload: {
        ids, newTags
      }
    })
    showAlert( message );
  };

  const selectNote = ( _id: string ) => {
    const note = state.notes.find( n => n._id === _id )!;
    const noteIsSelected = state.selectedNotes.includes( note );
    if( noteIsSelected ){
      dispatch({
        type: '[Note] - CHANGE SELECTED NOTES',
        payload: state.selectedNotes.filter( n => n._id !== _id )
      })
    }else {
      dispatch({
        type: '[Note] - CHANGE SELECTED NOTES',
        payload: [ ...state.selectedNotes, note ]
      })
    }
  }

  const clearSelectedNotes = () => {
    dispatch({
      type: '[Note] - CHANGE SELECTED NOTES',
      payload: []
    })
  }

  const showAlert = ( message: string ) => {
    setMessage( message )
    setOpen( true );
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  return (
    <NoteContext.Provider value={{ 
      ...state,
      saveNote,
      deleteNote,
      selectNote,
      deleteManyNotes,
      addTagsInManyNotes,
      clearSelectedNotes
    }} >
      { children }
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert variant='filled' severity="success" sx={{ width: '100%' }} onClose={ handleClose }>
          { message }
        </Alert>
      </Snackbar>
    </NoteContext.Provider>
  )
}