import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CSSProperties } from '@material-ui/styles'

export const useStyle = makeStyles((theme: Theme) => {
  // @ts-ignore
  const root:CSSProperties = theme.overrides?.MuiCard?.root
  const styles = createStyles({
    constainer: {
      position: 'relative',
      width: root?.width,
      height: root?.height, 
      margin : root?.margin,
      backgroundColor: theme.palette.fog.main,
    },
  })
  return styles;
})

export default () => {
  const classes =useStyle()
  debugger
  return (
  <div className={classes.constainer} >
    This component use theme overrides
  </div>
)}