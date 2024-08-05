import { AppLoadingCycleWrapperProps } from "@models/componentModels/AppLoadingModel";
import { Spin } from "antd";
import { AppLoadingCycleWrapper } from "./apploadingCycleStyle";

export default function AppLoadingCycle({ position, spinProps, ...props }: AppLoadingCycleWrapperProps) {
  return (
    <AppLoadingCycleWrapper position={position} {...props}>
      <Spin size="large" {...spinProps} />
    </AppLoadingCycleWrapper>
  );
}
