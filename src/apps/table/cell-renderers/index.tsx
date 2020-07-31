import React, { useContext, useState, Suspense }from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'

import TableCell from 'vendors/mui-table/TableCell'
import Star from '@material-ui/icons/Star'
import Circle from '@material-ui/icons/FiberManualRecord'
import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import AddIcon from '@material-ui/icons/Add'

import {RenderCountry} from 'components/country'
import { valToAvatars } from 'components/avatar'
import AvatarGroup from 'components/avatar-group/AvatarGroup'
import { Tag, Tags } from 'components/tags'
import { Label } from 'components/labels'
import ProgressBar from 'components/progressbar'
import { RenderCellType, CellValue, RenderCellProps } from '../types'
import { getWidth, roundFrac } from 'helpers'
import { GlobalContext, TableContext } from 'context'
import { tablePadding } from 'theme'
import useStyles from './style'

export  type HandleClick = (e: any) => void

export function renderLocation({classes, width, value, handleClick}: RenderCellProps) {
    const val:string = typeof value === 'string'? value : ''
    const { fontSize, ellipsis } = classes
    return (
        <div
            onClick={handleClick} title={val || 'Select a Place'}
            style={{width: getWidth(width)}}
            className={`${fontSize} ${ellipsis}`}
        >
            {val || ' '}
        </div>
    )    
}

export function renderPercentage({value, classes}: RenderCellProps) {
    const val = typeof value == 'number' ? value : 0
    const { widthCls } = classes
    return (
        <div className={clsx(widthCls )}>
            <ProgressBar value={val}/>
        </div>
    )
}

export function renderRating({classes, col, value, handleClick }: RenderCellProps) {
    const fontSizeLg = classes ? classes.fontSize : null
    const primaryColor = classes ? classes.primaryColor: null
    const val = typeof value == 'number' ? value : 0
    const { options } = col
    const option:any = options && options.length 
        ? options[0]
        : {
            max: 5, 
            icon: 'star'
        }
    const { icon = 'start', max = 5 }  = option
    const Icon = icon === 'star'
    ? <Star fontSize="inherit"/> 
    : 'circle' ? <Circle fontSize="inherit"/> 
    : 'mood' ? <MoodIcon fontSize="inherit"/> 
    : 'moodbad' ? <MoodBadIcon fontSize="inherit"/> :  <Star fontSize="inherit"/>
    const arr = new Array(max).fill(1)
    return ( 
        <div 
            className={clsx(fontSizeLg, 'inline')}
            onClick={(e)=>handleClick && handleClick(e)}
            >
           {arr.map((_,idx)=> {
                const cls = (idx+1) > val ? 'gray' : primaryColor
                const ico = (<span key={idx} className={clsx(cls)}>{Icon}</span>)
                return ico
            })}
        </div>
    )
}

export function  renderDateRange({classes, value, handleClick}: RenderCellProps) {
    let start:number = 0
    let end:number = 0
    const val:any = value as any
    if (Array.isArray(value) && value.length && value[0] && (!isNaN(val[0]))) {
        start = val[0]
        end = val[1] || 0
    }
    const formatStr = 'MMM dd'
    const fontSize = classes ? classes.fontSize : null
    const accent = classes ? classes.accent : null

    return (
        <Tag cls={clsx(fontSize, accent)} 
        onClick={handleClick}>
            {format(start, formatStr)}
            {' - '}
            {format(end, formatStr)}
        </Tag>
    )
}

export function  renderPeople({value, col, classes, handleClick}: RenderCellProps) {
    const AddI = handleClick ? AddIcon: null
    const avatars = valToAvatars(value as any[], col)

    const { paddingCls, widthCls } = classes
    return (<AvatarGroup
            avatars={avatars} 
            className={clsx(widthCls, paddingCls)}
            shape="circle" 
            size="sm" 
            max={3} 
            spacing="together" 
            Icon={AddI} 
            handleClick={handleClick}/>)
}

export function  renderImage({ value, handleClick}: RenderCellProps) {
    const val:any[] = Array.isArray(value) ? value: []
    const AddI = handleClick ? AddIcon: null
    return (<AvatarGroup avatars={val} shape="square" size="sm" max={3} spacing="separate" Icon={AddI}/>)
}

