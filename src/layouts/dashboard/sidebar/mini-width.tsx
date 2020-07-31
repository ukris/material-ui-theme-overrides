import React, { ReactElement } from 'react'
import { List } from '@material-ui/core'

import Pages from "./pages"
import useStyles from "./mini-width-styles"

export default function MiniMenu(props:any): ReactElement {
    const { handleClick , ...res } = props;
    const classes = useStyles()

    return (
        <div className={classes.root} onClick={handleClick} {...res}>
           <List component="div" disablePadding>
               <Pages/>
            </List>
        </div>
    )
}
