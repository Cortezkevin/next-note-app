import { Grid } from '@mui/material'
import React, { FC } from 'react'
import { NoteCard } from './NoteCard'
import { INote } from '@/interfaces/note'

interface Props {
  notes: INote[],
}

export const NoteList: FC<Props> = ({ notes }) => {
  return (
    <Grid container spacing={2}>
      {
        notes.map( n => 
          <NoteCard key={ n._id } { ...n } />
        )
      }
    </Grid>
  )
}
