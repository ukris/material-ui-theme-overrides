import React, { useLayoutEffect, useState } from 'react'
import { Router } from 'react-router-dom'
import debounce from 'lodash.debounce'

import { ThemeContext, ThemeProvider, ThemeZoom, themePalette, LIGHTORDARK } from './theme'
import { GlobalContext, LayoutContext, ProjectContext, TableContext } from 'context'
import { Cell, Column } from 'apps/table/types'
import history from './history'
import Routes from './routes'
import projectsSrc from 'mocks/projects.json'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import  { RESIZE_DEBOUNCE_TIME } from 'settings'

/*  domainId: number
    projectId: number
    boardId: number
    laneId?: number
    laneBy?: string
    rows: []
    columns: Column[]
    setProjectId:(projectId: number) => void
    setBoardId:(boardId: number) => void
    setLaneId:(laneId: number) => void
    setLaneBy:(labeBy: string) => void
    setRows: (rows:[]) => void
    setFilteredRows: (rows:[]) => void
    setColumn: (columns: Column[]) => void*/

    function useWindowSize() {
      const [size, setSize] = useState([window.innerWidth, window.innerHeight])  
  
      useLayoutEffect(() => {
        const handleResize = () => 
          setSize([window.innerWidth,
                  window.innerHeight])
        const debouncedHandleResize = debounce(handleResize, RESIZE_DEBOUNCE_TIME);
        window.addEventListener('resize', debouncedHandleResize);
        return () => {
          window.removeEventListener('resize', debouncedHandleResize);
        }
      }, []);
      
      return {
        width: size[0],
        height: size[1]
      }
  }
  
function App() {
  const [themeZoom, setThemeZoom] = useState<ThemeZoom>(GlobalContext.themeZoom)
  const { theme } = themeZoom
  const [type, setType] = useState(themePalette[theme].type as LIGHTORDARK)
  const [editable, setEditable] = useState(false)
  const [focusedCell, setFocusedCell] = useState<Cell | undefined>(undefined)
  const [currentProject, setCurrentProject] = useState<any>({})
  const [projects, setProjects] = useState(projectsSrc.projects || [])
  const [fullScreen, setFullScreen] = useState(true)
  const [miniMenu, setMiniMenu] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const size = useWindowSize()
  const [width, setWidth] = useState(size.width)
  const [height, setHeight] = useState(size.height)

  return (
    <ThemeContext.Provider value={{ themeZoom, setThemeZoom, type, setType }}>
      <LayoutContext.Provider  value={{fullScreen, setFullScreen, miniMenu, setMiniMenu, collapsed, setCollapsed, width, setWidth, height, setHeight}}>
      <ProjectContext.Provider
        value={{
          currentProject,
          setCurrentProject,
          projects,
          setProjects
        }}
      >
        <TableContext.Provider
          value={{
            editable,
            setEditable,
            focusedCell,
            setFocusedCell
          }}>
          <ThemeProvider>
            <Router history={history}>
              <Routes />
            </Router>
          </ThemeProvider>
        </TableContext.Provider>
      </ProjectContext.Provider>
      </LayoutContext.Provider>
    </ThemeContext.Provider>

  )
}

export default App