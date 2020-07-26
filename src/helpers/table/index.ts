import { GlobalContext } from 'context'
import { Column, Range, Cell } from 'apps/table/types'
import { Buffer } from 'types'
const { buffers } = GlobalContext

function desc(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
}
  
export function sortRows(array: any, cmp: any) {
    const stabilizedThis = array.map((el: any, index: number) => [el, index])
    stabilizedThis.sort((a: any, b: any) => {
      const firstObj = {...Object.keys(a[0])}
      Object.keys(a[0]).forEach((key: any) => { firstObj[key] = a[0][key].value})

      const secondObj = {...Object.keys(b[0])}
      Object.keys(b[0]).forEach((key: any) => { secondObj[key] = b[0][key].value})
    
      const order = cmp(firstObj, secondObj)
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el: any[]) => el[0])
}
  
export function getSorting(order: any, orderBy: any) {
    return order === 'desc'
      ? (a: any, b: any) => desc(a, b, orderBy)
      : (a: any, b: any) => -desc(a, b, orderBy)
}
export const LOOKUP_DELIM = '_'

export type LookupId = {
    domainId: number
    projectId: number
    boardId: number
    laneId: string
}

export function getLookupId({domainId, projectId, boardId, laneId}: LookupId){ 
    return `${domainId}${LOOKUP_DELIM}${projectId}${LOOKUP_DELIM}${boardId}${LOOKUP_DELIM}${laneId}` 
}

export function getIds(lookupId:string): LookupId | null {
    const ids=lookupId.split(LOOKUP_DELIM)
    if (ids.length === 4) {
        return {
            domainId: Number(ids[0]),
            projectId: Number(ids[1]),
            boardId: Number(ids[2]),
            laneId: (ids[3])
        }
    }
    return null
}

export function initLaneBuffer(lookupId:string, rows:any[]) {
    const buffer:Buffer = {
        key: lookupId,
        data: rows,
        date: Date.now()
    }
    buffers.push(buffer)
    return buffers
}

export function setLaneCopyBuffer(lookupId: string, id: number | 'ALL' | 'EMPTY')  {
    /* 
    const buffer = buffer[0]
    buffer.date = Date.now()
    if (!laneCopyBuffer[lookupId]) {
        const keys = Object.keys(laneCopyBuffer)
        keys.forEach(key=> delete laneCopyBuffer[key])
    }
    const rows = buffer.rows
    buffer.date = Date.now()
    if (id === 'ALL') {
        laneCopyBuffer[lookupId] = {
            rows: [...rows],
            date: Date.now()
        }
         // @ts-ignore
        return rows.map(row=>row.id)
    } else if (id === 'EMPTY') {
        laneCopyBuffer[lookupId] = {
            rows: [],
            date: Date.now()
        }
        return []
    }
    const idx = buffer.rows.findIndex(row=>row.id === id)
    const selected = laneCopyBuffer[lookupId]
                    ? laneCopyBuffer[lookupId].rows
                    : []
    const row = rows[idx]
    // @ts-ignore
    const selectedIndex = selected.findIndex(id=> selected.id === id)
    let newSelected: any[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [row])
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    laneCopyBuffer[lookupId] = {
        date:  Date.now(),
        rows: newSelected
    }
    const ret = newSelected.map(row=>row.id)
    return ret */
}

function validateBuffer(lookupId: string, source: boolean = true) {   
    /*
    const tag = source ? 'Source ': 'Target'
    if (!lookupId) {
        return {
            error: `${tag} id Not provided`
        }
    }
    if ((source && !laneCopyBuffer[lookupId]) || !laneBuffer[lookupId]) {
        return {
            error: `Data not in ${tag} buffer`
        }
    }
    if (source && (!laneCopyBuffer[lookupId].rows || !laneCopyBuffer[lookupId].rows.length)) {
        return {
            error: 'No Rows selected in source to copy'
        }
    }
    return null */
}

