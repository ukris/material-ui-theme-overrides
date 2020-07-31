import React, { ReactElement, useState } from 'react'
import { List } from '@material-ui/core'

import Pages from "../pages"
import useStyles from "./styles"

export default function MiniMenu(props:any): ReactElement {
    const { handleClick, ...res } = props;
    const classes = useStyles()
    const [display, setDisplay] = useState(false)

    const handleClickArrow = () => {
        setDisplay(!display)
    }

    return (
        <div className={`${classes.root} fixed flex flex-col justify-center items-center ${display ? 'hidden' : ''}`} {...res}>
               <Pages handleClick={handleClick} handleClickArrow={handleClickArrow}/>
        </div>
    )
}

