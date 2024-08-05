import { Color } from "@components/variable";
import styled from "styled-components";

export const AppInputStyle = styled.div`
  display: flex;
  align-items: center;

  input:disabled {
    color: ${Color.textDisable};;
  }
`;
