import { NoteProvider } from '@/context/note';
import { UIProvider } from '@/context/ui';
import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <UIProvider>
      <NoteProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </NoteProvider>
    </UIProvider>
  )
}
