// https://medium.com/javascript-in-plain-english/extend-material-ui-theme-in-typescript-a462e207131f
import { CardClassKey } from '@material-ui/core/styles/overrides'
import { PaletteColorOptions } from "@material-ui/core";
import { PaletteColor } from "@material-ui/core/styles/createPalette";
import {CSSProperties} from '@material-ui/styles'

declare module '@material-ui/core/styles/createPalette' {
    interface PaletteOptions {    
        fallback: PaletteColorOptions
        fog: PaletteColorOptions
       
    }
    interface Palette {
        fallback: PaletteColor
        fog: PaletteColor
    }
}

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
      fallback: Palette['primary']
      fog: Palette['primary']
    }
    interface PaletteOptions {
      fallback: PaletteOptions['primary']
      fog: PaletteOptions['primary']
    }
}

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
      overrides: {
        MuiCard: {
          root: {
            width: string
            height: React.CSSProperties['height']
            margin: React.CSSProperties['margin']
          }
        }
      }
    }
  
    interface ThemeOptions {
      overrides: {
        MuiCard: {
          root: {
            width: string,
            height: string
            margin: React.CSSProperties['margin']
          }
        }
      }
    }
  }
