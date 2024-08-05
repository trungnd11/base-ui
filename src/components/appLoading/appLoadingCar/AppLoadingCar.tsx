import { AppLoadingCarWapperProps } from "@models/componentModels/AppLoadingModel";
import { AppLoadingCarWapper } from "./appLoadingStyle";

export default function AppLoadingCar({ position, ...props }: AppLoadingCarWapperProps) {
  return (
    <AppLoadingCarWapper position={position} {...props}>
      <span className="loader"></span>
    </AppLoadingCarWapper>
  );
}
