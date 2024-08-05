import { SwapOutlined } from "@ant-design/icons";
import { lazy } from "react";
const ReloadOutlined = lazy(async () => await import("@ant-design/icons/ReloadOutlined"));
const SettingOutlined = lazy(async () => await import("@ant-design/icons/SettingOutlined"));
const HistoryOutlined = lazy(async () => await import("@ant-design/icons/HistoryOutlined"));
const BankOutlined = lazy(async () => await import("@ant-design/icons/BankOutlined"));
const TeamOutlined = lazy(async () => await import("@ant-design/icons/TeamOutlined"));

const IconConfig: any = {
  ReloadOutlined: <ReloadOutlined />,
  SettingOutlined: <SettingOutlined />,
  SwapOutlined: <SwapOutlined />,
  HistoryOutlined: <HistoryOutlined />,
  BankOutlined: <BankOutlined />,
  TeamOutlined: <TeamOutlined />
};

export default IconConfig;
