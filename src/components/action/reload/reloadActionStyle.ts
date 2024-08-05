import { Color } from "@components/variable";
import { styled } from "styled-components";

interface ReloadActionStyleProps {
  disabled?: boolean
}

export const ReloadActionStyle = styled.div<ReloadActionStyleProps>`
  cursor: pointer;
  color: ${Color.blueText};

  &:hover {
    svg {
      color: ${props => !props.disabled && `${Color.green}`};
      transform: ${props => !props.disabled && `scale(1.8)`};
      transition: ${props => !props.disabled && `all .6s`};;
    }
  }
`;
