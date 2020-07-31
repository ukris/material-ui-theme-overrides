import React, { ReactElement  } from 'react'
import {Popover} from '@material-ui/core'
import { ProjectsNav } from 'components'

interface Props {
    
}

function PopOverMenu(props: any): ReactElement {
    const { handlePopoverClose, anchorEl } = props
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
           <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            >

            <ProjectsNav/>
        </Popover>
      </div>
    )
}

export default PopOverMenu
