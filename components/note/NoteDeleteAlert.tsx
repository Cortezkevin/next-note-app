import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, { FC, useState } from 'react';

interface Props {
  open: boolean;
  handleClose: ( confirm: 'delete' | 'cancel' ) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const NoteDeleteAlert: FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete Note"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure to delete that note?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose('cancel') }>Cancel</Button>
        <Button variant='contained' onClick={() => handleClose('delete') }>Yes, Delete</Button>
      </DialogActions>
    </Dialog>
  )
}
