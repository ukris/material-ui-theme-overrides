// 1. copy rows
// 2. paste rows
// 3. Add Lane
// 4. Change Lane Color
// 5. 
import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'

type BindMenu =  {
    id: string | undefined;
    anchorEl: HTMLElement | undefined;
    open: boolean;
    onClose: () => void;
    onMouseLeave: (event: React.SyntheticEvent<any, Event>) => void;
}
interface Props {
    editable: boolean
    onClick: () => void;
    [x:string]: any;
}
type Option = {
    icon?: string
    title: string
    id: string
    forEditOnly?: boolean
    action?: ()=>void
    divider?: Boolean
}
const options:Option[] = [{
        title: 'Add Lane',
        id: 'add_lane',
    },
    {
        title: 'Duplicate Lane',
        id: 'duplicate_lane',
    },
    {
        title: 'Change Color',
        id: 'change_color'
    },
    {
        title: 'Import from Excel',
        id: 'import_excel'
    },
    {
        title: 'Export to Excel',
        id: 'export_excel'
    },
    {
        title: 'Copy Selection',
        id: 'copy_selection'
    },
    {
        title: 'Paste Selection',
        id: 'paste_selection',
        forEditOnly: true
    }
]
export default function TableToolbarMenu(props: Props) {
  const { onClick, editable} = props;
  const opts =  options.reduce((arr:Option[], opt) => {
    if (!editable && opt.forEditOnly) {
        return arr
    }
    arr.push(opt)
    return arr
  },[]).map(opt => <MenuItem key={opt.id} onClick={onClick}> {opt.title}</MenuItem>)
  return(<>{opts}</>)
}