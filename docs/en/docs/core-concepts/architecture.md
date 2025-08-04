# Architecture Overview

The AIClient-2-API project aims to provide a unified API service compatible with various mainstream Large Language Models (LLMs), including Google Gemini, OpenAI, and Anthropic Claude. Its core architectural design emphasizes flexibility, extensibility, and interoperability.

## Module Components

The AIClient-2-API's API service primarily consists of the following key modules:

1.  **API Service Layer (api-server.js)**:
    *   Serves as the entry point for the entire service, responsible for receiving HTTP requests from clients.
    *   Handles request routing, authentication, configuration management, and logging.
    *   Forwards received requests to the appropriate handling functions.

2.  **General Utilities and Constants (common.js)**:
    *   Defines project-wide constants (e.g., model provider types, API actions).
    *   Provides a series of general utility functions, including:
        *   Authentication checks: Validates API keys and permissions.
        *   Logging: Records input and output prompts for monitoring and debugging.
        *   Request body parsing: Reads JSON data from HTTP requests.
        *   Error handling: Unified error response format and suggestions.

3.  **Service Adapters (adapter.js)**:
    *   Implements an abstraction layer defining a unified interface (`ApiServiceAdapter`) that all AI service adapters should follow.
    *   Includes specific implementations for different LLMs (e.g., `GeminiApiServiceAdapter`, `OpenAIApiServiceAdapter`, `ClaudeApiServiceAdapter`, `KiroApiServiceAdapter`).
    *   These adapters are responsible for converting high-level service requests into native API calls for the corresponding LLM and processing their responses.

4.  **Data Conversion Layer (convert.js)**:
    *   One of the core highlights of AIClient-2-API.
    *   Responsible for bidirectional conversion (request body and response body) between different LLM API data formats, such as OpenAI, Gemini, and Claude.
    *   Supports complex conversion logic for text, multimodal content (images, audio), system instructions, tool calls, and model lists, ensuring seamless integration for clients on different platforms.

5.  **Provider Strategies (provider-strategies.js)**:
    *   Adopts a strategy pattern to dynamically select and execute corresponding processing logic based on the currently used LLM provider.
    *   Each provider (Gemini, OpenAI, Claude) has its corresponding strategy class (`*-strategy.js`).
    *   These strategies are responsible for handling logic specific to a particular LLM, such as extracting model information from requests, managing system prompts, and extracting text content.

6.  **Core API Calling Modules (`*-core.js`)**:
    *   Each LLM has a corresponding core module (`gemini-core.js`, `openai-core.js`, `claude-core.js`, `claude-kiro.js`).
    *   These modules are responsible for low-level API interactions with the specific LLM platform, including:
        *   Authentication mechanisms (OAuth, API Key).
        *   Sending HTTP requests and processing responses.
        *   Implementing request retry and error recovery logic.
        *   Handling streaming and unary content generation.
        *   `claude-kiro.js` is a special adapter used to access Claude models via Kiro/CodeWhisperer and handle its specific authentication and response formats.