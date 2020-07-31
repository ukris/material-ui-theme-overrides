import React, { useState, useContext } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import HomeIcon from '@material-ui/icons/Home'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { ListItem, ListItemIcon } from '@material-ui/core'
import ProjectIcon from 'components/icons/ProjectIcon'
import useStyles from "./styles"
import ArrowIcon from './arrow-icon'
import PopOverMenu from  "./popover-menu"

export const pages = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Typography',
    href: '/typography',
    icon: <PersonOutlineIcon />,
  },
]

export default (props: any) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { handleClick, handleClickArrow } = props;


  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
      setAnchorEl(null)
  }

  return (
    <div className={` flex flex-col justify-center items-center w-16`}>
    <ListItem>
      <ListItemIcon 
          className={`${classes.listItemIcon} mb-3 `}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
        <ProjectIcon className={classes.proIcon} />
        <PopOverMenu
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
        />
      </ListItemIcon>
    </ListItem>
    {
      pages.map(page => (
        <ListItem
          key={page.title}
          className={`${classes.listItem}`}
          onClick={handleClick}
        >
          <ListItemIcon className={`${classes.listItemIcon} mb-3 `}>{page.icon}</ListItemIcon>

        </ListItem>
      ))
    }
    <ArrowIcon handleClickArrow={handleClickArrow}/>
    </div>
  )
}
