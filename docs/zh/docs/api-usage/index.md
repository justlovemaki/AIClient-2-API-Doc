# API 使用

AIClient-2-API 提供了一个统一的 API 服务，旨在兼容 OpenAI、Gemini 和 Claude 等主流 LLM 的 API 格式。这意味着你可以使用熟悉的 OpenAI SDK 或其他客户端，向 AIClient-2-API API 发送请求，而 AIClient-2-API 会在后端自动进行适配和转发。

## 启动 API 服务

在项目的根目录下，通过命令行启动 WeClone API 服务：

**基本用法:**
```bash
node src/api-server.js
```

**服务器配置:**
```bash
node src/api-server.js --host 0.0.0.0 --port 8080 --api-key your-secret-key
```

**OpenAI 提供商:**
```bash
node src/api-server.js --model-provider openai-custom --openai-api-key sk-xxx --openai-base-url https://api.openai.com/v1
```

**Claude 提供商:**
```bash
node src/api-server.js --model-provider claude-custom --claude-api-key sk-ant-xxx --claude-base-url https://api.anthropic.com
```

**Gemini 提供商（使用 Base64 凭据的 OAuth）:**
```bash
node src/api-server.js --model-provider gemini-cli --gemini-oauth-creds-base64 eyJ0eXBlIjoi... --project-id your-project-id
```

**Gemini 提供商（使用凭据文件的 OAuth）:**
```bash
node src/api-server.js --model-provider gemini-cli --gemini-oauth-creds-file /path/to/credentials.json --project-id your-project-id
```

**Kiro 提供商 (使用 Base64 凭据):**
```bash
node src/api-server.js --model-provider kiro-api --kiro-oauth-creds-base64 eyJ0eXBlIjoi...
```

**Kiro 提供商 (使用凭据文件):**
```bash
node src/api-server.js --model-provider kiro-api --kiro-oauth-creds-file /path/to/kiro_credentials.json
```

**系统提示管理:**
```bash
node src/api-server.js --system-prompt-file custom-prompt.txt --system-prompt-mode append
```

**日志配置:**
```bash
node src/api-server.js --log-prompts console
node src/api-server.js --log-prompts file --prompt-log-base-name my-logs
```

**完整示例:**
```bash
node src/api-server.js \
  --host 0.0.0.0 \
  --port 3000 \
  --api-key my-secret-key \
  --model-provider gemini-cli \
  --project-id my-gcp-project \
  --gemini-oauth-creds-file ./credentials.json \
  --system-prompt-file ./custom-system-prompt.txt \
  --system-prompt-mode overwrite \
  --log-prompts file \
  --prompt-log-base-name api-logs
```

## 认证

API 请求需要进行认证。目前支持以下几种认证方式：

1.  **Bearer Token (推荐)**：在请求头中包含 `Authorization: Bearer <YOUR_API_KEY>`。
2.  **`x-goog-api-key` 请求头**：在请求头中包含 `x-goog-api-key: <YOUR_API_KEY>`。
3.  **URL 查询参数**：在 URL 中包含 `?key=<YOUR_API_KEY>`。

你的 API 密钥可以通过启动参数 `--api-key` 进行配置：

```bash
node src/api-server.js --api-key your_secret_api_key
```

如果未指定，默认 API 密钥为 `123456`。

## 健康检查

你可以通过访问 `/health` 端点来检查 API 服务的健康状态：

```
GET http://localhost:3000/health
```

响应示例：

```json
{
  "status": "healthy",
  "timestamp": "2025-08-03T09:00:00.000Z",
  "provider": "gemini-cli-oauth"
}
```

## 模型列表

AIClient-2-API API 支持列出后端 LLM 提供的模型。

### OpenAI 兼容接口

```
GET http://localhost:3000/v1/models
```

这将返回一个模拟 OpenAI `models` 端点的响应，其中包含后端配置的 LLM 模型列表。

### Gemini 兼容接口

```
GET http://localhost:3000/v1beta/models
```

这将返回一个模拟 Gemini `models` 端点的响应。

## 内容生成

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
```

## 模型提供商的选择与覆盖

AIClient-2-API 允许你通过命令行参数 `--model-provider` 来指定后端使用的 LLM 提供商，例如：

```bash
node src/api-server.js --model-provider openai-custom
node src/api-server.js --model-provider claude-custom
node src/api-server.js --model-provider gemini-cli-oauth
node src/api-server.js --model-provider kiro-api
```

### 运行时覆盖

你还可以在每个 API 请求中通过 HTTP 请求头来覆盖默认的模型提供商：

```
model-provider: openai-custom
```

**示例 (使用 curl):**

```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -H "model-provider: claude-custom" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "messages": [
      { "role": "user", "content": "Hello, Claude!" }
    ]
  }'
```

### 路径段覆盖

你也可以通过 URL 的第一个路径段来覆盖模型提供商。例如：

```
POST http://localhost:3000/openai-custom/v1/chat/completions
```

这将把 `openai-custom` 作为当前的模型提供商。这在需要快速切换后端模型提供商进行测试时非常有用。

## 系统提示词管理

AIClient-2-API 允许你通过文件管理系统提示词。

### 从文件加载系统提示词

你可以通过 `--system-prompt-file` 参数指定一个包含系统提示词的文件路径：

```bash
node src/api-server.js --system-prompt-file ./my_system_prompt.txt
```

并通过 `--system-prompt-mode` 参数控制其行为：

*   `overwrite` (默认): 文件中的系统提示词将覆盖传入请求中的任何系统提示词。
*   `append`: 文件中的系统提示词将追加到传入请求中的系统提示词之后。

### 实时同步系统提示词

AIClient-2-API 会将传入请求中包含的系统提示词实时写入到 `fetch_system_prompt.txt` 文件中。这对于调试和观察模型行为非常有用。

## 日志配置

AIClient-2-API 提供了详细的日志功能，方便你监控和调试 API 请求。

通过 `--log-prompts` 参数配置日志模式：

*   `none` (默认): 不记录提示词日志。
*   `console`: 将提示词日志输出到控制台。
*   `file`: 将提示词日志记录到文件中。

当 `log-prompts` 设置为 `file` 时，你可以通过 `--prompt-log-base-name` 参数自定义日志文件的基础名称 (默认 `prompt_log`)。日志文件名将以 `prompt_log-YYYYMMDD-HHMMSS.log` 的格式生成。

**示例:**

```bash
node src/api-server.js --log-prompts file --prompt-log-base-name my_api_logs