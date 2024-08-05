import { AppLoadingCycleWrapperProps } from "@models/componentModels/AppLoadingModel";
import styled from "styled-components";
import { baseAppLoadingStyle } from "../appLoadingBaseStyle";

export const AppLoadingCycleWrapper = styled.div<AppLoadingCycleWrapperProps>`
  ${baseAppLoadingStyle};

  .ant-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
