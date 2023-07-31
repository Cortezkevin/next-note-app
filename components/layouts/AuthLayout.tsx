import Head from 'next/head';
import React, { FC } from 'react';
import { Paper } from '@mui/material'

interface Props {
	children: React.ReactNode
	title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
			<Head>
				<title>{ title }</title>
			</Head>
			<main>
				<Paper sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: 'calc(100vh)'
				}} >
					{ children }
				</Paper>
			</main>
    </>
  )
}
