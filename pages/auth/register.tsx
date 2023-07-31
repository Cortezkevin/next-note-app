import { AuthLayout } from '@/components/layouts';
import { Box, Button, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { RegisterFormData, registerFormValidations } from '@/utils/validations';

const RegisterPage: NextPage = () => {

  const router = useRouter();
  const { handleSubmit, register, formState: { errors, isValid } } = useForm<RegisterFormData>({
    mode: 'all',
    values: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = ( formData: RegisterFormData ) => {
    const { email, password } = formData;

    //TODO: Crear session del usuario;

    router.push('/');
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <Box
          sx={{ width: 350, padding: '10px 20px'}}
          display='flex'
          flexDirection='column'
        >
          <Grid container spacing={ 1 } direction={'column'}>
            <Grid item>
              <Typography variant='h1' component='h1'>Register</Typography>
            </Grid>
            <Grid item>
              <TextField
                variant='filled'
                label='Name'
                fullWidth
                type='name'
                autoComplete='off'
                { ...register('name', registerFormValidations.name) }
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>
            <Grid item>
              <TextField
                variant='filled'
                label='Email'
                fullWidth
                type='email'
                autoComplete='off'
                { ...register('email', registerFormValidations.email) }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>
            <Grid item>
              <TextField
                variant='filled'
                label='Password'
                fullWidth
                type='password'
                { ...register('password', registerFormValidations.password) }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                disabled={ !isValid }
              >
                Register
              </Button>
            </Grid>
            <Grid item>
            <Box 
              display='flex' 
              flexDirection='column'
              sx={{ gap: 2, mt: 2 }}
            >
              <Divider />
              <NextLink href='/auth/login' passHref legacyBehavior>
                <Link underline='none'>
                  <Typography variant='body2' align='center'>I have an account</Typography>
                </Link>
              </NextLink>
            </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage;