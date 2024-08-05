import { AppLoadingCustomWrapperProps } from "@models/componentModels/AppLoadingModel";
import styled from "styled-components";
import { baseAppLoadingStyle } from "../appLoadingBaseStyle";

export const AppCustomLoadingWrapper = styled.div<AppLoadingCustomWrapperProps>`
  ${baseAppLoadingStyle};
`;
