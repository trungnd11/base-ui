import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { showTitleNotRole } from "./AppActionButtonServices";
import usePrivileges from "@components/hook/usePrivileges";
import { AppActionButtonProps } from "@models/componentModels/AppActionButtonModel";
import { PermissionEnum } from "@enum/RoleEnum";
import { checkRole } from "@helper/helper";
import { TypeActionButtonEnum } from "@enum/components/ActionButtonEnum";
import { AppActionButtonStyle } from "./appActionButtonStyle";

export default function AppActionButton(props: AppActionButtonProps) {
  const { handleClick, title, disabled, renderAction, hideBtnEdit, hideBtnDelete } = props;
  const { update, deletes } = usePrivileges();

  const handleClickActionBtn = (type: string) => {
    handleClick(type);
  };

  const ButtonUpdate = (
    <Tooltip title="Cập nhật">
      <Button
        type="link"
        disabled={checkRole(update) || disabled}
        icon={<EditOutlined />}
        onClick={() => handleClickActionBtn(TypeActionButtonEnum.UPDATE)}
      />
    </Tooltip>
  );

  const ButtonDelete = (
    <Tooltip title="Xóa">
      <Button
        danger
        type="link"
        disabled={checkRole(deletes) || disabled}
        icon={<DeleteOutlined />}
        onClick={() => handleClickActionBtn(TypeActionButtonEnum.DELETE)}
      />
    </Tooltip>
  );

  return (
    <AppActionButtonStyle>
      {
        renderAction && renderAction.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Tooltip key={index} title={item.title}>
              <Button
                type="link"
                disabled={item.disabled}
                {...item.propsButton}
                icon={IconComponent}
                onClick={() => handleClickActionBtn(item.type)}
              />
            </Tooltip>
          );
        })
      }
      {
        !hideBtnEdit && (
          checkRole(update) || title?.update
            ? (
              <Tooltip placement="top" title={checkRole(update)
                ? showTitleNotRole(PermissionEnum.UPDATE)
                : title?.update}>
                {ButtonUpdate}
              </Tooltip>
              )
            : ButtonUpdate
        )
      }
      {
        !hideBtnDelete && (
          checkRole(deletes) || title?.delete
            ? (
              <Tooltip placement="top" title={checkRole(deletes)
                ? showTitleNotRole(PermissionEnum.DELETE)
                : title?.delete}>
                {ButtonDelete}
              </Tooltip>
              )
            : ButtonDelete
        )
      }
    </AppActionButtonStyle>
  );
}
