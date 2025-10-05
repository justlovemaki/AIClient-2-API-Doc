# Model Provider Selection and Override

AIClient-2-API allows you to specify the backend LLM provider using the `--model-provider` command-line argument, for example:

```bash
node src/api-server.js --model-provider openai-custom
node src/api-server.js --model-provider claude-custom
node src/api-server.js --model-provider gemini-cli-oauth
node src/api-server.js --model-provider claude-kiro-oauth
node src/api-server.js --model-provider openai-qwen-oauth
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

### Provider Pools

AIClient-2-API supports provider pool functionality, allowing you to configure multiple provider instances with load balancing and health checks. When a provider pool is configured, the system automatically selects a healthy instance from the specified provider type pool to handle requests.

To use the provider pool functionality, configure `PROVIDER_POOLS_FILE_PATH` in `config.json` to point to your provider pool configuration file:

```json
{
  "PROVIDER_POOLS_FILE_PATH": "provider_pools.json",
  "MODEL_PROVIDER": "openai-custom"  // This will select an instance from the openai-custom pool
}
```

The main advantages of provider pools include:
- **High Availability**: When a provider instance becomes unavailable, the system automatically switches to other healthy instances
- **Load Balancing**: Distributes requests across multiple provider instances to prevent overloading a single instance
- **Failover**: Automatically detects and bypasses problematic provider instances
- **Scalability**: Easily add more provider instances to handle more requests