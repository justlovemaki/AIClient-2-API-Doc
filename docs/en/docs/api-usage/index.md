# API Usage

AIClient-2-API provides a unified API service designed to be compatible with mainstream LLM API formats such as OpenAI, Gemini, and Claude. This means you can use familiar OpenAI SDKs or other clients to send requests to the AIClient-2-API API, and AIClient-2-API will automatically adapt and forward them on the backend.

## Starting the API Service

From the project root directory, start the WeClone API service via the command line:

**Basic Usage:**
```bash
node src/api-server.js
```

**Server Configuration:**
```bash
node src/api-server.js --host 0.0.0.0 --port 8080 --api-key your-secret-key
```

**OpenAI Provider:**
```bash
node src/api-server.js --model-provider openai-custom --openai-api-key sk-xxx --openai-base-url https://api.openai.com/v1
```

**Claude Provider:**
```bash
node src/api-server.js --model-provider claude-custom --claude-api-key sk-ant-xxx --claude-base-url https://api.anthropic.com
```

**Gemini Provider (OAuth with Base64 credentials):**
```bash
node src/api-server.js --model-provider gemini-cli --gemini-oauth-creds-base64 eyJ0eXBlIjoi... --project-id your-project-id
```

**Gemini Provider (OAuth with credentials file):**
```bash
node src/api-server.js --model-provider gemini-cli --gemini-oauth-creds-file /path/to/credentials.json --project-id your-project-id
```

**Kiro Provider (with Base64 credentials):**
```bash
node src/api-server.js --model-provider kiro-api --kiro-oauth-creds-base64 eyJ0eXBlIjoi...
```

**Kiro Provider (with credentials file):**
```bash
node src/api-server.js --model-provider kiro-api --kiro-oauth-creds-file /path/to/kiro_credentials.json
```

**System Prompt Management:**
```bash
node src/api-server.js --system-prompt-file custom-prompt.txt --system-prompt-mode append
```

**Logging Configuration:**
```bash
node src/api-server.js --log-prompts console
node src/api-server.js --log-prompts file --prompt-log-base-name my-logs
```

**Complete Example:**
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

## Authentication

API requests require authentication. The following authentication methods are supported:

1.  **Bearer Token (Recommended)**: Include `Authorization: Bearer <YOUR_API_KEY>` in the request header.
2.  **`x-goog-api-key` Header**: Include `x-goog-api-key: <YOUR_API_KEY>` in the request header.
3.  **URL Query Parameter**: Include `?key=<YOUR_API_KEY>` in the URL.

Your API key can be configured via the `--api-key` startup parameter:

```bash
node src/api-server.js --api-key your_secret_api_key
```

If not specified, the default API key is `123456`.

## Health Check

You can check the health status of the API service by accessing the `/health` endpoint:

```
GET http://localhost:3000/health
```

Example Response:

```json
{
  "status": "healthy",
  "timestamp": "2025-08-03T09:00:00.000Z",
  "provider": "gemini-cli-oauth"
}
```

## Model Listing

The AIClient-2-API API supports listing models provided by the backend LLMs.

### OpenAI Compatible Endpoint

```
GET http://localhost:3000/v1/models
```

This will return a response mimicking the OpenAI `models` endpoint, containing a list of LLM models configured on the backend.

### Gemini Compatible Endpoint

```
GET http://localhost:3000/v1beta/models
```

This will return a response mimicking the Gemini `models` endpoint.

## Content Generation

The AIClient-2-API API is compatible with OpenAI and Gemini's content generation interfaces.

### OpenAI Compatible Endpoint (Recommended)

You can use the OpenAI `chat/completions` endpoint to send requests to the AIClient-2-API API. AIClient-2-API will automatically convert this request to the format required by the backend LLM.

```
POST http://localhost:3000/v1/chat/completions
```

**Request Body Example (JSON):**

