# Model Listing

The AIClient-2-API API supports listing models provided by the backend LLMs.

### OpenAI Compatible Interface

```
GET http://localhost:3000/v1/models
```

This will return a response mimicking the OpenAI `models` endpoint, containing a list of LLM models configured on the backend.

### Gemini Compatible Interface

```
GET http://localhost:3000/v1beta/models
```

This will return a response mimicking the Gemini `models` endpoint.