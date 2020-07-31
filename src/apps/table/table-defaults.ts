import { capitalize } from 'helpers/string'
import { CellType, Column, CellTypeArray } from './types'
import { renderDateRange, renderLocation, renderLabel, renderRating, renderPercentage, renderTags, renderISOWithFlag, renderImage, renderPeople, renderEllipsis } from './cell-renderers'
import { editDateRange, editAddress,  editISOWithFlag, editLabel, editPeople, editEllipsis, editTags } from './cell-editors'
import  { FONT_BASIS } from 'theme'
export const cellTypeUserDefaults = {
    default:{
        align: 'left',
        width: 5
    },
    [CellType.dateRange]: {
        width: 10,
        renderer: renderDateRange,
        editor: editDateRange
    },
    [CellType.location]: {
        width: 15,
        renderer: renderLocation,
        editor: editAddress
    },
    [CellType.rating]: {
        width: 8,
        renderer: renderRating,
        number: true,
        step: 0.5,
        min: 1,
        max: 5
    },
    [CellType.progressPercentage]:{
        width: 15,
        renderer: renderPercentage,
        number: true,
        min: 0,
        max: 100
    },
    [CellType.label]:{
        width: 7,
        renderer: renderLabel,
        editor: editLabel
    },
    [CellType.tags]:{
        width: 16,
        renderer: renderTags,
        editor: editTags
    },
    [CellType.flagWithISO]:{
        renderer: renderISOWithFlag,
        editor: editISOWithFlag,
        width: 6
    },
    [CellType.image]:{
        renderer: renderImage
    },
    [CellType.people]:{
        renderer: renderPeople,
        editor: editPeople,
        width: 9
    },
    [CellType.ellipsis]:{
        renderer: renderEllipsis,
        editor: editEllipsis,
        width: 10
    }
  }

  export const getColumnDefinitionWithDefaults = (col: Column) => {
    const { type = CellType.text } = col
    const nm = type as string

    // @ts-ignore
    const typeDefs = cellTypeUserDefaults[type] || {} 
    const def= {...cellTypeUserDefaults.default,
                ...typeDefs }
    const ret: Column = {...def, ...col}
    if (!ret.measure) {
        const measure = ~nm.indexOf('range') 
                    ? true 
                    : ~nm.indexOf('date') 
                    ? true
                    : ~nm.indexOf('number') 
                    ? true 
                    : ~nm.indexOf('amount') 
                    ? true
                    : ~nm.indexOf('percent') 
                    ? true : false
        if (measure) {
            ret.measure = measure
        }
    }
    if (!ret.label) {
      ret.label = capitalize(ret.id)
    }
    ret.width = ret.width * FONT_BASIS/2
    return ret
}