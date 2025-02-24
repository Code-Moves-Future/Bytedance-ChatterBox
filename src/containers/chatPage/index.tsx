// index.tsx
import React from "react"
import { Card, Typography, Col, Row } from 'antd';
import ChatInput from '../../components/chatInput/index';
import './index.css';

const { Paragraph } = Typography;

const blockContent = `Hello!`;

const codeContent = `
Hello! How can I assist you today? 😊
`;

const ChatPage: React.FC = () => {
    const handleSend = (value: string) => {
        console.log('发送消息:', value);
    };

    const handleUpload = (file: File) => {
        console.log('上传文件:', file.name);
    };

    return (
        <div className="chat-page">
            <div className="chat-content">
                <div className="messages-container">
                    <Col span={24}>
                        {/* 原有消息结构保持不变 */}
                        <Row justify="end" style={{ paddingBottom: 50 }}>
                            <Card style={{ width: 600, backgroundColor: "WhiteSmoke" }}>
                                <Paragraph>{blockContent}</Paragraph>
                            </Card>
                        </Row>
                        <Row justify="center" style={{ paddingBottom: 50 }}>
                            <Card style={{ width: 800 }}>
                                <Typography.Text>{codeContent}</Typography.Text>
                            </Card>
                        </Row>
                    </Col>
                </div>
            </div>
            {/* 固定在底部的输入框 */}
            <div className="message-input-wrapper">
                <div className="message-input-container">
                    <ChatInput
                        onSend={handleSend}
                        onUpload={handleUpload}
                        placeholder="Message ChatterBox"
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatPage;