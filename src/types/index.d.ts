// https://medium.com/javascript-in-plain-english/extend-material-ui-theme-in-typescript-a462e207131f
import { CardClassKey } from '@material-ui/core/styles/overrides'
import { PaletteColorOptions } from "@material-ui/core";
import { PaletteColor } from "@material-ui/core/styles/createPalette";
import {CSSProperties} from '@material-ui/styles'
import { AutoCompleteClassKey } from '@material-ui/lab/Autocomplete'
import { Theme, ThemeOptions, Palette, PaletteOptions } from '@material-ui/core/styles/createMuiTheme';
export const typography =  {
  useNextVariants: true,
  fontSize: 11,
  fontFamily: ['Montserrat', 'sans-serif', 'Helvetica Neue', 'Arial'].join(','),
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' 

export type FontSize = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
}

declare module '@material-ui/core/styles/createPalette' {
    interface PaletteOptions {    
        accent: PaletteColorOptions
        contrastText: string
        custom: {
            contrastText: string
            primary: string,
            secondary: string
        }
    }
    interface Palette {
        accent: PaletteColor
        contrastText: string
        custom: {
            contrastText: string
            primary: string,
            secondary: string
        }
    }
}

declare module '@material-ui/core/styles/createMUITheme' {
    interface ThemeOptions {
        zoomFontSize: (factor: number) => string
        zoomSpacing: (factor: number) => number
        fontSize: FontSize
        lineHeight: FontSize
        palette: PaletteOptions
    }
    interface Theme {
        zoomFontSize: (factor:number) => string
        zoomSpacing: (factor: number) => number
        fontSize: FontSize
        lineHeight: FontSize
        palette: PaletteColor
    }
}

declare module '@material-ui/core/styles/overrides' {
    interface ComponentNameToClassKey {
        MuiAutocomplete: AutoCompleteClassKey
    }
}