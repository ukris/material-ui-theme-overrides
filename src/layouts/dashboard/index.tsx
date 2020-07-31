import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'
import useStyles from './styles'
import MiniMenu from './sidebar/mini-width'
import Footer from './footer'
import Sidebar  from './sidebar'
import TopBar  from './topbar'

interface DashboardProps {
  // @ts-ignore
  children: PropTypes.node
}
function Dashboard({ children }: DashboardProps) {
  const classes = useStyles()
  const theme = useTheme()
  debugger
  // @ts-ignore
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  })
  const [openSidebar, setOpenSidebar] = useState(true)

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  const cls = clsx({ [classes.contentShift]: openSidebar, [classes.content]: true })
  return (
    <div className={classes.root}>
      <TopBar openSidebar={openSidebar} onToggleSidebar={handleToggleSidebar} />
      <Sidebar
        onClose={handleToggleSidebar}
        open={openSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      {
        !openSidebar && <MiniMenu handleClick={handleToggleSidebar} />
      }
      <main className={cls}>
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default Dashboard
