import { AxiosResponse } from 'axios';
import cozeApi from './instance';
import type { CozeRequestBody, CozeResponse } from './type';
import { handleApiError } from '../utils/error';

/**
 * Coze 聊天请求函数
 * @param messages - 聊天消息数组
 * @param botId - 机器人ID
 * @param options - 可选参数
 * @returns Promise<CozeResponse>
 * @throws {ApiError}
 */
export const chatWithCoze = async (
    messages: CozeRequestBody['messages'],
    botId: string,
    options: Partial<Omit<CozeRequestBody, 'messages' | 'bot_id'>> = {}
): Promise<CozeResponse> => {
    try {
        const response: AxiosResponse<CozeResponse> = await cozeApi.post('/chat', {
            bot_id: botId,
            query: messages[messages.length - 1].content,  // 使用最后一条消息作为查询
            user: "user_1",  // 添加用户标识
            stream: false,
            ...options
        });
        return response.data;
    } catch (error) {
        const apiError = handleApiError(error);
        console.error('Coze API 请求失败:', apiError);
        throw apiError;
    }
};

// 导出类型和实例
export type { CozeRequestBody, CozeResponse };
export { cozeApi };