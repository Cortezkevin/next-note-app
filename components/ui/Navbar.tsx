import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Switch, Typography, FormControlLabel, Button, Link } from '@mui/material'
import { UIContext } from '@/context/ui';
import NextLink from 'next/link';

export const Navbar = () => {

  const { toggleTheme, currentTheme } = useContext( UIContext );

  return (
    <AppBar>
      <Toolbar>
      <Typography variant="h2" component="h2" sx={{ flexGrow: 1 }}>
        Notes
      </Typography>
      <NextLink passHref legacyBehavior href='/auth/login'>
        <Link>
          <Button variant='contained' color='secondary'>Login</Button>
        </Link>
      </NextLink>
      <Box sx={{ width: 20 }}></Box>
      <FormControlLabel control={
        <Switch 
          color='secondary'
          placeholder='asd'
          onChange={() => toggleTheme()}
          checked={ currentTheme === 'ligth' ? false : true }
        />
      } label={currentTheme.toUpperCase()}/>
      
      </Toolbar>
    </AppBar>
  )
}
