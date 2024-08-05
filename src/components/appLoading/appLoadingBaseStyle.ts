import { Color } from "@components/variable";
import { AppLoadingCustomWrapperProps } from "@models/componentModels/AppLoadingModel";
import { css } from "styled-components";

export const baseAppLoadingStyle = css<AppLoadingCustomWrapperProps>`
  position: ${(props) => props.position && props.position};
  height: ${(props) => (props.position ? "100%" : "100vh")};
  width: ${(props) => props.position && "100%"};
  background-color: ${Color.darkTransparent};
`;
