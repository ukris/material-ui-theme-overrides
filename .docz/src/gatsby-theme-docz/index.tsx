import React, { useState } from 'react'

import { ThemeContext, ThemeProvider, ThemeZoom } from '@theme'
import { GlobalContext } from '@context'

export default (props:any) => {
  const [themeZoom, setThemeZoom] = useState<ThemeZoom>(GlobalContext.themeZoom)

  return (
    <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
      <ThemeProvider>
      {props.children}
    </ThemeProvider>
    </ThemeContext.Provider>
  )
}