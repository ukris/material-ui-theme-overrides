import React, { useState } from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField';

import Ellipsis from 'components/ellipsis'
import Country from 'components/country'
import DateRangePicker from 'components/date-range-picker'
import { valToAvatars } from 'components/avatar'
import PeopleDropdownSelect from 'components/people-dropdown-select'
import Address from 'components/address'
import { Tag } from 'components/tags'
import { SelectLabel } from 'components/labels'
import  { BootstrapInput } from 'components/input'
import {  roundFrac } from 'helpers'
import { CellValue, EditorCellType, EditorCellProps } from '../types'
import { GlobalContext } from 'context'
import useStyles from '../cell-renderers/style'

export  type HandleClick = (e: any) => void

export function editAddress({cell, updateCell, setShowEditor}: EditorCellProps) {
    return (
    <Address
        placeName={cell.value as string}     
        updateCell={(placeName: string) => updateCell(placeName)}
        setShowEditor={setShowEditor}
    />)
}

export function  editDateRange({cell, classes,  updateCell}: EditorCellProps) {
    const { value } = cell
    let start:number = 0
    let end:number = 0
    const val:any = value as any
    if (Array.isArray(value) && value.length && value[0] && (!isNaN(val[0]))) {
        start = val[0]
        end = val[1] || 0
    }
    const formatStr = 'MMM dd'
    const fontSize = classes ? classes.fontSizeSm : null
    const accent = classes ? classes.accent : null

    return (
        <Tag cls={clsx(fontSize, accent)}>
            <DateRangePicker
                format={formatStr}
                dates={{start:  format(start, formatStr), end: format(end, formatStr)}}
                // @ts-ignore
                updateCell={(datesArray: Date[]) => updateCell([datesArray[0], datesArray[1]])}
            />
        </Tag>
    )
}

export function  editPeople({cell, col, setShowEditor}: EditorCellProps) {
    const { value } = cell
    const { options = []} = col
    const avatars = valToAvatars(value as any[], col)
    const people = valToAvatars(options, col)
    return (<PeopleDropdownSelect 
                people={people}
                avatarGroupProps={{ shape:'circle', spacing:'separate',  avatars, max: 3, classes: {}, size: 'sm' }}
                setShowEditor={setShowEditor}
            />)
}

export function  editISOWithFlag({cell, updateCell, setShowEditor}: EditorCellProps) {
    const { value } = cell
    const val:string = typeof value === 'string'? value: ''
    return (
        <Country
            country={val}
            updateCell={updateCell}
            setShowEditor={setShowEditor}
        />
    )
}

export function editEllipsis({cell, updateCell, classes} : EditorCellProps) {
    const { value } = cell
    const val:string = typeof value === 'string'? value: ''
    return (
        <Ellipsis 
            text={val}
            classes={classes}
            updateCell={(text: string) => updateCell(text)}
        />)
}

export function editTags({cell, updateCell, setShowEditor, classes} :EditorCellProps) {
    const col = GlobalContext.getColumn(cell.colIndex)
    const value:string[] = cell.value ? cell.value as string[]: [];
    const { label='Tag', options=[] } = col;
    const updateTagCell = (e:any) => {
        const val = e.target.value
        if (val && !options.includes(val)) { // tag addition
            options.push(val)
            value.push(val)
        } else if(value.includes(e.target.parentElement.parentElement.children[0].innerText)) { // tag removal
            const indexOptions = options.findIndex((val:any) => val === e.target.parentElement.parentElement.children[0].innerText)
            options.splice(indexOptions, 1)

            const indexValue = value.findIndex(val => val === e.target.parentElement.parentElement.children[0].innerText)
            value.splice(indexValue, 1)
        }
        updateCell(value)
    }
    return(
        <ClickAwayListener onClickAway={()=> {
            setShowEditor(null)
        }}>
            <Autocomplete
                multiple
                id={label}
                options={options}
                defaultValue={value}
                freeSolo
                limitTags={4}
                style={{position:'absolute', zIndex: 1000, marginTop: '-20px'}}
                // @ts-ignore
                renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip variant="default" label={option} {...getTagProps({ index })} />
                    ))
                }
                onChange={updateTagCell}
                renderInput={(params) => (
                <TextField {...params}  variant="standard"  placeholder={label} />
                )}
            />
        </ClickAwayListener>
    )
}


export function editLabel({cell, updateCell, setShowEditor, classes} :EditorCellProps) {
    const col = GlobalContext.getColumn(cell.colIndex)
    const value:string = cell.value ? cell.value as string: '';
    const { label='Tag', options={default:'OK',options:{
        'OK':1
    }} } = col;

    const updateLabel = (val:string) => {
        if (val !== value) {
            updateCell(val)
        }
    }

    const updateOptions = (options:any) => {
        //
        console.log(options)
    }
    
    return(
        <ClickAwayListener onClickAway={()=> {
            setShowEditor(null)
        }}>
            <SelectLabel 
                value={value} 
                onChange={updateLabel}
                onUpdateOptions={updateOptions}
            />
        </ClickAwayListener>
    )
}

export function DefaultEditor({cell, col, updateCell, setShowEditor, classes} :EditorCellProps)  {
    const [val, setVal] = useState(cell.value)
    return(
        <ClickAwayListener onClickAway={()=> {
            setShowEditor(null)
        }}>
            <BootstrapInput
                value={val}
                onChange={(e)=>{
                    setVal(e.target.value)}}
                onBlur={(e:any)=>updateCell(val,e)}    
                >
            </BootstrapInput>
        </ClickAwayListener>
    );
}

export default function  EditCell(props: EditorCellType) {
    const classes = useStyles(props)
    const col = GlobalContext.getColumn(props.cell.colIndex)
    const { cell, setShowEditor, setNewVal } = props;
    const updateCell = (newVal: CellValue, e?: any) => {
        e && e.stopPropagation()
        const { number, min, max, regex, step } = col;
        let val: CellValue = newVal
        if (number  && min !== undefined && max) {
            let v:number = Number(newVal)
            if (isNaN(v)) {
                GlobalContext.setFocusedCell(null)
                setShowEditor(null)
                return
            }
            if (v < min) {
                v = min
            }
            if (v > max) {
                v = max
            }
            if (step || step === null) {
                v = roundFrac(v,step)
            }
            val = v
        }
        setNewVal(val)
        GlobalContext.updateCell(cell,val)
        GlobalContext.setFocusedCell(null)
        setShowEditor(null)
    }

    const editProps: EditorCellProps = {
        col,
        classes,
        updateCell,
        ...props
    }
    return (col.editor ? col.editor(editProps) : DefaultEditor(editProps))
}

