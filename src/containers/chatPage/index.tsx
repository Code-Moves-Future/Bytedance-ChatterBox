// index.tsx
import React, { useState } from "react"
import { Card, Typography, Col, Row } from 'antd';
import ChatInput from '../../components/chatInput/index';
import { chatWithCoze } from '../../api';
import './index.css';

const bot_id = import.meta.env.VITE_BOT_ID;

const { Paragraph } = Typography;

const blockContent = `Hello!`;

const codeContent = `
Hello! How can I assist you today? 😊
`;

const ChatPage: React.FC = () => {
    // 添加loading状态
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (value: string) => {
        try {
            setIsLoading(true);
            const messages = [
                {
                    role: 'user' as const,
                    content: value
                }
            ];

            const response = await chatWithCoze(messages, bot_id);
            // TODO: 结果渲染页面
            console.log('API响应:', response);
        } catch (error) {
            console.error('发送消息失败:', error);
        } finally {
            setIsLoading(false);
        }
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
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatPage;