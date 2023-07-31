import { Theme } from '@mui/material';
import { createContext } from 'react';

export interface UIProps {
  currentTheme: 'ligth' | 'dark';
  theme: Theme;

  toggleTheme: () => void;
}
export const UIContext = createContext({} as UIProps);