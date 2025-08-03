# Core Concepts

The AIClient-2-API project aims to provide a unified API service that is compatible with various mainstream Large Language Models (LLMs), including Google Gemini, OpenAI, and Anthropic Claude. Its core architectural design revolves around flexibility, scalability, and interoperability.

## Architecture Overview

AIClient-2-API's API service mainly consists of the following key modules:

1.  **API Service Layer (api-server.js)**:
    *   Serves as the entry point for the entire service, responsible for receiving HTTP requests from clients.
    *   Handles request routing, authentication, configuration management, and logging.
    *   Forwards incoming requests to appropriate handler functions.

2.  **Common Utilities and Constants (common.js)**:
    *   Defines project-wide constants (e.g., model provider types, API actions).
    *   Provides a series of common utility functions, including:
        *   Authentication checks: Validates API keys and permissions.
        *   Logging: Records input and output prompts for monitoring and debugging.
        *   Request body parsing: Reads JSON data from HTTP requests.
        *   Error handling: Standardized error response formats and suggestions.

3.  **Service Adapters (adapter.js)**:
    *   Implements an abstraction layer that defines a unified interface (`ApiServiceAdapter`) for all AI service adapters to adhere to.
    *   Contains specific implementations for different LLMs (e.g., `GeminiApiServiceAdapter`, `OpenAIApiServiceAdapter`, `ClaudeApiServiceAdapter`, `KiroApiServiceAdapter`).
    *   These adapters are responsible for translating high-level service requests into native API calls for the respective LLMs and handling their responses.

4.  **Data Conversion Layer (convert.js)**:
    *   One of AIClient-2-API's core highlights.
    *   Responsible for bidirectional data conversion between different LLM API formats such as OpenAI, Gemini, and Claude (request bodies and responses).
    *   Supports complex conversion logic for text, multimodal content (images, audio), system instructions, tool calls, and model lists, ensuring seamless integration with clients from different platforms.

5.  **Provider Strategies (provider-strategies.js)**:
    *   Adopts a strategy pattern to dynamically select and execute appropriate processing logic based on the current LLM provider.
    *   Each provider (Gemini, OpenAI, Claude) has its corresponding strategy class (`*-strategy.js`).
    *   These strategies handle LLM-specific logic, such as extracting model information from requests, managing system prompts, and extracting text content.

6.  **Core API Call Modules (`*-core.js`)**:
    *   Each LLM has a corresponding core module (`gemini-core.js`, `openai-core.js`, `claude-core.js`, `claude-kiro.js`).
    *   These modules are responsible for low-level API interactions with the actual LLM platforms, including:
        *   Authentication mechanisms (OAuth, API Key).
        *   Sending HTTP requests and processing responses.
        *   Implementing request retry and error recovery logic.
        *   Handling streaming and unary content generation.
        *   `claude-kiro.js` is a special adapter for accessing Claude models via Kiro/CodeWhisperer, handling its specific authentication and response formats.

## Workflow Overview

When a client sends a request to AIClient-2-API's API service, the general workflow is as follows:

1.  **Request Reception**: `api-server.js` receives the client's request.
2.  **Authentication and Routing**: `api-server.js` performs API key authentication and determines the target LLM provider and request type (content generation, model list) based on the request path and headers.
3.  **Request Conversion (From Client -> Internal)**: If the client's request format does not match the native format of the internal target LLM, `convert.js` translates the request body into the format required by the internal target LLM.
4.  **Strategy Application**: `provider-strategies.js` loads and executes the corresponding strategy based on the target LLM protocol, handling LLM-specific logic (e.g., merging system prompts).
5.  **API Call**: `adapter.js` obtains the appropriate `ApiServiceAdapter` instance for the determined target LLM provider and calls its `generateContent` or `listModels` method. This method internally communicates with the actual LLM via its respective `*-core.js` module.
6.  **Response Reception and Conversion (From Internal -> Client)**: After the LLM returns its native response, the `*-core.js` module sends it back to `adapter.js`. If the client expects a different response format than the native LLM format, `convert.js` intervenes again to convert the response to the format expected by the client.
7.  **Response Sending**: `api-server.js` sends the final response back to the client.

Through this layered and modular design, AIClient-2-API achieves high flexibility and maintainability, allowing for easy expansion to support new LLMs or API formats, while providing users with a unified access experience.