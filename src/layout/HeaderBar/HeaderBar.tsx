import { HearderProps } from "@models/layoutModel/HeaderModel";
import logo from "../../static/images/logo/VETC.png";
import SettingMenu from "./SettingMenu";
import { HeaderStyle } from "./hearderStyle";

export default function HeaderBar({ actionLogout }: HearderProps) {
  return (
    <HeaderStyle>
      <div className="logo">
        <img src={logo} alt="VETC" />
      </div>
      <div className="infomation">
        <SettingMenu actionLogout={actionLogout} />
      </div>
    </HeaderStyle>
  );
};
