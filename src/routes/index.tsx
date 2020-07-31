import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Tables from 'pages/tables'
import TimeLine from 'pages/timeline';
import Typography from 'pages/typography'
import Project from 'pages/project'
import WithLayoutRoute from './with-layout-route'
import DashboardLayout from 'layouts/dashboard'

function Routes() {
  return (
    <Switch>
      <WithLayoutRoute component={Tables} exact layout={DashboardLayout} path="/tables" />
      <WithLayoutRoute component={TimeLine} exact layout={DashboardLayout} path="/timeline" />
      <WithLayoutRoute component={Project} layout={DashboardLayout} path="/projects/:id" />
      <WithLayoutRoute component={Typography} exact layout={DashboardLayout} path="/typography" />
      <Redirect to="/tables" />
    </Switch>
  )
}

export default Routes
