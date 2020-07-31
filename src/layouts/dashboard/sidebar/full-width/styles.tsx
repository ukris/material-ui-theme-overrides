import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
  root: {
    maxHeight: '35vh',
    marginBottom: theme.spacing(2),
  },
  drawer: {
    borderRight: 0,
    zIndex: 1200,
    width: "17rem",
    top: theme.mixins.toolbar.minHeight,
    maxHeight: 'calc(100%)',
    paddingBottom: "6.25rem",
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  menuButton: {
    top: 0,
    right: '.3rem',
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
