import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    customBackground: {
      primary: string
      secondary: string
    }
  }
  interface PaletteOptions {
    customBackground: {
      primary: string
      secondary: string
    }
  }
}

export const theme = createTheme({
  palette: {
    customBackground: {
      primary: '#131921',
      secondary: '#f08804',
    },
  },
})
