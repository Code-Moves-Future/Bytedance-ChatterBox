import React from "react"
import { Card, Typography, Col, Row } from 'antd';
import ChatInput from '../../components/chatInput/index';

const { Paragraph } = Typography;

const blockContent = `Hello!`;

const codeContent = `
Hello! How can I assist you today? 😊
`;

const ChatPage: React.FC = () => {

    // TODO: 待实现
    const handleSend = (value: string) => {
        console.log('发送消息:', value);
    };

    const handleUpload = (file: File) => {
        console.log('上传文件:', file.name);
    };

    return (
        <>
            <Col span={24}>
                <Row justify="end" style={{ paddingBottom: 50, paddingRight: 150 }}>
                    <Card style={{ width: 600, backgroundColor: "WhiteSmoke" }}>
                        <Paragraph>
                            {blockContent}
                        </Paragraph>
                    </Card>
                </Row>
                <Row justify="center" style={{ paddingBottom: 50 }}>
                    <Card style={{ width: 800 }}>
                        <Typography.Text>
                            {codeContent}
                        </Typography.Text>
                    </Card>
                </Row>
            </Col>
            <Col span={24}>
                <Row justify="center">
                    <ChatInput
                        onSend={handleSend}
                        onUpload={handleUpload}
                        placeholder="Message ChatterBox"
                    />
                </Row>
            </Col>
        </>
    )
}

export default ChatPage;