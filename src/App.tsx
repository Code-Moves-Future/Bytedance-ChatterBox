import React, { useState } from 'react';
import { Button, Layout, Menu, theme} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
import './App.css';
import { useNavigate, Outlet } from 'react-router-dom';

// 时间格式化工具函数
const formatTimestamp = (date: Date) => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

  if (isToday) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }
  if (isYesterday) {
    return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 修改状态类型增加时间字段
  const [chatHistory, setChatHistory] = useState<Array<{
    key: string;
    label: string;
    timestamp: Date;  // 新增时间戳
  }>>([]);

  // 新增消息处理方法
  const addNewMessage = (content: string) => {
    setChatHistory(prev => [
      ...prev,
      {
        key: Date.now().toString(),
        label: content.substring(0, 12) || '新对话', // 取前12个字符作为标题
        timestamp: new Date(),
      }
    ]);
  };

  // 修改后的新建对话方法
  const createNewChat = () => {
    setCollapsed(false);
    Navigate('/');
  };

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
              items={chatHistory.map(item => ({
                key: item.key,
                icon: <MessageOutlined />,
                label: (
                    <div className="menu-item">
                      <span>{item.label}</span>
                      <div className="timestamp">
                        {formatTimestamp(item.timestamp)}
                      </div>
                    </div>
                )
              }))}
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
            <Outlet context={{ addNewMessage }} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
