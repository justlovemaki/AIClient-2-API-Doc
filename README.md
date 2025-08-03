<div align="center">

# AIClient-2-API 🚀

**一个能将多种大模型 API（Gemini, OpenAI, Claude...）统一封装为本地 OpenAI 兼容接口的强大代理。**

</div>

<div align="center">

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js](https://img.shields.io/badge/Node.js-≥20.0.0-green.svg)](https://nodejs.org/)

[**中文**](./README.md) | [**English**](./README-EN.md)

</div>

> `GeminiCli2API` 是一个多功能、轻量化的 API 代理，旨在提供极致的灵活性和易用性。它通过一个 Node.js HTTP 服务器，将 Google Gemini CLI 授权登录、OpenAI、Claude、Kiro 等多种后端 API 统一转换为标准的 OpenAI 格式接口。项目采用现代化的模块化架构，支持策略模式和适配器模式，具备完整的测试覆盖和健康检查机制，开箱即用，`npm install` 后即可直接运行。您只需在配置文件中轻松切换模型服务商，就能让任何兼容 OpenAI 的客户端或应用，通过同一个 API 地址，无缝地使用不同的大模型能力，彻底摆脱为不同服务维护多套配置和处理接口不兼容问题的烦恼。
