# Content Generation

The AIClient-2-API API is compatible with OpenAI and Gemini's content generation interfaces.

### OpenAI Compatible Interface (Recommended)

You can use the OpenAI `chat/completions` interface to send requests to the AIClient-2-API. AIClient-2-API will automatically convert this request to the format required by the backend LLM.

```
POST http://localhost:3000/v1/chat/completions
```

**Example Request Body (JSON):**

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
  "stream": true // if streaming response is required
}
```

**Example Response Body (Non-streaming):**

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
        "content": "The spring breeze gently caresses the willow branches, and the fine rain silently moistens the blooming flowers.\nSwallows return to build new nests, while bees and butterflies dance gracefully."
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

**Example Streaming Response:**

Streaming responses will be returned in Server-Sent Events (SSE) format, with each event containing a JSON object.

```
data: {"id":"chatcmpl-uuid","object":"chat.completion.chunk","created":1722678400,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"content":"Spring"},"finish_reason":null}]}

data: {"id":"chatcmpl-uuid","object":"chat.completion.chunk","created":1722678400,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"content":"breeze"},"finish_reason":null}]}
...
```

### Gemini Compatible Interface

You can also directly use Gemini's `generateContent` interface.

```
POST http://localhost:3000/v1beta/models/{modelId}:generateContent
POST http://localhost:3000/v1beta/models/{modelId}:streamGenerateContent
```

For example, for the `gemini-2.5-flash` model:

```
POST http://localhost:3000/v1beta/models/gemini-2.5-flash:generateContent
```

**Example Request Body (JSON):**

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

### Claude Compatible Interface

AIClient-2-API also supports the Anthropic Claude Messages API format.

```
POST http://localhost:3000/v1/messages
```

**Example Request Body (JSON):**

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