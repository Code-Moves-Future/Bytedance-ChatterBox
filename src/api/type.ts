// Coze API 请求接口类型定义
export interface CozeRequestBody {
    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
    bot_id: string;
    stream?: boolean;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    max_tokens?: number;
}

export interface CozeResponse {
    id: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
} 