import { HearderProps } from "@models/layoutModel/HeaderModel";
import SettingMenu from "./SettingMenu";
import { HeaderStyle } from "./hearderStyle";

export default function HeaderBar({ actionLogout }: HearderProps) {
  return (
    <HeaderStyle>
      <div className="logo">
        <span>BASE UI</span>
      </div>
      <div className="infomation">
        <SettingMenu actionLogout={actionLogout} />
      </div>
    </HeaderStyle>
  );
};
