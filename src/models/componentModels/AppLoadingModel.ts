import { SpinType } from "antd/es/spin";
import { ReactNode } from "react";

interface AppLoadingProps {
  position?: "absolute"
  style?: React.CSSProperties | undefined
}

export interface AppLoadingCarWapperProps extends AppLoadingProps {
}

export interface AppLoadingCycleWrapperProps extends AppLoadingProps {
  spinProps?: SpinType
}

export interface AppLoadingCustomWrapperProps extends AppLoadingProps {
  children?: ReactNode
}
