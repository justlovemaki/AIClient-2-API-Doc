# 添加新的 LLM 步骤

假设你要添加一个新的名为 `AwesomeLLM` 的支持。

### 步骤 1: 创建新 LLM 的核心实现

在 `src/` 目录下创建一个新的文件夹，例如 `src/awesome_llm/`，并在其中创建 `awesome_llm-core.js` 和 `awesome_llm-strategy.js`。

#### `src/awesome_llm/awesome_llm-core.js`

这个文件将包含与 `AwesomeLLM` 实际 API 交互的逻辑。你需要实现 `generateContent` 和 `listModels` 方法，并且可能需要处理认证、请求重试等。

```javascript
// src/awesome_llm/awesome_llm-core.js
import axios from 'axios';

export class AwesomeLLMApiService {
    constructor(config) {
        // 初始化配置，例如 API Key 和基础 URL
        this.config = config;
        this.apiKey = config.AWESOME_LLM_API_KEY;
        this.baseUrl = config.AWESOME_LLM_BASE_URL;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
    }

    async generateContent(model, requestBody) {
        // 实现与 AwesomeLLM API 的内容生成交互
        // 返回 AwesomeLLM 原生格式的响应
        const response = await this.axiosInstance.post(`/v1/models/${model}/generate`, requestBody);
        return response.data;
    }

    async *generateContentStream(model, requestBody) {
        // 如果 AwesomeLLM 支持流式生成，实现流式逻辑
        // 否则，可以简单调用 generateContent 并模拟流式响应
        const response = await this.generateContent(model, requestBody);
        yield response; // 简单示例，实际流式处理会更复杂
    }

    async listModels() {
        // 实现获取 AwesomeLLM 可用模型列表的逻辑
        // 返回 AwesomeLLM 原生格式的模型列表
        const response = await this.axiosInstance.get('/v1/models');
        return response.data;
    }
}
```

#### `src/awesome_llm/awesome_llm-strategy.js`

这个文件将实现 `ProviderStrategy` 接口，处理 `AwesomeLLM` 特有的逻辑。

```javascript
// src/awesome_llm/awesome_llm-strategy.js
import { ProviderStrategy } from '../provider-strategy.js';
import { extractSystemPromptFromRequestBody, MODEL_PROTOCOL_PREFIX } from '../common.js';

class AwesomeLLMStrategy extends ProviderStrategy {
    extractModelAndStreamInfo(req, requestBody) {
        // 从请求中提取模型名称和是否流式请求
        const model = requestBody.model;
        const isStream = requestBody.stream === true;
        return { model, isStream };
    }

    extractResponseText(response) {
        // 从 AwesomeLLM 原生响应中提取文本内容
        return response.generated_text || '';
    }

    extractPromptText(requestBody) {
        // 从 AwesomeLLM 请求体中提取提示词
        return requestBody.prompt || '';
    }

    async applySystemPromptFromFile(config, requestBody) {
        // 根据配置，将系统提示词应用到 AwesomeLLM 请求体
        // 例如：requestBody.system_prompt = newSystemText;
        return requestBody;
    }

    async manageSystemPrompt(requestBody) {
        // 管理系统提示词，例如写入文件
        const incomingSystemText = extractSystemPromptFromRequestBody(requestBody, MODEL_PROTOCOL_PREFIX.AWESOME_LLM);
        await this._updateSystemPromptFile(incomingSystemText, MODEL_PROTOCOL_PREFIX.AWESOME_LLM);
    }
}

export { AwesomeLLMStrategy };
```

### 步骤 2: 更新 `src/common.js`

在 `src/common.js` 中添加新的 `MODEL_PROVIDER` 和 `MODEL_PROTOCOL_PREFIX`。

```javascript
// src/common.js
export const MODEL_PROTOCOL_PREFIX = {
    // ... 现有内容
    AWESOME_LLM: 'awesome_llm', // 新增
}

export const MODEL_PROVIDER = {
    // ... 现有内容
    AWESOME_LLM_CUSTOM: 'awesome_llm-custom', // 新增
}
```

