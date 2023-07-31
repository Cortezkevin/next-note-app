import { AppLayout, NoteDeleteAlert, NoteList, TagsTextField } from "@/components";
import { Box, Fab, Typography, CircularProgress, IconButton, Tooltip, Card, useTheme, Popper, Snackbar, Alert, Checkbox } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useContext, useState } from 'react'
import { NoteContext } from "@/context/note";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { ITag } from "@/interfaces";

interface Props {
}

const HomePage: NextPage<Props> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tags, setTags] = useState<ITag[]>([]);

  const { palette: { info: { main }, secondary } } = useTheme();
  const [openTagDialog, setOpenTagDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { notes, loading, selectedNotes, deleteManyNotes, clearSelectedNotes, addTagsInManyNotes } = useContext( NoteContext );
  const router = useRouter();

  const handleDeleteNotes = async ( confirm: 'delete' | 'cancel' ) => {
    if( confirm === 'delete' ){
      const data = await (await fetch(`/api/note${selectedNotes.map(n => `/${n._id!}`)}`, { 
        method: 'DELETE'
      })).json();
      deleteManyNotes( data.oldId, data.message );
      clearSelectedNotes();
    }
    setOpenDeleteDialog(false);
  }

  const handleAddNewTag = ( newTag: ITag ) => {
    setTags(current => [...current, newTag]);
  }

  const handleDeleteTag = ( tag: string ) => {
    setTags(tags.filter( t => t.name !== tag ));
  }

  const handleCancelSelection = () => {
    clearSelectedNotes();
  }

  const handleSaveTagNotes = async () => {
    const body = { tags };
    try {
      const data = await (await fetch(`/api/note${selectedNotes.map(n => `/${n._id!}`)}/many`, { 
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify( body )
      })).json();
      console.log(data);
      addTagsInManyNotes( data.updatedIds, data.newTags, data.message );
      //router.reload();
    } catch (error: any) {
      alert( error.message );
    }
  }

  return (
    <AppLayout title="All Notes">
      <Box 
        display='flex' 
        flexDirection='column'
        gap={5}
      >
        <Box display='flex'> 
          <Typography variant='h1' component='h1'>
            All Notes: { loading ? <CircularProgress size={25} /> : <strong>{ notes.length }</strong>}
          </Typography>
          <Box flex={'1'}></Box>
          <Card
            sx={{ 
              display: selectedNotes.length > 0 ? 'flex' : 'none', 
              outline: `1px solid ${main}`,
              p: 1,
              position: 'absolute',
              right: 40 
            }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              gap={1}
            >
              <Box 
                display='flex'
                alignItems='center'
              >
                <Checkbox color="info" size="small" checked={ selectedNotes.length > 0 ? true : false } onChange={ handleCancelSelection } />
                <Typography variant="subtitle1" component='p' color={ secondary.main }>
                { selectedNotes.length } notes are selected
                </Typography>
              </Box>
              <Box>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => setOpenDeleteDialog(true)}
                    aria-label="delete"
                    color="error"
                    size="small"
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Tag">
                  <IconButton
                    onClick={(e) => {
                      setOpenTagDialog( current => !current );
                      setAnchorEl(e.currentTarget)
                    }}
                    aria-label="delete"
                    color="info"
                    size="small"
                  >
                    <SellOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Card>
        </Box>
        {
          loading
          ? <Box 
            display='flex'
            alignItems='center' 
            justifyContent='center' 
            sx={{ width: '100%', height: 400 }}
          >
            <CircularProgress />
          </Box>
          : <NoteList notes={ notes } />
        }
      </Box>
      <Popper
        anchorEl={ anchorEl }
        placement="left"
        disablePortal={true}
        open={ openTagDialog }
      >
        <Card sx={{ mt: 2, p: 1, display: 'flex' }}>
          <TagsTextField 
            currentTags={ tags }
            autoFocus
            onAddNewTag={ handleAddNewTag }
            onDeleteTag={ handleDeleteTag }
          />
          <IconButton onClick={ handleSaveTagNotes }>
            <AddCircleIcon color="secondary"/>
          </IconButton>
          <IconButton onClick={() => setOpenTagDialog(false) }>
            <CancelIcon color="error"/>
          </IconButton>
        </Card>
      </Popper>
      <Fab 
        sx={{
          position: 'absolute', 
          bottom: 20,
          right: 20
        }} 
        color="primary"
        aria-label="add"
        onClick={() => router.push('/note/new')}
      >
        <AddIcon />
      </Fab>
      <NoteDeleteAlert open={ openDeleteDialog } handleClose={( confirm ) => handleDeleteNotes(confirm)} />
    </AppLayout>
  )
}

export default HomePage;