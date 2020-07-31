import React from 'react'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import { IconButton } from '@material-ui/core'

export default function FullScreenToggler({ className }: any) {

    const [fullScreen, setFullscreen] = React.useState<boolean>(false);
    const handleFullScreen = () => {
        !fullScreen ? enterFullScreen() : exitFullScreen()
        setFullscreen(!fullScreen)
    }
    const enterFullScreen = () => {
        document.documentElement.requestFullscreen()
    }
    const exitFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        }
    }
    //Check esc key action 
    const onFullScreenChange = () => {
        !document.fullscreen ? setFullscreen(false) : setFullscreen(true)
    }

    React.useEffect(() => {
        document.addEventListener("fullscreenchange", onFullScreenChange, false);
    }, [])

    return (
        <IconButton onClick={handleFullScreen} className={className}>
            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
    )
}