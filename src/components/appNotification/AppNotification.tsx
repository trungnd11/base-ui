import { NotificationProps } from "@models/componentModels/AppNotificationModel";
import { notification } from "antd";

export const AppNotification = (props: NotificationProps) => {
  const { title, description, type, config, ...rest } = props;

  config && notification.config({ ...config });

  notification.open({
    message: title,
    description,
    type: type ?? "success",
    ...rest,
  });
};
