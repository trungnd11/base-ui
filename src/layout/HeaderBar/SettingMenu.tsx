import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@store/hook";
import { logout } from "@store/auth/auth";
import { getUsername } from "@helper/jwt";
import { Color } from "@components/variable";
import { AppConfirm } from "@components/appNotification/AppComfirm";
import { Key } from "@enum/commonEnum";
import { SettingMenuProps } from "@models/layoutModel/HeaderModel";

const { Text } = Typography;

const items: MenuProps["items"] = [
  // {
  //   label: (
  //     <Space>
  //       <InfoCircleOutlined />
  //       <Text>Infomation Account</Text>
  //     </Space>
  //   ),
  //   key: Key.ONE
  // },
  // {
  //   label: (
  //     <Space>
  //       <SafetyOutlined />
  //       <Text>Change password</Text>
  //     </Space>
  //   ),
  //   key: Key.TWO
  // },
  // {
  //   type: "divider"
  // },
  {
    label: (
      <Space>
        <LogoutOutlined style={{ color: Color.red }} />
        <Text type="danger">Đăng xuất</Text>
      </Space>
    ),
    key: Key.THREE
  }
];

export default function SettingMenu({ actionLogout }: SettingMenuProps) {
  const dispatch = useAppDispatch();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    key === Key.THREE &&
      AppConfirm({
        content: "Bạn có muốn đăng xuất?",
        handleOk: async () => {
          actionLogout && await actionLogout();
          dispatch(logout());
        }
      });
  };

  return (
    <Space>
      <Text className="text-user">{getUsername() || ""}</Text>
      <Dropdown menu={{ items, onClick }} trigger={["click"]} arrow>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar icon={<UserOutlined />} className="user-avatar" />
        </a>
      </Dropdown>
    </Space>
  );
};
