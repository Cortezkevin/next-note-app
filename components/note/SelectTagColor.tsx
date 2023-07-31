import React, { FC, useState } from 'react'
import { Box, useTheme, Typography, IconButton, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TagColor } from '@/interfaces';

interface Props {
  onClose: () => void;
  onSelect: ( color: TagColor ) => void;
}

const themeColors = [
  'default',
  'error',
  'primary',
  'secondary',
  'info',
  'success',
  'warning'
]

export const SelectTagColor: FC<Props> = ({ onClose, onSelect }) => {

  const [selectedColor, setSelectedColor] = useState<TagColor>('default');

  const { palette } = useTheme();

  const handleClose = () => {
    onClose();
  }

  const handleSelectColor = ( color: TagColor ) => {
    if( selectedColor === color ){
      setSelectedColor('default');
    }else {
      setSelectedColor( color );
    }
  }

  const handleAcceptColor = () => {
    onSelect( selectedColor );
  }

  return (
    <Card sx={{ width: 160, py: 1, borderRadius: '10px' }}>
      <CardHeader 
        sx={{ py: 1, textAlign: 'start' }} 
        title={ <Typography variant='subtitle1'>Colors:</Typography> }
        action={ 
          <IconButton onClick={ handleClose } size='small'>
            <CloseIcon color='secondary' fontSize='small'/>
          </IconButton> 
        }
      />
      <CardContent sx={{ py: 1 }}>
        <Box display='flex' justifyContent='center' flexWrap='wrap'>
          { 
            themeColors.map(c =>
              c !== 'default' &&
              <Box
                key={ c }
                onClick={ () => handleSelectColor(c as TagColor) }
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{ 
                  width: 32,
                  height: 32,
                  background: (palette as any)[c].main,
                  opacity: selectedColor === c ? 0.8 : 1,
                  cursor: 'pointer',
                  ':hover': { opacity: 0.6 } 
                }}>
                {
                  selectedColor === c && <CheckIcon sx={{ color: 'white' }} />
                }
              </Box>
          )}
        </Box>
      </CardContent>
      {
        selectedColor !== 'default'
        && <CardActions>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Button onClick={ handleAcceptColor } sx={{ border: `1px solid ${palette.secondary.main}`}} variant='text' endIcon={ <CheckIcon color='secondary' fontSize='medium'/> }>
            <Typography>Select</Typography>
          </Button>
        </Box>
      </CardActions>
      }
    </Card>
  )
}
