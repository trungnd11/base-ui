import { Color } from "@components/variable";
import { styled } from "styled-components";

export const AppSelectStyle = styled.div`
  display: flex;

  .required {
    span::after {
      content: "*";
      color: red;
      margin-left: 4px;
    }
  }

  .ant-select-disabled > .ant-select-selector > .ant-select-selection-item {
    color: ${Color.textDisable};
  }
`;
