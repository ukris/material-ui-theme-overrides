import React, { useContext, useEffect, useState } from 'react'
import {Table , TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
// search - https://github.com/uqix/reactkit-table
// https://github.com/techniq/mui-virtualized-table
// https://github.com/bnabriss/react-mui-pagination
import DragIndicator from '@material-ui/icons/DragIndicator'

import TableHead from './table-head'
import TableToolbar from './table-toolbar'
import RenderCell from './cell-renderers'
import { Cell, TableType } from './types'
import { KeyAction } from 'helpers/table/keycode-mouse-events'

import { getLookupId, getSorting, sortRows, } from 'helpers/table'
import { FONT_BASIS } from 'theme'
import { TableContext, GlobalContext } from 'context'
import useStyles from './styles'

function EnTable(props: TableType) {
  const { rowsData, defaultOrderBy = 'name', desc = false, editable=false } = props

  const {
    columns,
    setColumns,
    rows, 
    setRows,
    domainId=-1,
    projectId=-1,
    boardId = -1,
    laneId = ''
  } = GlobalContext
  const {
    setEditable
  } = useContext(TableContext)
  const lookupId = getLookupId({domainId, projectId, boardId, laneId})
  const classes = useStyles(props)
  const [order, setOrder] = useState(desc)
  const [orderBy, setOrderBy] = useState(defaultOrderBy)
  const [selected, setSelected] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [collapsed, setCollapased] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [focusedCell, setFocusedCell] = useState<Cell|null>(null)
  const [] = useState<KeyAction|null>(null)
  const colDefs = props.columns

  useEffect(() => {
    setRows(rowsData)
    setColumns(colDefs)
    setIsLoading(false)
    setEditable(editable)
  },[rowsData, setRows, editable, setEditable, colDefs, setColumns])
  
  if (isLoading) {
    return null
  }
  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order
    setOrder(isDesc)
    setOrderBy(property)
  }
  
  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row,index) => index)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: any, index: number) => {
    const selectedIndex = selected.indexOf(index)
    let newSelected: any[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeDense = (event: any) => {
    setDense(event.target.checked)
  }
  // @ts-ignore
  const isSelected = (index: number) => selected.indexOf(index) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  const id = 'enhanced-table'

  return (
    <div className={classes.root} data-test="table-container">
      <Paper className={classes.paper} elevation={0}>
        <TableToolbar numSelected={selected.length}
          lookupId={lookupId}
          collapsed={collapsed}
          setCollapsed={setCollapased}
          editable={editable}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="table"
            id = {id}
          >
            <TableHead
              numSelected={selected.length}
              desc={order}
              orderBy={orderBy}
              onSelectAll={handleSelectAllClick}
              onSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            <TableBody>
              {sortRows(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  const isItemSelected = isSelected(index)
                  const rowId = `${id}-row-${index}`
                  return (
                    <TableRow
                      hover
                      onClick={(event:any) => handleClick(event, index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      id={rowId}
                    >
                      <TableCell style={{width:'5px'}} padding="none" 
                        id={`${index}|${row.id}`}>
                        <DragIndicator />
                      </TableCell>
                      <TableCell 
                        padding="none"
                        id={`${index}|${row.id}`}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': rowId }}
                        />
                      </TableCell>
                      {columns.map((col, idx) => {
                        if (col.hidden || col.hide) {
                          return null
                        }
                        const thisCell = {rowId: row.id, rowIndex: index, colIndex: idx, value:row[idx]}
                        return (
                          <RenderCell
                            key={`${index}-${idx}`}
                            cell={thisCell}
                          />
                        )
                      })}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 12 * FONT_BASIS : 15 * FONT_BASIS) * emptyRows }}>
                  <TableCell 
                    colSpan={6}
                    />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination 
          page={page + 1} 
          onChange={handleChangePage}
          count={5}
          color="primary"
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  )
}

export default React.memo(EnTable)