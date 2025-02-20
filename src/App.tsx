import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
import './App.css';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const App: React.FC = () => {
  const Navigate = useNavigate();
  const [items, setItems] = useState<Array<{ key: string, icon: React.ReactNode, label: string }>>([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  {/** 加载侧边栏信息  */ }
  const loadSider = () => {
    const newItems = [];
    for (let i = 0; i < 30; i++) {
      const item = {
        key: String(i + 1),
        icon: React.createElement(MessageOutlined),
        label: `nav ${i + 1}`,
      };
      newItems.push(item);
    }
    setItems(newItems);
  };

  {/** 开启新对话  */ }
  const createNewChat = () => {
    Navigate('/');
    window.location.reload();
  }

  useEffect(() => {
    loadSider();
  }, [])


  return (
    <>
      <Layout>
        {/** 侧边栏 */}
        <Sider style={siderStyle} theme="light" width={270} trigger={null} collapsible collapsed={collapsed}>
          <div style={{ paddingTop: 20, paddingBottom: 20 }}>
            {collapsed ? (
              <>
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={() => createNewChat()} icon={<PlusOutlined />} />
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: 5 }}>
                  <Button onClick={() => createNewChat()} type="text" size='large' icon={<PlusOutlined />}>New chat</Button>
                </div>
              </>
            )}
          </div>
          <Menu
            theme="light"
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          {/** 顶部栏 */}
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          {/** 内容 */}
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
