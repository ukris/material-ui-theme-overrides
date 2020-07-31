import { makeStyles } from '@material-ui/core'
import { Theme} from '@material-ui/core/styles'
export default  makeStyles((theme: Theme):any => {
  // @ts-ignore
  const { fontSize, lineHeight } = theme
  const { palette } = theme
  const padding = `0 ${theme.spacing(2)}`
  const padding2 = theme.spacing(4)
  const margin = theme.spacing(1)
  const width = `calc(100% - ${padding2})`
  return {
      fontSize: {
        fontSize: fontSize.md,
        lineHeight: lineHeight.md
      },
      fontSizeSm: {
        fontSize: fontSize.sm,
        lineHeight: lineHeight.sm
      },
      fontSizeLg: {
          fontSize: fontSize.lg,
          lineHeight: lineHeight.lg
      },
      paddingCls: {
          padding,
          margin
      },
      widthCls: {
          width
      },
      primaryFillColor: {
        fill: palette.primary.main
      },
      primaryColor: {
          color: palette.primary.main
      },
      accent: {
          backgroundColor: palette.accent.main
      },
      isoRoot: {
          marginTop:'-0.125em'
      },
      isoVal: {
          marginLeft: '0.25rem'
      },
      edit: {
        position:'fixed', 
        zIndex: 1000, 
        marginTop: '-20px'
      },
      ellipsis: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
  }
})