import { AppLoadingCustomWrapperProps } from "@models/componentModels/AppLoadingModel";
import { AppCustomLoadingWrapper } from "./appCustomLoadingStyle";

export default function AppCustomLoading({ children, ...props }: AppLoadingCustomWrapperProps) {
  return (
    <>
      {children && (
        <AppCustomLoadingWrapper {...props}>
          {children}
        </AppCustomLoadingWrapper>
      ) }
    </>
  );
}
