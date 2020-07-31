import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import DragIndicator from '@material-ui/icons/DragIndicator'
import MUITableHead from 'vendors/mui-table/TableHead'
import TableRow from 'vendors/mui-table/TableRow'
import TableCell from 'vendors/mui-table/TableCell'
import TableSortLabel from 'vendors/mui-table/TableSortLabel'
import { getWidth } from 'helpers'
import { TableHeadTypes } from '../types'
import useStyles from './styles'

export default function TableHead(props: TableHeadTypes) {
  const { onSelectAll, desc, orderBy, numSelected, rowCount, onSort, columns } = props
  const order = desc ? 'desc' : 'asc'
  const classes = useStyles(props)

  const createSortHandler = (property: string) => (event: any) =>
    onSort(event, property)

  return (
    <MUITableHead>
      <TableRow>
      <TableCell padding="none" dataCol=""
            dataRow="header">  
        </TableCell>
        <TableCell style={{width:'5px'}} padding="none"  dataCol="drag"
            dataRow="drag">
            <DragIndicator />
        </TableCell>
        <TableCell padding="none" dataCol="checkbox"
            dataRow="header" >
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
              dataCol={`${idx}`}
              dataRow="header"
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
    </MUITableHead>
  )
}