```json
{
  "model": "gemini-2.5-flash", // or "claude-3-5-sonnet-20241022", "gpt-3.5-turbo", etc.
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful AI assistant."
    },
    {
      "role": "user",
      "content": "Hello, can you write a poem about spring for me?"
    }
  ],
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": true // If streaming response is needed
}
```

**Response Body Example (non-streaming):**

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
        "content": "Spring breeze gently sways the willow branches, silent rain nourishes blooming flowers. Swallows return to build new nests, bees and butterflies dance gracefully."
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

**Streaming Response Example:**

Streaming responses will be returned in Server-Sent Events (SSE) format, with each event containing a JSON object.

```
data: {"id":"chatcmpl-uuid","object":"chat.completion.chunk","created":1722678400,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"content":"Spring"},"finish_reason":null}]}

data: {"id":"chatcmpl-uuid","object":"chat.completion.chunk","created":1722678400,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"content":" breeze"},"finish_reason":null}]}
...
```

### Gemini Compatible Endpoint

You can also directly use the Gemini `generateContent` endpoint.

```
POST http://localhost:3000/v1beta/models/{modelId}:generateContent
POST http://localhost:3000/v1beta/models/{modelId}:streamGenerateContent
```

For example, for the `gemini-2.5-flash` model:

```
POST http://localhost:3000/v1beta/models/gemini-2.5-flash:generateContent
```

**Request Body Example (JSON):**

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        { "text": "Hello, can you write a poem about spring for me?" }
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
      { "text": "You are a helpful AI assistant." }
    ]
  }
}
```

### Claude Compatible Endpoint

AIClient-2-API also supports the Anthropic Claude Messages API format.

```
POST http://localhost:3000/v1/messages
```

**Request Body Example (JSON):**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "messages": [
    {
      "role": "user",
      "content": "Hello, can you write a poem about spring for me?"
    }
  ],
  "system": "You are a helpful AI assistant.",
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": true
}
```

## Model Provider Selection and Override

AIClient-2-API allows you to specify the backend LLM provider using the `--model-provider` command-line argument, for example:

```bash
node src/api-server.js --model-provider openai-custom
node src/api-server.js --model-provider claude-custom
node src/api-server.js --model-provider gemini-cli-oauth
node src/api-server.js --model-provider kiro-api
```

### Runtime Override

You can also override the default model provider in each API request using an HTTP request header:

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

You can also override the model provider by using the first path segment of the URL. For example:

```
POST http://localhost:3000/openai-custom/v1/chat/completions
```

This will set `openai-custom` as the current model provider. This is very useful when you need to quickly switch backend model providers for testing.

## System Prompt Management

AIClient-2-API allows you to manage system prompts via files.

### Loading System Prompts from a File

You can specify a file path containing the system prompt using the `--system-prompt-file` parameter:

```bash
node src/api-server.js --system-prompt-file ./my_system_prompt.txt
```

And control its behavior with the `--system-prompt-mode` parameter:

*   `overwrite` (default): The system prompt from the file will overwrite any system prompt present in the incoming request.
*   `append`: The system prompt from the file will be appended to any system prompt present in the incoming request.

### Real-time System Prompt Synchronization

AIClient-2-API will write the system prompt included in incoming requests to `fetch_system_prompt.txt` in real-time. This is very useful for debugging and observing model behavior.

## Logging Configuration

AIClient-2-API provides detailed logging capabilities for monitoring and debugging API requests.

Configure the logging mode using the `--log-prompts` parameter:

*   `none` (default): No prompt logging.
*   `console`: Outputs prompt logs to the console.
*   `file`: Logs prompt messages to a file.

When `log-prompts` is set to `file`, you can customize the base name of the log files using the `--prompt-log-base-name` parameter (default `prompt_log`). Log files will be generated in the format `prompt_log-YYYYMMDD-HHMMSS.log`.

**Example:**

```bash
node src/api-server.js --log-prompts file --prompt-log-base-name my_api_logs