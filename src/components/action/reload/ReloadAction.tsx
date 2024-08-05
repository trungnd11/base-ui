import { Button, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { ReloadAcitonProps } from "@models/componentModels/ReloadActionModel";
import { NotPermissionMessageEnum } from "@enum/RoleEnum";
import usePrivileges from "@components/hook/usePrivileges";
import { ReloadActionStyle } from "./reloadActionStyle";

export default function ReloadAction(props: ReloadAcitonProps) {
  const { onClick, title, positionTitle } = props;
  const { update } = usePrivileges();

  const getTitleAction = () =>
    !update ? NotPermissionMessageEnum.UPDATE : title;

  return (
    <Tooltip title={getTitleAction()} placement={positionTitle ?? "right"}>
      <ReloadActionStyle onClick={onClick} disabled={!update}>
        <Button
          type="link"
          disabled={!update}
          icon={<ReloadOutlined />}
        />
      </ReloadActionStyle>
    </Tooltip>
  );
}
