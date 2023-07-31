import { Card, useTheme, CardContent, CardHeader, Checkbox, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, Chip, Box } from '@mui/material'
import React, { FC, useState, useContext, useEffect, useMemo } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useRouter } from 'next/router';
import { NoteDeleteAlert } from './NoteDeleteAlert';
import { NoteContext } from '@/context/note';
import { ITag } from '@/interfaces';

interface Props {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
}

export const NoteCard: FC<Props> = ({ _id, title, description, tags }) => {

  const [realTags, setRealTags] = useState<ITag[]>([]);
  const { palette: { info: { main } } } = useTheme();
  const [isHover, setIsHover] = useState(false);

  const { deleteNote, selectNote, tags: existingTags, selectedNotes } = useContext( NoteContext );
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isChecked = useMemo(() => {
    if( selectedNotes.find( t => t._id === _id )){
      return true;
    }else {
      return false;
    }
  }, [ selectedNotes ]);
  
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (
    event: any,
    index: number,
  ) => {
    setAnchorEl(null);
    if( index === 0 ){
      router.push(`/note/${_id}`);
    }else {
      if( event === 'delete'){
        const data = await (await fetch(`/api/note/${_id}`, { 
          method: 'DELETE'
        })).json();
        deleteNote( data.oldId, data.message );
      }
      setOpenDialog(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let newTags: ITag[] = [];
    existingTags.forEach( t => {
      if( tags.includes( t.name ) ){
        newTags.push( t );
      }
    });
    setRealTags( newTags );
  }, [ existingTags ]);

  return (
    <Grid item xs={12} sm={6} md={4} xl={2}>
      <Card 
        onMouseOver={() => setIsHover( true )} 
        onMouseLeave={() => setIsHover( false )} 
        sx={{ 
          position: 'relative', 
          outline: isChecked ? `1.5px solid ${main}` : '',
          transition: 'all 500ms ease'
        }}
      >
        <CardHeader
          title={ <Typography variant='h3' component='h3'>{ title }</Typography> } 
          action={
            <>
              <IconButton color='secondary' aria-label="settings" onClick={handleClickListItem}>
                <MoreVertIcon />
              </IconButton>
              <Checkbox
                size='small'
                checked={ isChecked }
                color='info'
                onChange={() => {
                  selectNote( _id! );
                }}
                sx={{ display: isHover ? '' : isChecked ? '' : 'none' }}
              />
            </>
            
          }
        />
        <CardContent>
          <Typography>{ description}</Typography>
        </CardContent>
        <Box sx={{ p: 2 }} display='flex' flexWrap='wrap' gap={1} >
          {
            realTags.map( t =>
              <Chip
                key={ t.name }
                color={ t.color }
                size='small'
                label={ t.name }
              />
            )
          }
        </Box>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          <MenuItem onClick={( e ) => handleMenuItemClick(e, 0)}> 
            <ListItemIcon>
              <EditOutlinedIcon color='secondary' fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={( e ) => {setOpenDialog(true); setAnchorEl(null);}}>
            <ListItemIcon>
              <ClearOutlinedIcon color='secondary' fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
        <NoteDeleteAlert open={ openDialog } handleClose={( confirm ) => handleMenuItemClick(confirm, 1)} />
      </Card>
    </Grid>
  )
}
