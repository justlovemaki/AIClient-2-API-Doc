# Core Concepts

AIClient2API is a versatile and lightweight API proxy designed for ultimate flexibility and ease of use. It uses a Node.js HTTP server to unify various backend APIs such as Google Gemini CLI authenticated login, OpenAI, Claude, and Kiro into a standard OpenAI-format interface. The project adopts a modern modular architecture, supporting strategy and adapter patterns, with complete test coverage and a health check mechanism. It's ready out-of-the-box; simply run `npm install` and it's good to go. You can effortlessly switch model providers in the configuration file, allowing any OpenAI-compatible client or application to seamlessly use different large model capabilities through the same API address, completely eliminating the hassle of maintaining multiple configurations and dealing with interface incompatibility issues for different services.

## Table of Contents

-   [Architecture Overview](./architecture.md)
-   [Workflow Overview](./workflow.md)