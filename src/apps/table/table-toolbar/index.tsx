import React, { useState } from 'react'
import clsx from 'clsx'

import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ArrowDropDownCircle from '@material-ui/icons/ArrowDropDownCircle'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import LaneActionMenu from '../table-toolbar-menu'
import useStyles from './styles'


interface Props {
  numSelected: number
  collapsed: boolean
  editable: boolean
  setCollapsed: (col: boolean)=>void
  lookupId: string
}

export default function TableToolbar(props: Props) {
  const { numSelected, collapsed, editable, setCollapsed } = props;
  const classes = useStyles()
  const tooltipTitle = collapsed ? 'Expand' : 'Collapse'
  const cls = collapsed ? clsx(classes.up): ''
  const [editTitle, setEditTitle ] = useState(false)
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

  /* @ts-ignore */
  return (
    <Toolbar
      className={clsx(classes.root, classes.header, {
        // @ts-ignore
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <>
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
          <Tooltip title="Available Lane Action">
            <IconButton aria-label="Lane Actions">
              <MoreVertIcon  {...bindTrigger(popupState)}/>
            </IconButton>
          </Tooltip>
          <Menu
            {...bindMenu(popupState)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <LaneActionMenu onClick={popupState.close} editable={editable}/>
          </Menu>
        </>
      ): (
        <Tooltip title={tooltipTitle}>
          <IconButton aria-label={tooltipTitle} onClick={()=> setCollapsed(!collapsed)}>
            <ArrowDropDownCircle className={cls}
            color="primary"/>
          </IconButton>
        </Tooltip>
      )}
      {!editTitle? (
      <Typography className={classes.title} variant="h4" id="tableTitle" onClick={()=>setEditTitle(true)}>
        Nutrition
      </Typography>):<TextField
          required
          size="medium"
          defaultValue="Nutrition"
        />
      }
    </Toolbar>
  )
}

