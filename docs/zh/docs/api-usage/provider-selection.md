# 模型提供商的选择与覆盖

AIClient-2-API 允许你通过命令行参数 `--model-provider` 来指定后端使用的 LLM 提供商，例如：

```bash
node src/api-server.js --model-provider openai-custom
node src/api-server.js --model-provider claude-custom
node src/api-server.js --model-provider gemini-cli-oauth
node src/api-server.js --model-provider claude-kiro-oauth
node src/api-server.js --model-provider openai-qwen-oauth
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