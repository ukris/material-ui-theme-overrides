export type Location = {
  lat: number
  long: number
  countryCode: string
  stateRegion?: string
  zip?: string
  city?: string
  address?: string
}

export enum CellType {
    attachments = "attachments",
    milestone = "milestone",
    text = "text",
    phone = "phone",
    ellipsis = "ellipsis",
    location = "location",
    link = "link",
    html = "html",
    other = "other",
    date = "date",
    email = "email",
    pastDate = "pastDate",
    futureDate = "futureDate",
    dateRange = "dateRange",
    pastDateRange = "pastDateRange",
    futureDateRange = "futureDateRange",
    timeRange = "timeRange",
    datetime = "datetime",
    futureDateTime = "futureDateTime",
    pastDateTime = "pastDateTime",
    progressPercentage = "progressPercentage",
    rating = "rating",
    number = "number",
    numberRange = "numberRange",
    currencyAmount = "currencyAmount",
    country = "country",
    flagWithISO = "flagWithISO",
    person = "person",
    people = "people",
    image = "image",
    tags = "tags",
    label = "label",
    socialLinks = "socialLinks"
}

export const CellTypeArray = Object.values(CellType)

export enum EditType  {
  inplace,
  side,
  modal
}

export enum ShowDetailsType  {
  expand,
  side,
  modal
}

export type CellValue = string | number | string[] | number [] | object | null

export enum Unit  {
  none,
  currency,
  weight,
  volume,
  measurement_wh,
  measurement_whd,
  time_hours,
  time_days
}

export enum Aggregation {
  sum = 'sum',
  min = 'min',
  max = 'max',
  avg = 'avg',
  count = 'count'
}

export const AggregationArray = Object.values(Aggregation)

export type  Cell = {
  rowIndex: number
  rowId: string
  colIndex: number
  value: CellValue
}

export interface RenderCellType  {
  cell: Cell
  deps?: any // depedant column/row required if computed cell
  formula?: any //
}

export interface RenderCellProps {
  col: Column
  value: CellValue
  classes?: any
  style?: any
  width: number
  handleClick?: (e:any) => void 
}

export type UpdateCellProps = {
  newVal: CellValue
  cell: Cell
}

export  type UpdateCell = (newCell: CellValue, e?:any) => void

export interface EditorCellType  {
  cell: Cell
  setShowEditor: (edtior: any) => void
  setNewVal: (cell: CellValue) =>void
}

export interface EditorCellProps extends EditorCellType {
  col: Column
  classes: any
  updateCell: UpdateCell
}

export interface TooltipProps  {
  classes?: any
  col: Column
  row: any
  value: CellValue
}

export interface ColumnDefinition {
  id: string,
  disablePadding?: boolean,
  label?: string,
  type?: CellType,
  align?: "left" | "inherit" | "center" | "right" | "justify" | undefined,
  readOnly?: boolean,
  color?: string,
  measure?: boolean,
  computed?: boolean,
  hidden?: boolean, // hidden by system cannot toggle to show
  range?: boolean
  validator?: () => boolean | string
  formula?: (deps:any) => any
  oneOf?: boolean // if options has array and if oneof then select one
  options?: any
  unique?: boolean
  width?: number
  unit?: Unit,
  number?: boolean,
  min?: number,
  max?: number,
  step?: number | null,
  regex?: string,
  defaultAggregation?: Aggregation
  defaultSort?: boolean
  aggregations?: Aggregation[]
  renderer?: (props: RenderCellProps) => any,
  editor?: (props: EditorCellProps) => any,
  tooltip?: () => any,
  classes?: any,
  style?: any
}

export interface Column extends ColumnDefinition {
  hide?: boolean, // hide by user can be toogled to show
  width: number
  optionCount?: {
    [lane:string] : {
      [option:string] : number // count of options in each lane OR TOTAL
    }
  }
  aggregationsValue?:{
    [lane: string]: { // lane OR TOTAL
      [aggregation:string] : number // aggregation type
    }
  }
}

export interface TableHeadTypes {
    columns: Column[],
    numSelected: any,
    onSelectAll: (arg1: any) => void,
    onSort: (arg1: any, arg2: string) => void
    desc?: boolean,
    orderBy?: string,
    rowCount: number,
}

export interface DateRangeObject {
  start: string,
  end: string
}

export type TotalRow = {
  columns: string[] // column ids,
  compute: () => void
}

export type CellPos = {
  row: number
  col: number
}

export interface TableType {
  domainId?: number
  projectId?: number
  boardId?: number
  laneId?: number
  collapsed?: boolean
  rowsData: any[]
  defaultOrderBy?: string
  desc?: boolean
  editable?: boolean
  creatable?: boolean
  resizable?: boolean
  pinnedRows?: number[]
  showSummary?: boolean
  search?: boolean
  title?: string
  totalRows?: [TotalRow[]],
  columns: Column[]

}
export type Range = {
  fromRowIdx: number
  toRowIdx: number
  fromColIdx: number
  toColIdx: number
  laneId?: string
  domainId?: number
  projectId?: number
  boardId?: number
}

export type TableData = { id: string, columns:Column[], rows: any[], editable: boolean, people: any[], totalCount: number }