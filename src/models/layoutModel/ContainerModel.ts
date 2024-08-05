import { ContentWapperProps } from "./ContentWapperModel";
import { HearderProps } from "./HeaderModel";

export interface ContainerProps extends ContentWapperProps, HearderProps {
  action?: () => void
};
