import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Widget, PageTitle } from 'components'
import { Column } from 'apps/table/types'
import { getColumnDefinitionWithDefaults } from 'apps/table/table-defaults'
import Table  from 'apps/table'
import getBackendEndpoint from 'endpoints/backend'
import useStyles from './styles'

type tableData = { columns:Column[], rows: any[], editable: boolean } | null

export default function Tables() {
  const [data, setData] = useState<tableData>(null)
  const classes = useStyles()

  let table = <React.Fragment />

  if(!data){
    fetch(getBackendEndpoint())
    .then(response => response.json()).then(json => {
      setData({
        ...json,
        columns: json.columns.map((column: any)=> {
          return getColumnDefinitionWithDefaults(column)
        })
      });
    })
  }

  if(data) {
    const columns: Column[] = data.columns as Column[]
    const rows: any[] = data.rows as any[]
    const editable = data.editable as boolean
    table = <Table columns={columns} rowsData={rows} editable={editable}/>
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PageTitle title="Tables" />
        </Grid>
        <Grid item xs={12}>
          <Widget title=" Table">
            {table}
          </Widget>
        </Grid>
      </Grid>
    </div>
  )
}
