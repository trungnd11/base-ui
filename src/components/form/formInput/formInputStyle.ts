import { styled } from "styled-components";
import { Color, Devices, FontSize, Position } from "../../variable";

interface PropsFormInputStyle {
  titleWidth?: number
};

export const TitleFormInput = styled.span`
  white-space: pre-wrap;
`;

interface PropsRequiredComponent {
  position?: string
};

export const RequiredComponent = styled.span<PropsRequiredComponent>`
  position: ${props => props.position ? props.position : Position.ABSOLUTE};
  &::after {
    content: "*";
    color: ${Color.red};
    font-size: ${FontSize.F13};

    @media ${Devices.xxl} {
      font-size: ${FontSize.F16};
    }
  }
`;

export const FormInputStyle = styled.div<PropsFormInputStyle>`
  .ant-form-item {
    margin-bottom: 0 !important;
  }

  .ant-form-item.ant-form-item-has-error {
    min-height: 54px;

    @media ${Devices.xl} {
      min-height: 76px;
    }
  }

  .ant-form-item-row {
    @media ${Devices.xl} {
      display: block;
    }

    .ant-form-item-label, .ant-form-item-control { 
      @media ${Devices.xl} {
        max-width: 100%;
      }

      label {
        line-height: 1rem !important;
        @media ${Devices.xl} {
          height: inherit;
        }
      }
    }

    .ant-form-item-label {
      flex-basis: ${props => props.titleWidth ? `${props.titleWidth}px` : "120px"};
      white-space: pre-wrap;
      text-align: start;
      line-height: 1.3;
    }
  }
  
  .ant-form-item-required {
    &::before {
      position: absolute;
      margin-inline-end: inherit !important;
      right: 0px;
      padding-left: 4px;
      display: none !important;
    }
  }

  .ant-form-item-has-error {
    height: max-content;
  }
`;
