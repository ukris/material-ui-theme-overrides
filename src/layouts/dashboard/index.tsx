import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'
import useStyles from './styles'
import MiniMenu from './sidebar/mini-width'
import Footer from './footer'
import Sidebar  from './sidebar'
import TopBar  from './topbar'
import layoutContext from "context/layout-context"

interface DashboardProps {
  // @ts-ignore
  children: PropTypes.node
}
function Dashboard({ children }: DashboardProps) {
  const classes = useStyles()
  const theme = useTheme()
  const { miniMenu, fullScreen, setMiniMenu, setFullScreen  } = useContext(layoutContext)
  const [openSidebar, setOpenSidebar] = useState(true)
  const cls = clsx({ [classes.contentShift]: fullScreen || miniMenu, [classes.content]: true })
  
  debugger
  // @ts-ignore
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  })

  const handleToggleSidebar = () => {
    setFullScreen(!fullScreen)
    setMiniMenu(!miniMenu)
  }
  
  return (
    <div className={classes.root}>
      <TopBar openSidebar={Boolean(fullScreen)} onToggleSidebar={handleToggleSidebar} />
      <Sidebar
        onClose={handleToggleSidebar}
        open={Boolean(fullScreen)}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      { miniMenu && <MiniMenu handleClick={handleToggleSidebar} /> }
      <main className={cls}>
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default Dashboard
