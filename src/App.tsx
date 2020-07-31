import React, { useState } from 'react'
import { Router } from 'react-router-dom'
import { ThemeContext, ThemeProvider, ThemeZoom, themePalette, LIGHTORDARK } from './theme'
import { GlobalContext, ProjectContext, TableContext } from 'context'
import { Cell, Column } from 'apps/table/types'
import history from './history'
import Routes from './routes'
import projectsSrc from 'mocks/projects.json'
import 'overlayscrollbars/css/OverlayScrollbars.css'

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
function App() {
  const [themeZoom, setThemeZoom] = useState<ThemeZoom>(GlobalContext.themeZoom)
  const { theme } = themeZoom
  const [type, setType] = useState(themePalette[theme].type as LIGHTORDARK)
  const [editable, setEditable] = useState(false)
  const [focusedCell, setFocusedCell] = useState<Cell | undefined>(undefined)
  const [currentProject, setCurrentProject] = useState<any>({})
  const [projects, setProjects] = useState(projectsSrc.projects || [])

  return (
    <ThemeContext.Provider value={{ themeZoom, setThemeZoom, type, setType }}>
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
    </ThemeContext.Provider>

  )
}

export default App