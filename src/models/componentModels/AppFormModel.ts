import { ReactNode } from "react";
import { UseFormSetValue } from "react-hook-form";
import { ObjectSchema } from "yup";
import { Gutter } from "antd/es/grid/row";
import { FormLayout } from "antd/es/form/Form";
import { DefaultOptionType } from "antd/es/select";
import { IconButtonType } from "./AppButtonModel";
import { AppInputProps, OptionValueInput } from "./AppInputModel";
import { AppSelectProps } from "./AppSelectModel";
import { AppDatePickerProps } from "./AppDatePickerModel";
import { TypeConfig } from "@models/configDataModel/ConfigDataModel";

export interface RequiredListType {
  field: string
  required: boolean
  errorMessage: string
}

export interface OnChangeType {
  field: string
  value: any
  setValue?: UseFormSetValue<any>
};

export interface LayoutProps {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
};

export type OptionsFormType<T = any> = Array<OptionFormType<T>>;

export interface OptionFormType<T = any> {
  label?: string
  extraLabel?: ReactNode
  field: string
  component: JSX.Element | any
  initValue?: any
  multiple?: boolean
  layout?: LayoutProps
  typeSelectAsync?: keyof T
  viewDateType?: "date" | "month" | "quarter" | "year"
  pickerDate?: "date" | "month" | "quarter" | "year"
  optionSelect?: DefaultOptionType[]
  typeComponent?: "input" | "select" | "date"
  required?: boolean
  allowClearSelect?: boolean
  checkValue?: (value: any, option?: Record<string, any>) => boolean
  addAll?: boolean
  type?: string
  maxLength?: number
  options?: any
  dependentField?: string[]
  mode?: string
  disabled?: boolean
  placeholder?: string
  filterOptions?: any
  combineField?: string[]
  hidden?: boolean
  invisible?: boolean
  optionValueInput?: OptionValueInput
  notFoundContent?: ReactNode
  onSearchAsync?: (value: string) => Promise<string>
  propsAppInput?: AppInputPropsForm
  propsAppSelect?: AppSelectPropsForm<T>
  propsAppDatePicker?: AppDatePickkerForm
};

interface RenderWrapperProps {
  children: ReactNode
}

export interface GroupOptionsType {
  fields: string[]
  renderField?: string
  renderWapper: React.FC<RenderWrapperProps>
  layout?: LayoutProps
}

export interface AppFormProps<T = any, K extends TypeConfig = any> {
  titleSearch?: React.ReactNode | string
  titleResult?: React.ReactNode | string
  options: OptionsFormType<K>
  initValueForm?: Record<string, any>
  gutter?: Gutter | [Gutter, Gutter]
  children?: JSX.Element
  layoutCommon?: LayoutProps
  isShowBtnExport?: boolean
  isShowBtnPayBatch?: boolean
  layoutWrapperButton?: LayoutProps
  loadingBtnSearch?: boolean
  loadingBtnExport?: boolean
  disableBtnExport?: boolean
  disableBtnPayBatch?: boolean
  messageDisableExport?: string
  formItem?: boolean
  schema?: ObjectSchema<any, any>
  labelBtnSubmit?: string
  typeIconBtnSubmit?: IconButtonType
  onSearch?: (form?: T) => void
  onExport?: () => void
  onChange?: (form: OnChangeType) => void
  onHandleSubmit?: ((data: any) => void) | ((value: any) => Promise<void>)
  onPayBatch?: () => void
  resetField?: boolean
  isShowBtnCreate?: boolean
  labelBtnCreate?: string
  onCreate?: () => void
  disableBtnCreate?: boolean
  noBorder?: boolean
  isShowBtnClose?: boolean
  onClose?: () => void
  isShowSubmit?: boolean
  ref?: any
  isCreatePolicy?: boolean
  isDisableSubmit?: boolean
  values?: any
  layout?: FormLayout | undefined
  isShowBtnSearch?: boolean
  buttonAlight?: "center" | "end" | "start" | undefined
  renderButton?: () => ReactNode
  groupOptions?: GroupOptionsType[]
  onSearchAsync?: (form: OnChangeType) => void
};

export interface IFormRef {
  setValue: Function
  formState?: any
  reset: Function
  handleReset?: () => void
  trigger?: () => void
}

export interface AppInputPropsForm extends AppInputProps {
}

export interface AppSelectPropsForm<T> extends AppSelectProps<T> {
}

export interface AppDatePickkerForm extends AppDatePickerProps {

}
