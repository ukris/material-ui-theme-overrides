import React, { useState } from 'react'
import { Timeline } from 'components/timeline'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { PageTitle } from 'components'
import { Paper } from '@material-ui/core'
import timelinesData from 'mocks/timelines.json'
import peoplesData from 'mocks/people.json';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: { padding: theme.spacing(4) },
  paper: { padding: theme.spacing(3, 6) }
  }))
  const datesViews = ["quarter", "monthly", "week", "day"]
export default function TimeLine()
{
    const classes = useStyles()
    const [dateView, setDateView] = useState(0)
    
    const handleDateView = (value: string) =>
    {
        setDateView(parseInt(value))
    }
    return(
        <div className={classes.root}>
            <PageTitle title="Timeline"/>
            <Paper className={classes.paper} style={{marginTop: 40, overflowX: 'auto'}}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Date view</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={dateView}
                label="Age"
                onChange={(e: React.ChangeEvent<{  name?: string | undefined; value: unknown }>) => handleDateView(String(e.target.value))}
                >
                    {
                        datesViews.map((dateView, idx) => {
                            return <MenuItem value={idx}>{dateView}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
            <Timeline 
                dateView={datesViews[dateView]} 
                data={timelinesData.timelines}
                users={peoplesData}/>
            </Paper>
        </div>
    )
}