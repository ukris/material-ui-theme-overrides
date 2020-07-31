import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Hidden,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { pages } from '../pages'
import { Profile, ProjectsNav } from 'components'
import useStyles from './styles'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { DARK } from 'theme'
import { GlobalContext } from 'context'

function Sidebar(props: any) {
  const { open, variant, onClose } = props
  const classes = useStyles();
  const { palette } = GlobalContext;
  const { type } = palette;
  return (
    <OverlayScrollbarsComponent className={`${classes.root} overflow-auto ${type === DARK ? 'os-theme-light' : 'os-theme-dark'}`}>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        open={open}
        onClose={onClose}
        variant={variant}
      >
       {  <section>
          <Hidden mdUp>
            <IconButton className={`${classes.menuButton} absolute`} aria-label="Menu" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Hidden>
          <Profile className={classes.profile} />
          <ProjectsNav />
            <List component="div" disablePadding>
              {pages.map(page => (
                <ListItem
                key={page.title}
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                  to={page.href}
                  >
                  <ListItemIcon className={classes.listItemIcon}>{page.icon}</ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary={page.title}
                    />
                </ListItem>
              ))}
            </List>
          </section> }
      </Drawer>
    </OverlayScrollbarsComponent>
  )
}
Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
}

export default Sidebar
