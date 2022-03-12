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
import { NavLink, Link } from "react-router-dom";

import { Manager } from "./manager";
import { MyPlugins } from "./my-plugins";
import { UpLoad } from "./upload";
import { TestPage } from "./testpage/testpage";
import { Bulbs } from "./test/test";

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
              <SubMenu key="sub1" icon={<UserOutlined />} title="烧脑">
                <Menu.Item key="3">
                  <NavLink to="/server/bulb">猪猪</NavLink>
                </Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Test">
                <Menu.Item key="6">
                  <NavLink to="/server/testpage/true">
                    seitch true component
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/server/testpage/false">
                    seitch false component
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                <Link to="/server/manager">Manager</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>prototype</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  <Route path="/server/my" component={MyPlugins}></Route>
                  <Route path="/server/upload" component={UpLoad}></Route>
                  <Route path="/server/manager" component={Manager}></Route>
                  <Route path="/server/bulb" component={Bulbs}></Route>
                  <Route
                    path="/server/testpage/:show"
                    component={TestPage}
                  ></Route>
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
