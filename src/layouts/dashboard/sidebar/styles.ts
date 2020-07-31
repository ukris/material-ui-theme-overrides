import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
  root: {
    maxHeight: '35vh',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
  drawer: {
    borderRight: 0,
    zIndex: 1200,
    width: 271,
    top: theme.mixins.toolbar.minHeight,
    maxHeight: 'calc(100%)',
    overflow: 'auto',
    paddingBottom: 100,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '&::webkit-scrollbar': {
      width: 50
    },
    '&::webkit-scrollbar-track': {
      backgroundColor: '#000'
    },
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    right: 5,
  },
  profile: {
    marginBottom: theme.spacing(5),
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.custom.secondary,
      borderLeft: `4px solid ${theme.palette.custom.primary}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        marginLeft: '-4px',
      },
    },
    '& + &': {
      marginTop: theme.spacing(1),
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
    marginRight: 0,
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.contrastText,
  },
  [theme.breakpoints.down('sm')]: {
    drawer: { top: 0 },
    menuButton: { dispaly: 'none' },
    profile: { marginTop: theme.spacing(5) },
  },
}))
