import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import './index.css';
import { useOutletContext } from "react-router-dom";

const { TextArea } = Input;

// 新增上下文类型声明
interface OutletContext {
  addNewMessage: (content: string) => void;
}

interface ChatInputProps {
  onSend: (value: string) => void;
  onUpload?: (file: File) => void;
  placeholder?: string;
  maxLength?: number;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onUpload,
  placeholder = 'Message ChatterBox',
  maxLength = 5000,
}) => {
  const [value, setValue] = useState('');
  const { addNewMessage } = useOutletContext<OutletContext>();

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      // 添加空值检查
      addNewMessage?.(value);  // 使用可选链操作符
      setValue('');
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='input-container'>
      <TextArea
        value={value}
        onChange={(e) => e.target.value.length <= maxLength && setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="borderless"
        placeholder={placeholder}
        autoSize={{ minRows: 1, maxRows: 12 }}
        className='custom-textarea'
        maxLength={maxLength}
      />

      <div className='control-bar'>
        <div className='placeholder' />
        <div className='right-controls'>
          <span className={`char-counter ${value.length >= maxLength ? 'limit' : ''}`}>
            {value.length}/{maxLength}
          </span>
          <div className='button-group'>
            <input
              type="file"
              id="upload"
              hidden
              onChange={handleUpload}
              disabled={!onUpload}
            />
            {onUpload && (
              <label htmlFor="upload" className="icon-button">
                <PaperClipOutlined />
              </label>
            )}
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={handleSend}
              className="send-button"
              disabled={!value.trim()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;