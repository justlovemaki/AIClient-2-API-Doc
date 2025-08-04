# Steps to Add a New LLM

Suppose you want to add support for a new LLM named `AwesomeLLM`.

### Step 1: Create Core Implementation for the New LLM

Create a new folder in `src/`, for example `src/awesome_llm/`, and create `awesome_llm-core.js` and `awesome_llm-strategy.js` within it.

#### `src/awesome_llm/awesome_llm-core.js`

This file will contain the logic for actual API interaction with `AwesomeLLM`. You need to implement `generateContent` and `listModels` methods, and possibly handle authentication, request retries, etc.

```javascript
// src/awesome_llm/awesome_llm-core.js
import axios from 'axios';

export class AwesomeLLMApiService {
    constructor(config) {
        // Initialize configuration, e.g., API Key and base URL
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
        // Implement content generation interaction with AwesomeLLM API
        // Return response in AwesomeLLM's native format
        const response = await this.axiosInstance.post(`/v1/models/${model}/generate`, requestBody);
        return response.data;
    }

    async *generateContentStream(model, requestBody) {
        // If AwesomeLLM supports streaming generation, implement streaming logic
        // Otherwise, you can simply call generateContent and simulate streaming response
        const response = await this.generateContent(model, requestBody);
        yield response; // Simple example, actual streaming handling would be more complex
    }

    async listModels() {
        // Implement logic to get the list of available AwesomeLLM models
        // Return model list in AwesomeLLM's native format
        const response = await this.axiosInstance.get('/v1/models');
        return response.data;
    }
}
```

#### `src/awesome_llm/awesome_llm-strategy.js`

This file will implement the `ProviderStrategy` interface, handling logic specific to `AwesomeLLM`.

```javascript
// src/awesome_llm/awesome_llm-strategy.js
import { ProviderStrategy } from '../provider-strategy.js';
import { extractSystemPromptFromRequestBody, MODEL_PROTOCOL_PREFIX } from '../common.js';

class AwesomeLLMStrategy extends ProviderStrategy {
    extractModelAndStreamInfo(req, requestBody) {
        // Extract model name and whether it's a streaming request from the request
        const model = requestBody.model;
        const isStream = requestBody.stream === true;
        return { model, isStream };
    }

    extractResponseText(response) {
        // Extract text content from AwesomeLLM's native response
        return response.generated_text || '';
    }

    extractPromptText(requestBody) {
        // Extract prompt from AwesomeLLM request body
        return requestBody.prompt || '';
    }

    async applySystemPromptFromFile(config, requestBody) {
        // Apply system prompt to AwesomeLLM request body based on configuration
        // Example: requestBody.system_prompt = newSystemText;
        return requestBody;
    }

    async manageSystemPrompt(requestBody) {
        // Manage system prompt, e.g., write to file
        const incomingSystemText = extractSystemPromptFromRequestBody(requestBody, MODEL_PROTOCOL_PREFIX.AWESOME_LLM);
        await this._updateSystemPromptFile(incomingSystemText, MODEL_PROTOCOL_PREFIX.AWESOME_LLM);
    }
}

export { AwesomeLLMStrategy };
```

### Step 2: Update `src/common.js`

Add new `MODEL_PROVIDER` and `MODEL_PROTOCOL_PREFIX` to `src/common.js`.

```javascript
// src/common.js
export const MODEL_PROTOCOL_PREFIX = {
    // ... existing content
    AWESOME_LLM: 'awesome_llm', // New
}

export const MODEL_PROVIDER = {
    // ... existing content
    AWESOME_LLM_CUSTOM: 'awesome_llm-custom', // New
}
```

### Step 3: Update `src/adapter.js`

Create `AwesomeLLMApiServiceAdapter` in `src/adapter.js` and add it to the `getServiceAdapter` factory function.

```javascript
// src/adapter.js
import { AwesomeLLMApiService } from './awesome_llm/awesome_llm-core.js'; // Import AwesomeLLM Service

// AwesomeLLM API Service Adapter
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

// ... (getServiceAdapter function)
export function getServiceAdapter(config) {
    const provider = config.MODEL_PROVIDER;
    if (!serviceInstances[provider]) {
        switch (provider) {
            // ... existing content
            case MODEL_PROVIDER.AWESOME_LLM_CUSTOM: // New
                serviceInstances[provider] = new AwesomeLLMApiServiceAdapter(config);
                break;
            default:
                throw new Error(`Unsupported model provider: ${provider}`);
        }
    }
    return serviceInstances[provider];
}
```

### Step 4: Update `src/provider-strategies.js`

Import the new strategy in `src/provider-strategies.js` and add it to the factory.

```javascript
// src/provider-strategies.js
import { AwesomeLLMStrategy } from './awesome_llm/awesome_llm-strategy.js'; // Import new strategy

class ProviderStrategyFactory {
    static getStrategy(providerProtocol) {
        switch (providerProtocol) {
            // ... existing content
            case MODEL_PROTOCOL_PREFIX.AWESOME_LLM: // New
                return new AwesomeLLMStrategy();
            default:
                throw new Error(`Unsupported provider protocol: ${providerProtocol}`);
        }
    }
}
```

### Step 5: Update `src/convert.js` (Optional but recommended)

If `AwesomeLLM`'s API format differs significantly from OpenAI, Gemini, or Claude, or if you want to support request/response conversion between `AwesomeLLM` and other LLMs, you need to add corresponding conversion functions in `src/convert.js`.

For example, if you want to convert an OpenAI request to an `AwesomeLLM` request:

```javascript
// src/convert.js
// ... (existing content)

export function toAwesomeLLMRequestFromOpenAI(openaiRequest) {
    // Conversion logic
    const awesomeLLMRequest = {
        prompt: openaiRequest.messages.map(m => m.content).join('\n'),
        // ... other parameters
    };
    return awesomeLLMRequest;
}

// ... (Add new conversion mappings in convertData function)
const conversionMap = {
    request: {
        // ... existing content
        [MODEL_PROTOCOL_PREFIX.AWESOME_LLM]: {
            [MODEL_PROTOCOL_PREFIX.OPENAI]: toAwesomeLLMRequestFromOpenAI,
            // ... other conversions from other LLMs to AwesomeLLM
        },
    },
    // ... conversions for other types (response, streamChunk, modelList)
};
```

### Step 6: Configure `api-server.js` (Optional)

If you want to configure API keys or base URLs for `AwesomeLLM` via command-line arguments, you need to add corresponding parsing logic in the `initializeConfig` function of `api-server.js`.

By following these steps, you can successfully integrate a new LLM into the AIClient-2-API project and leverage its unified API proxy functionality.