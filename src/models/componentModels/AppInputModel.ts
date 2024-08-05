import { CommomInputProps } from "@models/commonModel/CommonModel";
import { InputProps } from "antd";
import { InputHTMLAttributes } from "react";

export type ValueType = InputHTMLAttributes<HTMLInputElement>["value"] | bigint;

export interface AppInputProps extends InputProps, CommomInputProps {
  onChangeInput?: (value: string) => void
  optionValueInput?: OptionValueInput
  onBlurForm?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
};

export interface RefInput {
  valueInput?: { input: { value: string } }
}

export interface OptionValueInput {
  trim?: boolean
  trimStart?: boolean
  trimEnd?: boolean
  upperCase?: boolean
  noSpecialCharacters?: boolean
  formatMoney?: boolean
  regExp?: RegExp
}
