# Workflow Overview

When a client sends a request to the AIClient-2-API's API service, the general workflow is as follows:

1.  **Request Reception**: `api-server.js` receives the client's request.
2.  **Authentication and Routing**: `api-server.js` performs API key authentication and determines the target LLM provider and request type (content generation, model list) based on the request path and header information.
3.  **Request Conversion (From Client -> Internal)**: If the client's request format does not match the native format of the internal target LLM, `convert.js` converts the request body to the format required by the internal target LLM.
4.  **Strategy Application**: `provider-strategies.js` loads and executes the corresponding strategy based on the target LLM protocol, handling LLM-specific logic (e.g., merging system prompts).
5.  **API Call**: `adapter.js` obtains the corresponding `ApiServiceAdapter` instance based on the determined target LLM provider and calls its `generateContent` or `listModels` method. This method internally calls the specific `*-core.js` module to communicate with the actual LLM.
6.  **Response Reception and Conversion (From Internal -> Client)**: After the LLM returns a native response, the `*-core.js` module returns it to `adapter.js`. If the client's desired response format differs from the LLM's native format, `convert.js` intervenes again to convert the response to the format expected by the client.
7.  **Response Sending**: `api-server.js` sends the final response back to the client.

Through this layered and modular design, AIClient-2-API achieves a high degree of flexibility and maintainability, allowing for easy expansion to support new LLMs or API formats, while providing a unified access experience for users.