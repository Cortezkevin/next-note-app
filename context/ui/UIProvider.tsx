import { FC, ReactElement, useReducer, useEffect } from 'react';
import { UIContext, uiReducer } from './';
import { Theme, ThemeProvider } from '@mui/material';
import { darkTheme, ligthTheme } from '@/themes';

interface Props {
  children: ReactElement | ReactElement[];
}
export interface UIState {
  theme: Theme;
  currentTheme: 'ligth' | 'dark';
}

const UI_INITIAL_STATE: UIState = {
  theme: ligthTheme,
  currentTheme: 'ligth'
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [ state, dispatch ] = useReducer( uiReducer , UI_INITIAL_STATE );

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'ligth';
    dispatch({
      type: '[UI] - TOGGLE THEME',
      payload: {
        themeName: theme as any,
        theme: theme === 'ligth' ? ligthTheme : darkTheme,
      }
    })
  }, []);

  const toggleTheme = () => {
    dispatch({
      type: '[UI] - TOGGLE THEME',
      payload: {
        themeName: state.currentTheme === 'ligth' ? 'dark' : 'ligth',
        theme: state.currentTheme === 'ligth' ? darkTheme : ligthTheme,
      }
    })
    localStorage.setItem('theme', state.currentTheme === 'ligth' ? 'dark' : 'ligth');
  }

  return (
    <UIContext.Provider value={{
      ...state,
      toggleTheme
    }} >
      <ThemeProvider theme={ state.theme }>
        { children }
      </ThemeProvider>
    </UIContext.Provider>
  )
}