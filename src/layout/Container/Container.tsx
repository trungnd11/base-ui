import React, { useEffect } from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { ContainerStyle } from "./containerStyle";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { SiderBarStore, toggleSiderBar } from "@store/sider/sider";
import SiderBar from "../SiderBar/SiderBar";
import ContentWapper from "../ContentWapper/ContentWapper";
import { ContainerProps } from "@models/layoutModel/ContainerModel";
import HeaderBar from "@layout/HeaderBar/HeaderBar";

export default function Container({ action, routers, basename }: ContainerProps) {
  const { collapsed } = useAppSelector(SiderBarStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sider = document.getElementById("sider");
    const content = document.getElementById("content");
    const desContent = document.getElementById("description-content-id");
    const footer = document.getElementById("footer");
    if (sider && content && footer && desContent) {
      new ResizeObserver((_entries) => {
        content.style.marginLeft = `${sider.offsetWidth}px`;
        footer.style.marginLeft = `${sider.offsetWidth}px`;
      }).observe(sider);
    }
  }, [collapsed]);

  useEffect(() => {
    action && action();
  }, []);

  return (
    <ContainerStyle triggerSiderbar={collapsed}>
      <Layout hasSider>
        <Header className="header">
          <HeaderBar />
        </Header>
        <Sider trigger={null} collapsible collapsed={collapsed} id="sider" width={250}>
          <SiderBar />
          {React.createElement(collapsed ? RightOutlined : LeftOutlined, {
            className: "trigger",
            id: "trigger",
            onClick: () => dispatch(toggleSiderBar()),
          })}
        </Sider>
        <Layout className="site-layout" style={{ minHeight: "100vh" }}>
          <Content style={{ overflow: "initial" }} id="content">
            <div className="site-layout-background">
              <div className="description-content" id="description-content-id">
                <ContentWapper routers={routers} basename={basename} />
              </div>
            </div>
          </Content>
          <Footer id="footer">©2023 <b>Trungg</b></Footer>
        </Layout>
      </Layout>
    </ContainerStyle>
  );
}
