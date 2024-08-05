import { CommomInputProps } from "@models/commonModel/CommonModel";
import { DatePickerProps } from "antd";

export interface AppDatePickerProps extends Omit<DatePickerProps, "ref">, CommomInputProps {
  title?: string
  required?: boolean
  onKeyPress?: (value?: any) => void
  validateText?: string
  isShowToDay?: boolean
  onBlurForm?: () => void
};

export interface BaseInfo {
  range?: "start" | "end"
}

export type PickerFocusEventHandler = (e: React.FocusEvent<HTMLElement>, info: BaseInfo) => void;
