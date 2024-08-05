import { Card } from "antd";
import { AppCardProps } from "@models/componentModels/AppCardModel";
import { AppCardStyle } from "./appCardStyle";

export default function AppCard(props: AppCardProps) {
  const { contents, size, extra, ...rest } = props;
  return (
    <AppCardStyle>
      <Card
        {...rest}
        bordered
        size={size ?? "small"}
        extra={extra}
      >
        { contents }
      </Card>
    </AppCardStyle>
  );
}
