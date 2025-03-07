// index.tsx
import React, { useState } from "react"
import { Typography, Col } from 'antd';
import ChatInput from '../../components/chatInput/index';
import { chatWithCoze } from '../../api';
import './index.css';
import MessageBubble from '../../components/messageBuble';

const bot_id = import.meta.env.VITE_BOT_ID;

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
                        {/* 用户消息示例 */}
                        <MessageBubble
                            content={blockContent}
                            align="right"
                        />
                        {/* 机器人消息示例 */}
                        <MessageBubble
                            content={codeContent}
                            align="center"
                            isCode
                        />
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