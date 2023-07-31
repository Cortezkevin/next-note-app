import Head from 'next/head';
import React, { FC } from 'react';
import { Paper } from '@mui/material'
import { Navbar } from '../ui';

interface Props {
	children: React.ReactNode
	title: string;
}

export const AppLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
			<Head>
				<title>{ title }</title>
			</Head>
			<main>
				<Navbar />
				<Paper sx={{ height: '100vh', width: '100vw', px: { xs: 4, sm: 6, md: 10 }, pt: { xs: 10, sm: 13, md: 15 } }}>
					{ children }
				</Paper>
			</main>
    </>
  )
}
