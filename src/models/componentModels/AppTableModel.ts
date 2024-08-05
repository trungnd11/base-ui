import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { AppInputProps } from "./AppInputModel";
import { AppSelectProps } from "./AppSelectModel";
import { AppDatePickerProps } from "./AppDatePickerModel";
import { FormItemProps } from "antd/es/form";
import { TypeFormatDate } from "@utils/dateUtil";

export interface ColumnsExtends<T> extends ColumnsType<T> {
  isSort?: boolean
}

export interface ColumnEditTable<T = any> extends ColumnType<T> {
  isSort?: boolean
  editable?: EditTableProps
  dataIndex: string
}

export type ColumnsEditTable<T = any> = Array<ColumnEditTable<T>>;

export interface PageOptionType {
  size: number
  current?: number
  total?: number
}
export interface PageOptionModel {
  page?: number
  size?: number
}
export interface AppTableProps<T> extends TableProps<T> {
  rowTypeSelection?: "checkbox" | "radio"
  columns: ColumnsExtends<T>
  pageOption?: PageOptionType
  hidePage?: boolean
  ref?: any
  defaultPagination?: boolean
  onChangeFilter?: (filter: Record<string, FilterValue | null>) => void
  onPage?: (pageOption: PageOptionModel) => void
  onClickRow?: (record: T, index?: number) => void
};

interface PropsAppInputTable extends AppInputProps {
}

interface PropsAppSelectTable extends AppSelectProps {
}

interface PropsAppDatePickerTable extends AppDatePickerProps {
  typeFormatDate?: TypeFormatDate
}

export interface EditTableProps {
  component: any
  propsAppInput?: PropsAppInputTable
  propsAppSelect?: PropsAppSelectTable
  propsAppDatePicker?: PropsAppDatePickerTable
  propsFormItem?: FormItemProps
}

export interface EditableCellProps<T = any> {
  title: React.ReactNode
  editable: EditTableProps
  children: React.ReactNode | any
  dataIndex: keyof T | any
  record: T
  handleSave: (record: T) => void
  handleError?: (err: unknown) => void
};
