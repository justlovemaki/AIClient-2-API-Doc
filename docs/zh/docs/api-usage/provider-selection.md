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

### 提供商池

AIClient-2-API 支持提供商池功能，允许你配置多个提供商实例并进行负载均衡和健康检查。当配置了提供商池时，系统会从指定类型的提供商池中自动选择一个健康的实例来处理请求。

要使用提供商池功能，需要在 `config.json` 中配置 `PROVIDER_POOLS_FILE_PATH` 指向你的提供商池配置文件：

```json
{
  "PROVIDER_POOLS_FILE_PATH": "provider_pools.json",
  "MODEL_PROVIDER": "openai-custom"  // 这将从 openai-custom 池中选择一个实例
}
```

提供商池的主要优势包括：
- **高可用性**: 当某个提供商实例不可用时，系统会自动切换到其他健康的实例
- **负载均衡**: 在多个提供商实例之间分散请求，避免单个实例过载
- **故障转移**: 自动检测并绕过有问题的提供商实例
- **扩展性**: 可以轻松添加更多提供商实例来处理更多请求