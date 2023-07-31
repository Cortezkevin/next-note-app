import { Theme } from '@mui/material';
import { UIState } from './'

type UIAction = { 
  type: '[UI] - TOGGLE THEME', 
  payload: { themeName: 'ligth' | 'dark', theme: Theme } 
};

export const uiReducer = ( state: UIState, action: UIAction ): UIState => {
  switch( action.type ) {
    case '[UI] - TOGGLE THEME':
      return {
        ...state,
        theme: action.payload.theme,
        currentTheme: action.payload.themeName
      };
    default:
      return state;
  }
}