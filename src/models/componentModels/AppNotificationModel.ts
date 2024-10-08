import { IconType, NotificationConfig } from "antd/es/notification/interface";

// interface BaseMethods {
//   open?: (config: ArgsProps) => void
//   destroy?: (key?: React.Key) => void
//   config?: (config: GlobalConfigProps) => void
//   useNotification: typeof useNotification
//   /** @private Internal Component. Do not use in your production. */
//   _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel
// }
// type StaticFn = (config: ArgsProps) => void;
// interface NoticeMethods {
//   success?: StaticFn
//   info?: StaticFn
//   warning?: StaticFn
//   error?: StaticFn
// }

export interface NotificationProps {
  title?: string
  description: React.ReactNode
  type?: IconType
  config?: NotificationConfig
};
