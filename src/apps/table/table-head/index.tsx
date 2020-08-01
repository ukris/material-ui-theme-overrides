import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import DragIndicator from '@material-ui/icons/DragIndicator'
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import { getWidth } from 'helpers'
import { TableHeadTypes } from '../types'
import useStyles from './styles'

export default function EnTableHead(props: TableHeadTypes) {
  const { onSelectAll, desc, orderBy, numSelected, rowCount, onSort, columns } = props
  const order = desc ? 'desc' : 'asc'
  const classes = useStyles(props)

  const createSortHandler = (property: string) => (event: any) =>
    onSort(event, property)

  return (
    <TableHead>
      <TableRow>
      <TableCell padding="none"
            id="header">  
        </TableCell>
        <TableCell 
            style={{width:'5px'}} 
            padding="none"
            id="drag">
            <DragIndicator />
        </TableCell>
        <TableCell padding="none" id="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
    
        {columns.map((column, idx) => {
          const { hidden, hide, id, align, disablePadding, label, width} = column
          if (hidden || hide) {
            return null
          }
          return (
            <TableCell
              key={id}
              align={align || 'left'}
              padding={disablePadding ? 'none' : 'default'}
              style={{minWidth: getWidth(width), 
              'paddingRight': '1rem'}}
              sortDirection={orderBy === id ? order : false}
              id={`${idx}`}
            >
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
              >
                {label}
                {orderBy === id ? (
                  // @ts-ignore
                  <span className={classes.visuallyHidden}>
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}