export function  renderISOWithFlag({value, handleClick}: RenderCellProps) {
    const val:string = typeof value === 'string'? value: ''
    return (<RenderCountry country={val} handleClick={handleClick}/>)
}

export function  renderTags({classes, col, value, width, handleClick}: RenderCellProps) {
    const fontSize = classes ? classes.fontSize : null
    const val:string[] = typeof value === 'string' ? [value] : Array.isArray(value)? value as string[]: []
    return(<Tags tags={val} 
        cls={clsx(fontSize,'inline')}
        css={{width: getWidth(width), minHeight: GlobalContext.fontSize.sm}}
        onClick={handleClick}/>
        )    
}
export function  renderLabel({classes, col, value, width, handleClick}: RenderCellProps) {
    const fontSize = classes ? classes.fontSize : null
    return(<Label value={value as string}
            onClick={handleClick}/>
        )    
}

export function renderEllipsis({col, value, handleClick, width, classes} : RenderCellProps) {
    const val:string = typeof value === 'string'? value: ''
    let cls:string = classes ? classes.fontSize : ''
    cls += ' truncate'

    return <div style={{width: getWidth(width)}}
                className={cls}
                onClick={(e)=> handleClick && handleClick(e)}>
                {val}
            </div>
}

const areEqual = (prevProps:RenderCellType, nextProps:RenderCellType) => {
    if (!prevProps.cell) return false
    return false
}

function  RenderCell(props:  RenderCellType) {
    const { cell } = props
    const { editable  } = useContext(TableContext)
    const [ newVal, setNewVal ] = useState<CellValue>(cell.value)
    const [showEditor, setShowEditor] = useState<any>(null)
    const classes = useStyles(props)
    //  @ts-ignore
    const { paddingCls, widthCls } = classes
    const col = GlobalContext.getColumn(cell.colIndex)
    const canEditThisCell = editable && !col.readOnly
   
    const { colIndex, rowIndex, rowId, value } = cell
    const id = `td-${rowIndex}-${colIndex}`
    const { align, disablePadding, renderer, width } = col
    const component = 'td'
    const scope = colIndex === 0 ? 'row' : undefined
    const adjWidth = width - tablePadding[0];

    let child: React.ReactElement | null = (typeof value !== 'object') ? <div className={clsx(widthCls, paddingCls )} style={{minWidth:getWidth(adjWidth)}}>{newVal}</div>: null
    const handleClick =  (e:any) => {
        e.stopPropagation()
        if (canEditThisCell) {
//      set only if different from current cell  setFocusedCell(cell)
            const { focusedCell }  = GlobalContext;
            if (!focusedCell || focusedCell.colIndex !== cell.colIndex || focusedCell.rowIndex !== cell.rowIndex) {
                let el = e.currentTarget.parentElement
                GlobalContext.setAnchorEl(el)
                GlobalContext.setFocusedCell(cell)
                const EditorCell = React.lazy(() => import('../cell-editors'))
                cell.value = newVal
                const editor = (
                    <Suspense fallback={null}>
                        <EditorCell 
                            cell={cell} 
                            setShowEditor={setShowEditor}
                            setNewVal={setNewVal}
                        />
                    </Suspense>
                )
                setShowEditor(editor)
            }
        }
    }
    if (renderer && !showEditor) {
        const props: RenderCellProps = {
            col,
            classes,
            value:newVal,
            width: adjWidth
        }
        props.handleClick = handleClick
        const newChild = renderer(props)
        if (newChild) {
            child = newChild
        }
    }
    const dataCol = `${colIndex}`
    const dataRow = `${rowIndex}|${rowId}`
    const cWidth = getWidth(col.width)
    return (
        <TableCell
            id={id}
            key={colIndex}
            align={align}
            component={component} 
            scope={scope}
            padding={disablePadding ? 'none' : 'default'}
            dataCol={dataCol}
            dataRow={dataRow}
            onClick={(ev:any) => handleClick && handleClick(ev)}
            style={{minWidth: cWidth, maxWidth: cWidth, marginRight: `${tablePadding[0]}rem`}}
        >
            {showEditor ? showEditor : child}
        </TableCell>
    )
}

export default React.memo(RenderCell, areEqual)