// @ts-nocheck
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    en: {
      label: 'English',
      lang: 'en',
      title: "AIClient-2-API",
      description: "A unified API service for LLM projects",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/docs/core-concepts/' }
        ],
        sidebar: [
          {
            text: 'Core Concepts',
            collapsed: false,
            items: [
                { text: 'Project Architecture Overview', link: '/en/docs/core-concepts/' },
            ]
          },
          {
            text: 'API Usage',
            collapsed: false,
            items: [
                { text: 'API Interface Documentation', link: '/en/docs/api-usage/' },
            ]
          },
          {
            text: 'Advanced Configuration',
            collapsed: false,
            items: [
                { text: 'Configuration Parameters Details', link: '/en/docs/advanced-config/' },
            ]
          },
          {
            text: 'Development and Extension',
            collapsed: false,
            items: [
                { text: 'Integrate New LLM', link: '/en/docs/development/' },
            ]
          }
        ],
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        editLink: {
          pattern: 'https://github.com/justlovemaki/AIClient-2-APIblob/main/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      title: "AIClient-2-API",
      description: "为LLM项目提供统一API服务",
      themeConfig: {
        nav: [
          { text: '主页', link: '/zh/' },
          { text: '文档', link: '/zh/docs/core-concepts/' }
        ],
        outline: {
          level: [2, 3],
          label: '目录'
        },
        sidebar: [
          {
            text: '核心概念',
            collapsed: false,
            items: [
                { text: '项目架构概览', link: '/zh/docs/core-concepts/' },
            ]
          },
          {
            text: 'API 使用',
            collapsed: false,
            items: [
                { text: 'API 接口说明', link: '/zh/docs/api-usage/' },
            ]
          },
          {
            text: '高级配置',
            collapsed: false,
            items: [
                { text: '配置参数详解', link: '/zh/docs/advanced-config/' },
            ]
          },
          {
            text: '开发与扩展',
            collapsed: false,
            items: [
                { text: '集成新 LLM', link: '/zh/docs/development/' },
            ]
          }
        ],
        editLink: {
          pattern: 'https://github.com/justlovemaki/AIClient-2-APIblob/main/docs/:path',
          text: '在 GitHub 上编辑此页面'
        }
      }
    }
  },
  head: [['link', { rel: 'icon', href: '/img/logo.png' }]],
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/justlovemaki/AIClient-2-API' },
      { icon: 'x', link: 'https://x.com/justlikemaki' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="TikTok" role="img"viewBox="0 0 512 512"><rectrx="15%" height="512" width="512"fill="#ffffff"/><defs><path id="t" d="M219 200a117 117 0 1 0 101 115v-128a150 150 0 0 0 88 28v-63a88 88 0 0 1-88-88h-64v252a54 54 0 1 1-37-51z" style="mix-blend-mode:multiply"/></defs><use href="#t" fill="#f05" x="18" y="15"/><use href="#t" fill="#0ee"/></svg>'
        },
        link: 'https://cdn.jsdmirror.com/gh/justlovemaki/imagehub@main/logo/7fc30805eeb831e1e2baa3a240683ca3.md.png',
        ariaLabel: '关注抖音'
      }
    ],
    footer: {
      message: 'Contact Us：<a href="mailto:justlikemaki@qq.com" style="color: var(--vp-c-brand-1); text-decoration: none;">✉️ justlikemaki@qq.com</a>',
      copyright: 'Copyright © 2024 AIClient-2-API. All rights reserved.'
    },
  }
})
