import React, { ReactElement, useContext, useState } from 'react'
import { ArrowBack } from "@material-ui/icons"
import useStyles from "./styles"
import LayoutContx from "context/layout-context"

export default function ArrowIcon(props: any): ReactElement {
    const classes = useStyles()
    const {handleClickArrow, ...res } = props;
    

    return (
        <>
            <ArrowBack 
                className={`${classes.root} z-50 mr-2 mt-6 cursor-pointer`} 
                onClick={handleClickArrow}
                {...res} 
            />
        </>
    )
}
