import { AppButtonLinkProps } from "@models/componentModels/AppButtonLinkModel";
import { AppButtonLinkStyle } from "./appButtonLinkStyle";

export default function AppButtonLink(props: AppButtonLinkProps) {
  const { value, onClick } = props;
  return (
    <AppButtonLinkStyle onClick={onClick}>
      { value }
    </AppButtonLinkStyle>
  );
}
