# 内容生成

AIClient-2-API API 兼容 OpenAI 和 Gemini 的内容生成接口。

### OpenAI 兼容接口 (推荐)

你可以使用 OpenAI `chat/completions` 接口向 AIClient-2-API API 发送请求。AIClient-2-API 会自动将此请求转换为后端 LLM 所需的格式。

```
POST http://localhost:3000/v1/chat/completions
```

**请求体示例 (JSON):**

```json
{
  "model": "gemini-2.5-flash", // 或 "claude-3-5-sonnet-20241022", "gpt-3.5-turbo" 等
  "messages": [
    {
      "role": "system",
      "content": "你是一名乐于助人的AI助手。"
    },
    {
      "role": "user",
      "content": "你好，能帮我写一首关于春天的诗吗？"
    }
  ],
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": true // 如果需要流式响应
}
```

**响应体示例 (非流式):**

```json
{
  "id": "chatcmpl-uuid",
  "object": "chat.completion",
  "created": 1722678400,
  "model": "gemini-2.5-flash",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "春风轻拂柳丝摆，细雨无声润花开。\n燕子归来筑新巢，蜂蝶翩翩舞九垓。"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 30,
    "total_tokens": 50
  }
}
```

**流式响应示例:**

流式响应将以 Server-Sent Events (SSE) 格式返回，每个事件包含一个 JSON 对象。

```
data: {"id":"chatcmpl-uuid","object":"chat.completion.chunk","created":1722678400,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"content":"春"},"finish_reason":null}]}

data: {"id":"chatcmpl-uuid","object":"chat.completion.chunk","created":1722678400,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"content":"风"},"finish_reason":null}]}
...
```

### Gemini 兼容接口

你也可以直接使用 Gemini 的 `generateContent` 接口。

```
POST http://localhost:3000/v1beta/models/{modelId}:generateContent
POST http://localhost:3000/v1beta/models/{modelId}:streamGenerateContent
```

例如，对于 `gemini-2.5-flash` 模型：

```
POST http://localhost:3000/v1beta/models/gemini-2.5-flash:generateContent
```

**请求体示例 (JSON):**

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        { "text": "你好，能帮我写一首关于春天的诗吗？" }
      ]
    }
  ],
  "generationConfig": {
    "maxOutputTokens": 100,
    "temperature": 0.7,
    "topP": 0.9
  },
  "systemInstruction": {
    "parts": [
      { "text": "你是一名乐于助人的AI助手。" }
    ]
  }
}
```

### Claude 兼容接口

AIClient-2-API 也支持 Anthropic Claude Messages API 格式。

```
POST http://localhost:3000/v1/messages
```

**请求体示例 (JSON):**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "messages": [
    {
      "role": "user",
      "content": "你好，能帮我写一首关于春天的诗吗？"
    }
  ],
  "system": "你是一名乐于助人的AI助手。",
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": true
}