import { makeStyles } from '@material-ui/core/styles';

import { getGridTemplateColumns } from 'helpers/table'
import { TableType } from './types'
import { cellTypeUserDefaults } from './table-defaults'
import { WHITE, BLACK, DARK } from 'theme/palette'

export default makeStyles(theme => {
  const isDark = theme.palette.type === DARK
  const tr = {
    display: 'contents'
  }
  const defaultWidth = cellTypeUserDefaults.default.width
  return {
    root: {
      width: '100%',
      fontSize: '1em'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    thead: tr,
    tbody: tr,
    tr,
    table: (props: TableType) => ({
  //    minWidth: 750
      width: 'auto',
      flex: 1,
      display: 'grid',
      borderCollapse: 'collapse',
      gridTemplateColumns: getGridTemplateColumns(props.columns, defaultWidth)
    }),
    resizeHandle: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      background: isDark ? WHITE : BLACK,
      opacity: 0,
      width: '3px',
      cursor: 'col-resize'
    },
    header: {
      marginLeft: '-1.75em'
    },
    title: {

    },
    up: {
      transform: 'rotate(180deg)'
    }
  }
})