export function setLanePasteBuffer(lookupId: string, startPos: number = -1) {
    /*
    let error = validateBuffer(lookupId, false)
    if (error) {
        return error
    }
    const keys = Object.keys(laneCopyBuffer)
    error = validateBuffer(keys && keys.length ? keys[0]: '', true)
    if (error) {
        return error
    }
    const copyId = keys[0]
    const source =  laneCopyBuffer[copyId]
    // copy to saw lane - so change name && id
    if (copyId === lookupId) {

    } else {
       // preserve name,  change ids 
    }
    */
}

export function setmoveLine(lookupId: string, fromLine: number = 0, toLine: number =-1) {
    /*
    let error = validateBuffer(lookupId)
    if (error) {
        return error
    }
    const buffer= laneBuffer[lookupId]
    const { rows } = buffer
    // check error
    const fromRowIdx = rows[fromLine]
    // check error
    const toRowIdx = toLine === -1 ? '' :  rows[toLine]
    // TBD
    if (toRowIdx) {
        rows[fromLine] = toRowIdx
    }
    if (toLine === -1) {
        rows.push(fromRowIdx)
    } else {
        rows[toLine] = fromRowIdx
    }
    buffer.rows = rows
    */
}

export function moveLinesInLane(lookupId: string, movetoStart: boolean=false) {
// tbd
}
// if not readonly changes must be propogated
// we will initially support readonly
export function linkLinesInLane(lookupId: string, movetoStart: boolean=false, readonly: boolean = true) {
    // tbd
}

export function getGridTemplateColumns(columns: Column[], defaultWidth = 3) {
    let minMaxColumns = ''
    columns.forEach(col=>{
        const frac = !col.width ? 1
                        :(Math.round((col.width as number)/defaultWidth) * 100)/100
        minMaxColumns += `minmax(${defaultWidth}em),${frac}fr`
    })
    return minMaxColumns
}

export function getRange(range:Range) {
    const { min, max } = Math
    let { fromRowIdx, toRowIdx, fromColIdx, toColIdx } = range
    fromRowIdx = min(fromRowIdx, toRowIdx)
    toRowIdx = max(fromRowIdx, toRowIdx)
    fromColIdx = min(fromColIdx, toColIdx)
    toColIdx = max(fromColIdx, toColIdx)
    return {
        ...range,
        fromRowIdx,
        toRowIdx,
        fromColIdx,
        toColIdx,
    }
}

export function isCellInRange(range: Range, rowIdx: number, colIdx: number) {
    const { fromRowIdx, toRowIdx, fromColIdx, toColIdx } = range
   return ((colIdx <= fromColIdx && colIdx >= toColIdx) && (
        rowIdx <= fromRowIdx && rowIdx >= toRowIdx
    ))
}

export function mergeRanges(range1: Range,  range2: Range) {
    const { min, max } = Math
    const fromColIdx = min(range1.fromColIdx, range2.fromColIdx)
    const toColIdx = max(range1.toColIdx, range2.toColIdx)

    const fromRowIdx = min(range1.fromRowIdx, range2.fromRowIdx)
    const toRowIdx = max(range1.toRowIdx, range2.toRowIdx)
    return {
        ...range1,
        fromColIdx,
        toColIdx,
        fromRowIdx,
        toRowIdx
    }
}

export function isRangeEquals(range1: Range, range2: Range) {
    return (
      range1.fromRowIdx === range2.fromRowIdx &&
      range1.fromColIdx === range2.fromColIdx &&
      range1.toRowIdx === range2.toRowIdx &&
      range1.toColIdx === range2.toColIdx
    );
}

export function isSameCell(cell1: Cell | null, cell2: Cell | null) {
    if (!cell1 ||  !cell2)   {
        return false
    }
    return (cell1 && cell2 && (cell1.rowIndex === cell2.rowIndex) && cell1.colIndex === cell2.colIndex) && (cell1.rowId === cell2.rowId)
}