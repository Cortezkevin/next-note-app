import { AppLayout, TagsTextField } from '@/components';
import { Box, Chip, Fab, Grid, TextField, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useForm } from 'react-hook-form';
import { NoteFormData, noteFormValidations } from '@/utils';
import { useRouter } from 'next/router';
import { isValidObjectId } from 'mongoose';
import { noteRepository } from '@/database';
import { INote } from '@/interfaces/note';
import { useContext, useEffect, useState } from 'react';
import { NoteContext } from '@/context/note';
import { ITag } from '@/interfaces';

interface Props {
  note?: INote;
}

const NotePage: NextPage<Props> = ({ note }) => {

  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const { saveNote, tags: existingTags } = useContext( NoteContext );
  const router = useRouter();
  const { handleSubmit, register, watch, formState: { errors, isValid }, getValues, setValue } = useForm<NoteFormData>({
    mode: 'all',
    values: {
      title: note ? note.title : '',
      description: note ? note.description : '',
      tags: note ? selectedTags : []
    }
  });

  const onSubmit = async ( form: NoteFormData ) => {
    const data = await (await fetch( note ? `/api/note/${note._id}` : '/api/note', {
      method: note ? 'PUT' : 'POST',
      body: JSON.stringify( form ),
      headers: {
        'Content-type': 'application/json'
      }
    })).json() as INote;

    saveNote( data, 'Saved' );

    router.push('/');
  }

  const handleAddTags = ( newTag: ITag ) => {
    const formattedTag = { ...newTag, name: newTag.name.trim() };
    if( !getValues('tags').find( t => t.name === formattedTag.name ) && formattedTag.name.length > 0){
      const userTags = [ ...getValues('tags'), formattedTag ];
      setValue('tags', userTags, { shouldValidate: true })
      setSelectedTags( c => [...c, formattedTag ]);
    }
  }

  const handleDeleteTags = ( tag: string ) => {
    const formattedTag = tag.trim();
    const userTags = getValues('tags').filter( t => t.name !== formattedTag );
    setValue('tags', userTags, { shouldValidate: true })
    setSelectedTags( userTags )
  }

  const onSelectTag = ( tag: ITag ) => {
    const formattedTag = { ...tag, name: tag.name.trim()};
    let userTags = [];
    if( !getValues('tags').find( t => t.name === formattedTag.name )){
      userTags = [ ...getValues('tags'), formattedTag ];
    }else{
      userTags = getValues('tags').filter( t => t.name !== formattedTag.name );
    }
    setValue('tags', userTags, { shouldValidate: true })
    setSelectedTags( userTags )
  }

  useEffect(() => {
    const obs = watch(( value, { name, type }) => {
      if( name === 'title'){
        const title = value.title || '';
        setTitle(title);
      }
    });
    return () => {
      obs.unsubscribe();
    }
  })

  useEffect(() => {
    let prevSelectedTags: ITag[] = [];
    existingTags.forEach(t => {
      if( note?.tags.includes(t.name) ){
        prevSelectedTags.push( t );
      }
    });
    setSelectedTags( prevSelectedTags );
  }, [])

  return (
    <AppLayout title='Note'>
      <Typography variant='h1' component='h1'>
        { note ? note.title : title }
      </Typography>
      <form onSubmit={ handleSubmit( onSubmit )}>
        <Grid 
          container 
          flexDirection='column'
          spacing={3}
          sx={{ mt: 2 }}
        >
          <Grid item>
            <TextField 
              color='secondary'
              variant='filled'
              label='Title'
              fullWidth
              { ...register('title', noteFormValidations.title) }
              error={ !!errors.title }
              helperText={ errors.title?.message }
            />
          </Grid>
          <Grid item>
            <TextField
              color='secondary'
              variant='filled'
              label='Description'
              fullWidth
              multiline
              { ...register('description', noteFormValidations.description) }
              error={ !!errors.description }
              helperText={ errors.description?.message }
            />
          </Grid>
          <Grid item>
            {
              existingTags.length !== 0 &&
                <Box sx={{ mb: 2 }}>
                  <Typography>Existing Tags:</Typography>
                  { 
                    existingTags.map( t =>
                      <Chip
                        clickable
                        label={t.name.trim()}
                        size='small'
                        variant='filled'
                        sx={{ mr: 1 }}
                        color={ selectedTags.find( st => st.name.trim() === t.name.trim()) ? t.color : 'default' }
                        key={t._id}
                        onClick={() => onSelectTag( t )}
                      />
                    )
                  }
                </Box>
            }
            <TagsTextField 
              currentTags={ getValues('tags') }
              onAddNewTag={ handleAddTags }
              onDeleteTag={ handleDeleteTags }
              autoCompleteIfExists={ true }
            />
          </Grid>
        </Grid>
        <Fab 
          sx={{
            position: 'absolute', 
            bottom: 20,
            right: 20
          }} 
          disabled={!isValid}
          color="primary"
          aria-label="save"
          type='submit'
        >
          <SaveOutlinedIcon />
        </Fab>
      </form>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };
  if( !isValidObjectId( id ) && id !== 'new' ){
    return {
      redirect: {
      destination: '/',
      permanent: false
      }
    }
  }

  if( !isValidObjectId(id) && id === 'new' ) {
    return {
      props: {
      }
    }
  }

  const note = await noteRepository.getById( id );

  return {
    props:{
      note
    }
  }
}

export default NotePage;