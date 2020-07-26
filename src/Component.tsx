import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CSSProperties } from '@material-ui/styles'

export const useStyle = makeStyles((theme: Theme) => {
  debugger
  const rt = theme.overrides?.MuiCard?.root
  if (!rt) {
    return createStyles({
      constainer: {
        position: 'relative',
        backgroundColor: theme.palette.accent.main,
      },
    })
  }
  const root =  rt as CSSProperties
  return createStyles({
    constainer: {
      position: 'relative',
      width: root?.width,
      height: root?.height, 
      margin : root?.margin,
      backgroundColor: theme.palette.accent.main,
    },
  })
})

export default () => {
  const classes =useStyle()
  return (
  <div className={classes.constainer} >
    This component use theme overrides
  </div>
)}