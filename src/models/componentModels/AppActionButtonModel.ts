import { ButtonProps } from "antd";
import { ReactNode } from "react";

// type ActionButtonType = "update" | "delete";

export interface RenderActionType {
  type: string
  icon: ReactNode
  disabled?: boolean
  title?: string
  propsButton?: ButtonProps
}

export interface TitleActionButtonType {
  update?: string
  delete?: string
}

export interface PropsButtonsType {
  update?: ButtonProps
  delete?: ButtonProps
}

export interface AppActionButtonProps {
  handleClick: (type: string) => void
  title?: TitleActionButtonType
  disabled?: boolean
  renderAction?: RenderActionType[]
  hideBtnEdit?: boolean
  hideBtnDelete?: boolean
  propsButton?: PropsButtonsType
};
