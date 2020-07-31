import { makeStyles } from "@material-ui/core";

export default makeStyles( (theme:any) => ({
    root: {
        width: '4.375rem',
        height: '100vh',
        background: '#fff',
        paddingTop: '18.75rem',
    },
    proIcon: {
        marginLeft: theme.spacing(0.2),
    },
    listItem: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.custom.secondary,
          borderLeft: `4px solid ${theme.palette.custom.primary}`,
          borderRadius: '4px',
        },
      },
      activeListItem: {
        borderLeft: `4px solid ${theme.palette.custom.primary}`,
        borderRadius: '4px',
        backgroundColor: theme.palette.custom.secondary,
      },
      listItemIcon: {
        marginRight: 0,
        marginLeft: theme.spacing(1)
      },
      listItemText: {
        fontWeight: 500,
        color: theme.palette.contrastText,
      },
}))