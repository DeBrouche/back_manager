import "./index.css";
import "antd/dist/antd.min.css";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";

import { Manager } from "./manager";
import { MyPlugins } from "./my-plugins";
import { UpLoad } from "./upload";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class BackManage extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div className="manage-wrapper">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <NavLink to="/server/my">我的</NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <NavLink to="/server/upload">上传</NavLink>
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                <NavLink to="/server/manager">Plugins</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  <Route path="/server/my" component={MyPlugins}></Route>
                  <Route path="/server/upload" component={UpLoad}></Route>
                  <Route path="/server/manager" component={Manager}></Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>后台管理</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export { BackManage };
