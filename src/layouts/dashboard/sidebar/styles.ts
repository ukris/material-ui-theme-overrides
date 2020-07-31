import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.custom.secondary,
      borderLeft: `4px solid ${theme.palette.custom.primary}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        marginLeft: '-4px',
      },
    },
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.custom.primary}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.custom.secondary,
    '& $listItemText': {
      color: theme.palette.contrastText,
    },
    '& $listItemIcon': {
      marginLeft: '-4px',
    },
  },
  listItemIcon: {
    
  },
  proIcon: {
    cursor: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    drawer: { top: 0 },
    menuButton: { dispaly: 'none' },
    profile: { marginTop: theme.spacing(5) },
  },
}))
