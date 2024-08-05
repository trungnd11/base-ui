
import { useEffect } from "react";
import { Button, Form, Input, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { LoginProps } from "@models/authorModel/LoginModel";
import { setTitle } from "@helper/functionCommon";
import { LoginContainerStyle } from "./loginStyle";

const { Title } = Typography;

export default function Login(props: LoginProps) {
  const { actionLogin, title, titleLogin, logo, isLoadingBtn } = props;

  const onFinish = (dataForm: any) => {
    actionLogin && actionLogin(dataForm);
  };

  useEffect(() => {
    setTitle(title ?? "Base Component - Login");
  }, []);

  return (
    <LoginContainerStyle>
      <div className="form-container">
        <div className="bg-image">
          <img src={logo} alt="login-background" />
        </div>
        <div className="form">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            labelAlign="left"
            colon={false}
          >
            <Title className="title" level={4}>{ titleLogin ?? "Trang quản trị ví điện tử" }</Title>
            <Form.Item
              label=""
              name="username"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Tên đăng nhập không để trống!" }]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Mật khẩu không để trống!" }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <div className="button">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingBtn}
                icon={<LoginOutlined />}
              >
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </LoginContainerStyle>
  );
}