### 步骤 3: 更新 `src/adapter.js`

在 `src/adapter.js` 中创建 `AwesomeLLMApiServiceAdapter`，并将其添加到 `getServiceAdapter` 工厂函数中。

```javascript
// src/adapter.js
import { AwesomeLLMApiService } from './awesome_llm/awesome_llm-core.js'; // 导入 AwesomeLLM Service

// AwesomeLLM API 服务适配器
export class AwesomeLLMApiServiceAdapter extends ApiServiceAdapter {
    constructor(config) {
        super();
        this.awesomeLLMApiService = new AwesomeLLMApiService(config);
    }

    async generateContent(model, requestBody) {
        return this.awesomeLLMApiService.generateContent(model, requestBody);
    }

    async *generateContentStream(model, requestBody) {
        yield* this.awesomeLLMApiService.generateContentStream(model, requestBody);
    }

    async listModels() {
        return this.awesomeLLMApiService.listModels();
    }
}

// ... (getServiceAdapter 函数)
export function getServiceAdapter(config) {
    const provider = config.MODEL_PROVIDER;
    if (!serviceInstances[provider]) {
        switch (provider) {
            // ... 现有内容
            case MODEL_PROVIDER.AWESOME_LLM_CUSTOM: // 新增
                serviceInstances[provider] = new AwesomeLLMApiServiceAdapter(config);
                break;
            default:
                throw new Error(`Unsupported model provider: ${provider}`);
        }
    }
    return serviceInstances[provider];
}
```

### 步骤 4: 更新 `src/provider-strategies.js`

在 `src/provider-strategies.js` 中导入新的策略，并添加到工厂中。

```javascript
// src/provider-strategies.js
import { AwesomeLLMStrategy } from './awesome_llm/awesome_llm-strategy.js'; // 导入新策略

class ProviderStrategyFactory {
    static getStrategy(providerProtocol) {
        switch (providerProtocol) {
            // ... 现有内容
            case MODEL_PROTOCOL_PREFIX.AWESOME_LLM: // 新增
                return new AwesomeLLMStrategy();
            default:
                throw new Error(`Unsupported provider protocol: ${providerProtocol}`);
        }
    }
}
```

### 步骤 5: 更新 `src/convert.js` (可选但推荐)

如果 `AwesomeLLM` 的 API 格式与 OpenAI、Gemini 或 Claude 差异较大，或者你希望支持与其他 LLM 之间的请求/响应转换，你需要在 `src/convert.js` 中添加相应的转换函数。

例如，如果你想将 OpenAI 请求转换为 `AwesomeLLM` 请求：

```javascript
// src/convert.js
// ... (现有内容)

export function toAwesomeLLMRequestFromOpenAI(openaiRequest) {
    // 转换逻辑
    const awesomeLLMRequest = {
        prompt: openaiRequest.messages.map(m => m.content).join('\n'),
        // ... 其他参数
    };
    return awesomeLLMRequest;
}

// ... (convertData 函数中添加新的转换映射)
const conversionMap = {
    request: {
        // ... 现有内容
        [MODEL_PROTOCOL_PREFIX.AWESOME_LLM]: {
            [MODEL_PROTOCOL_PREFIX.OPENAI]: toAwesomeLLMRequestFromOpenAI,
            // ... 其他从其他 LLM 转换为 AwesomeLLM 的转换
        },
    },
    // ... 其他类型（response, streamChunk, modelList）的转换
};
```

### 步骤 6: 配置 `api-server.js` (可选)

如果你希望通过命令行参数为 `AwesomeLLM` 配置 API 密钥或基础 URL，你需要在 `api-server.js` 的 `initializeConfig` 函数中添加相应的解析逻辑。

通过以上步骤，你就可以成功地将新的 LLM 集成到 AIClient-2-API 项目中，并利用其统一的 API 代理功能。