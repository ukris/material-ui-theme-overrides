import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import HomeIcon from '@material-ui/icons/Home'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { ListItem, ListItemIcon } from '@material-ui/core'
import ProjectIcon from 'components/icons/ProjectIcon'
import useStyles from "./styles"

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
  return (
    <>
    <ListItem className={classes.listItem}>
      <ListItemIcon className={classes.listItemIcon}>
        <ProjectIcon className={classes.proIcon} />
      </ListItemIcon>
    </ListItem>
    {
      pages.map(page => (
        <ListItem
          key={page.title}
          className={classes.listItem}
        >
          <ListItemIcon className={classes.listItemIcon}>{page.icon}</ListItemIcon>

        </ListItem>
      ))
    }
    </>
  )
}
