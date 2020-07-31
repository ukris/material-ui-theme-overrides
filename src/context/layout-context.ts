import { createContext } from 'react'

interface ILayoutContext {
    fullScreen?: boolean
    collapsed?: boolean
    miniMenu?: boolean
    setFullScreen: (full:boolean) => void
    setCollapsed: (collapsed: boolean) => void
    setMiniMenu: (mini:boolean) => void
    width: number
    height: number
    setWidth: (width: number) => void
    setHeight: (height: number) => void
};

const LayoutContext = createContext({} as ILayoutContext);

export default LayoutContext;