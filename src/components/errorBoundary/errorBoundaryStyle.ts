import { BorderRadius, Color, FontSize, Padding } from "@components/variable";
import styled from "styled-components";

export const ErrorBoundaryWapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error-content {
    text-align: center;
    margin: auto;
    max-width: 50%;
    padding: ${Padding.P16};
    border: 1px solid ${Color.red};
    border-radius: ${BorderRadius.border6};
    background-color: ${Color.black};
    color: ${Color.white};

    .error-title {
      font-size: ${FontSize.F25};
      color: ${Color.red};
      font-weight: 600;
      margin-bottom: 1rem;
    }
  }
`;
