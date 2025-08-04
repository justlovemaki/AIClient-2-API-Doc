# 核心扩展点

AIClient-2-API 项目的设计考虑了可扩展性，使其能够方便地集成新的大型语言模型（LLM）或自定义服务。本章节将指导你如何向 AIClient-2-API 添加新的 LLM 支持。

要集成一个新的 LLM，你主要需要关注以下几个核心组件：

1.  **`src/adapter.js`**: 定义了 `ApiServiceAdapter` 接口以及各个 LLM 的具体适配器。
2.  **`src/convert.js`**: 处理不同 API 格式之间的数据转换。
3.  **`src/provider-strategies.js`**: 提供商策略工厂。
4.  **`src/{new_llm}/`**: 新 LLM 的核心实现。
5.  **`src/common.js`**: 定义常量。