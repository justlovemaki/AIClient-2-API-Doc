# 架构概览

AIClient-2-API 项目旨在提供一个统一的 API 服务，以兼容不同的主流大型语言模型（LLM），包括 Google Gemini、OpenAI 和 Anthropic Claude。其核心架构设计围绕灵活性、可扩展性和互操作性。

## 模块组成

AIClient-2-API 的 API 服务主要由以下几个关键模块组成：

1.  **API 服务层 (api-server.js)**：
    *   作为整个服务的入口，负责接收来自客户端的 HTTP 请求。
    *   处理请求路由、认证、配置管理和日志记录。
    *   将收到的请求转发给相应的处理函数。

2.  **通用工具与常量 (common.js)**：
    *   定义了项目范围内的常量（如模型提供商类型、API 动作等）。
    *   提供了一系列通用辅助函数，包括：
        *   认证检查：验证 API 密钥和权限。
        *   日志记录：记录输入和输出提示，便于监控和调试。
        *   请求体解析：从 HTTP 请求中读取 JSON 数据。
        *   错误处理：统一的错误响应格式和建议。

3.  **服务适配器 (adapter.js)**：
    *   实现了一个抽象层，定义了所有 AI 服务适配器应遵循的统一接口（`ApiServiceAdapter`）。
    *   包含针对不同 LLM 的具体实现（如 `GeminiApiServiceAdapter`、`OpenAIApiServiceAdapter`、`ClaudeApiServiceAdapter`、`KiroApiServiceAdapter`）。
    *   这些适配器负责将上层服务请求转换为对应 LLM 的原生 API 调用，并处理它们的响应。

4.  **数据转换层 (convert.js)**：
    *   AIClient-2-API 的核心亮点之一。
    *   负责在 OpenAI、Gemini 和 Claude 等不同 LLM 的 API 数据格式之间进行双向转换（请求体和响应体）。
    *   支持文本、多模态内容（图像、音频）、系统指令、工具调用 (tool calls) 和模型列表的复杂转换逻辑，确保了不同平台客户端的无缝对接。

5.  **提供商策略 (provider-strategies.js)**：
    *   采用策略模式，根据当前使用的 LLM 提供商，动态选择并执行相应的处理逻辑。
    *   每个提供商（Gemini、OpenAI、Claude）都有其对应的策略类 (`*-strategy.js`)。
    *   这些策略负责处理与特定 LLM 相关的逻辑，例如从请求中提取模型信息、管理系统提示词以及提取文本内容等。

6.  **核心 API 调用模块 (`*-core.js`)**：
    *   每个 LLM 都有一个对应的核心模块（`gemini-core.js`、`openai-core.js`、`claude-core.js`、`claude-kiro.js`）。
    *   这些模块负责与具体的 LLM 平台进行底层 API 交互，包括：
        *   认证机制（OAuth、API Key）。
        *   发送 HTTP 请求并处理响应。
        *   实现请求重试和错误恢复逻辑。
        *   处理流式 (streaming) 和非流式 (unary) 内容生成。
        *   `claude-kiro.js` 是一个特殊的适配器，用于通过 Kiro/CodeWhisperer 访问 Claude 模型，并处理其特定的认证和响应格式。