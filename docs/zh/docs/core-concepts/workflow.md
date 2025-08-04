# 工作流概览

当客户端向 AIClient-2-API 的 API 服务发送请求时，其大致工作流程如下：

1.  **请求接收**：`api-server.js` 接收到客户端请求。
2.  **认证与路由**：`api-server.js` 进行 API 密钥认证，并根据请求路径和头部信息，确定目标 LLM 提供商和请求类型（内容生成、模型列表）。
3.  **请求转换 (From Client -> Internal)**：如果客户端请求的格式与内部目标 LLM 的原生格式不匹配，`convert.js` 会将请求体转换为内部目标 LLM 所需的格式。
4.  **策略应用**：`provider-strategies.js` 根据目标 LLM 协议，加载并执行相应的策略，处理 LLM 特有的逻辑（例如系统提示词的合并）。
5.  **API 调用**：`adapter.js` 根据确定的目标 LLM 提供商，获取对应的 `ApiServiceAdapter` 实例，并调用其 `generateContent` 或 `listModels` 方法。该方法内部会调用具体的 `*-core.js` 模块与实际的 LLM 进行通信。
6.  **响应接收与转换 (From Internal -> Client)**：LLM 返回原生响应后，`*-core.js` 模块会将其返回给 `adapter.js`。如果客户端期望的响应格式与 LLM 原生格式不同，`convert.js` 会再次介入，将响应转换为客户端期望的格式。
7.  **响应发送**：`api-server.js` 将最终的响应发送回客户端。

通过这种分层和模块化的设计，AIClient-2-API 实现了高度的灵活性和可维护性，能够轻松扩展以支持新的 LLM 或 API 格式，同时为用户提供统一的接入体验。