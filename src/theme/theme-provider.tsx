import React, { useContext } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'

import { Theme} from '@material-ui/core/styles/createMuiTheme';
import createTheme from './theme'

import { ThemeZoom } from './index'

export default function ThemeProvider(props: any) {
  const { children } = props
  const theme:any = createTheme({ zoom: 1, theme: 'material'})
  return (<MuiThemeProvider 
           theme={theme}> 
            {children}
          </MuiThemeProvider>)
}
