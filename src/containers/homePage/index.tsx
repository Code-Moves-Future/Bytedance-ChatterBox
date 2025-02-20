import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';
import ChatInput from '../../components/chatInput/index';

const { Title } = Typography;

const HomePage: React.FC = () => {
  const navigate  = useNavigate();

  const handleSend = (value: string) => {
    console.log('发送消息:', value);
    navigate('/chat');
  };

  const handleUpload = (file: File) => {
    console.log('上传文件:', file.name);
  };


  return (
    <div className='chat-page'>
      <Col span={24}>
        <Row justify="center" style={{paddingBottom: 50}}>
          <Title level={1}>What can I help with?</Title>
        </Row>
        <Row justify="center">
          {/** 输入框 */}
          <ChatInput
            onSend={handleSend}
            onUpload={handleUpload}
            placeholder="Message ChatterBox"
          />
        </Row>
      </Col>
    </div>
  );
};

export default HomePage;