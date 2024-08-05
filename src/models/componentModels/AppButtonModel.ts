import { ButtonProps } from "antd";

export type IconButtonType =
  "search" |
  "excel" |
  "create" |
  "update" |
  "delete" |
  "file" |
  "close" |
  "check" |
  "pause" |
  "stop" |
  "detail" |
  "continue" |
  "edit" |
  "send" |
  "assign";
export interface AppButtonProps extends ButtonProps {
  name?: string
  typeIcon?: IconButtonType
  title?: string
};
