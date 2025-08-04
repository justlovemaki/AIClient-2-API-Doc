# Core Extension Points

The AIClient-2-API project is designed with extensibility in mind, allowing for easy integration of new Large Language Models (LLMs) or custom services. This section will guide you on how to add new LLM support to AIClient-2-API.

To integrate a new LLM, you primarily need to focus on the following core components:

1.  **`src/adapter.js`**: Defines the `ApiServiceAdapter` interface and specific adapters for various LLMs.
2.  **`src/convert.js`**: Handles data conversion between different API formats.
3.  **`src/provider-strategies.js`**: Provider strategy factory.
4.  **`src/{new_llm}/`**: Core implementation for the new LLM.
5.  **`src/common.js`**: Defines constants.