import { TextField, Box, Chip, Popper } from "@mui/material";
import { FC, KeyboardEvent, useState, useContext } from "react";
import { SelectTagColor } from "./SelectTagColor";
import { ITag, TagColor } from "@/interfaces";
import { NoteContext } from "@/context/note";

interface Props {
  currentTags: ITag[];
  onAddNewTag: ( newTag: ITag ) => void;
  onDeleteTag: ( tag: string ) => void;
  autoFocus?: boolean;
  autoCompleteIfExists?: boolean;
}

export const TagsTextField: FC<Props> = ({ currentTags, onAddNewTag, onDeleteTag, autoFocus = false, autoCompleteIfExists = false }) => {
  
  const { tags: existingTags } = useContext(NoteContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ tag, setTag] = useState<ITag>({ name: '', color: 'default' });
  const [openColorDialog, setOpenColorDialog] = useState(false);

  const handleAddTags = ( e: KeyboardEvent<HTMLDivElement> ) => {
    if( e.code === 'Space' ){
      if( autoCompleteIfExists ){
        if( existingTags ){
          const existsTag = existingTags.find( t => t.name === tag.name );
          if( existsTag ){
            onAddNewTag( existsTag );
            setTag({ name: '' })
            return;
          }
        }
      }
      if( (e.target as any).value.trim() !== '' ){
        setOpenColorDialog( current => !current );
        setAnchorEl(e.currentTarget)
      }else {
        setTag({ name: '' })
      }
    }
  }

  const handleCancelColor = () => {
    setOpenColorDialog( false );
    onAddNewTag( tag );
    setTag({ name: '', color: 'default' });
  }

  const handleSelectColor = ( color: TagColor ) => {
    if( color !== 'default' ){
      onAddNewTag({ ...tag, color });
    }
    setTag({ name: '', color: 'default' });
    setOpenColorDialog( false );
  }

  return (
    <>
      <TextField
        color='secondary'
        variant='filled'
        autoFocus={ autoFocus }
        label='Add tags'
        autoComplete='off'
        helperText='Press space to add'
        value={tag.name}
        onChange={(({target}) => setTag(c => ({ ...c, name: target.value.trim() })))}
        placeholder='type a tag ...'
        InputProps={{
          startAdornment: currentTags.length !== 0 && <Box display='flex' gap={1} sx={{ mr: 1, mt: 3, mb: 1 }}>
            {
              currentTags.map( t => 
                <Chip
                  color={t.color}
                  key={ t.name }
                  label={ t.name }
                  clickable
                  size='small'
                  onDelete={ () => onDeleteTag(t.name) }
                />
              )
            }
          </Box>
        }}
        fullWidth
        onKeyDown={ handleAddTags }
      />
      <Popper
        anchorEl={ anchorEl }
        placement="bottom-start"
        disablePortal={true}
        open={ openColorDialog }
      >
        <SelectTagColor 
          onClose={ handleCancelColor } 
          onSelect={ handleSelectColor } 
        />
      </Popper>
    </>
  );
}