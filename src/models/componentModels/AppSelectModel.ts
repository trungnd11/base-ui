import { SelectProps } from "antd";
import { BaseOptionType } from "antd/es/select";
import { CommomInputProps } from "@models/commonModel/CommonModel";

export interface AppOptionType extends BaseOptionType {
  value: string
  label: string
};

export interface AppSelectProps<T = any> extends SelectProps<T>, CommomInputProps {
  title?: string
  typeSelectAsync?: keyof T
  required?: boolean
  addAll?: boolean
  filterOptions?: any
  combineField?: string[]
  onSearchAsync?: (value: string) => Promise<string>
};

export interface GenerateOptionsProps {
  data: Array<Record<string, any>> | any[]
  fieldValue: string
  fieldLabel: string
  viewCodeLabel?: boolean
}
