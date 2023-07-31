import { createTheme } from "@mui/material";

export const ligthTheme = createTheme({
  palette: {
    info: {
      main: '#007fff'
    },
    secondary: {
      main: '#2245cd'
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 1
      },
      styleOverrides: {
        root: {
          background: "#fff"/* '#aacadf' */,
        }
      }
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: '400'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '300'
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: '300'
    },
    body1: {
      fontSize: '0.8rem',
      fontWeight: '200'
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#007fff'
    },
    secondary: {
      main: '#90caf9'
    },
    text: {
      primary: '#90caf9',
      secondary: '#fff'
    },
    success: {
      main: '#03ff2d'
    },
    warning: {
      main: '#ff9900'
    },
    info: {
      main: '#0df3d3'
    },
    error: {
      main: '#f94d8d'
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          background: '#0a1929',
          boxShadow: '8px 1px 10px 1px #132f4c'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#0a1929'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        text: {
          color: '#90caf9'
        },
        endIcon: {
          color: '#90caf9'
        },
        root: {
          borderColor: '#90caf9',
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          background: '#0a1929'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#90caf9'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: '#007fff'
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          background: '#132f4c',
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: '#132f4c',
          ':hover': {
            background: '#001e3c'
          }
        }
      }
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          background: '#132f4c',
          ':hover': {
            background: '#001e3c'
          }
        }
      }
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: '400'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '300'
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: '300'
    },
    body1: {
      fontSize: '0.8rem',
      fontWeight: '200'
    }
  }
});