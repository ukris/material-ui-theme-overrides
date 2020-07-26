import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Avatar, Typography } from '@material-ui/core'
import useStyles from './styles'

const Profile = (props: any) => {
  const { className, ...rest } = props

  const classes = useStyles()

  const user = {
    name: 'John Doe',
    avatar: '/images/john.jpeg',
    bio: 'Product Manager',
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="John Doe"
        className={classes.avatar}
        component={Link}
        src={user.avatar}
        to="/"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  )
}

Profile.propTypes = {
  className: PropTypes.string,
}

export default Profile
