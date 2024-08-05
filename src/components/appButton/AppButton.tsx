import { Button, Tooltip } from "antd";
import { AppButtonStyle } from "./appButtonStyle";
import { AppButtonProps } from "@models/componentModels/AppButtonModel";
import { TypeIconButton } from "./handleDateAppButton";

export default function AppButton(props: AppButtonProps) {
  const {
    name,
    loading,
    type,
    ghost,
    htmlType,
    onClick,
    disabled,
    title,
    typeIcon,
    icon,
    ...rest
  } = props;
  const TypeIcon = typeIcon && TypeIconButton[typeIcon];

  const ButtonChildren = (
    <Button
      {...rest}
      ghost={ghost ?? false}
      htmlType={htmlType ?? "button"}
      type={type ?? "primary"}
      icon={typeIcon ? <TypeIcon /> : icon}
      loading={loading}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </Button>
  );

  return (
    <AppButtonStyle>
      {
        title
          ? (
          <Tooltip placement="top" title={title}>
            { ButtonChildren }
          </Tooltip>
            )
          : (
              ButtonChildren
            )
      }
    </AppButtonStyle>
  );
}
