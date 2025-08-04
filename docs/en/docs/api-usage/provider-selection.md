# Model Provider Selection and Override

AIClient-2-API allows you to specify the backend LLM provider using the `--model-provider` command-line argument, for example:

```bash
node src/api-server.js --model-provider openai-custom
node src/api-server.js --model-provider claude-custom
node src/api-server.js --model-provider gemini-cli-oauth
node src/api-server.js --model-provider kiro-api
```

### Runtime Override

You can also override the default model provider in each API request through an HTTP request header:

```
model-provider: openai-custom
```

**Example (using curl):**

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

### Path Segment Override

You can also override the model provider through the first path segment of the URL. For example:

```
POST http://localhost:3000/openai-custom/v1/chat/completions
```

This will set `openai-custom` as the current model provider. This is very useful when you need to quickly switch backend model providers for testing.