import type { SiteContent } from '../types/content'

export const siteContent = {
  siteName: '双鱼工作室',
  hero: {
    eyebrow: 'PISCES STUDIO',
    title: '双鱼工作室',
    description:
      '在深海与星芒之间，我们以设计与叙事编织游弋的光影——每一次滚动，都是一段潜入梦境的旅程。',
    actionLabel: '向下探索',
    sideLabels: ['深 海 之 梦', '星 芒 游 弋'],
    scrollHint: '向下滚动',
  },
  sections: {
    profiles: {
      eyebrow: 'PROFILES',
      title: '双鱼游影',
      description: '两位创作者，在暗色水域中并肩游弋，以互补的视角勾勒工作室的轮廓。',
    },
    ripples: {
      eyebrow: 'JOURNAL',
      title: '泛起涟漪',
      description: '记录灵感、过程与思考——每一篇文章都是投向静水的一颗石子。',
    },
    work: {
      eyebrow: 'FEATURED WORK',
      title: '黑白之界',
      description: '在极致的留白与暗色中，让项目本身成为舞台的主角。',
    },
  },
  profiles: [
    {
      id: 'profile-a',
      name: '竹子',
      role: '视觉设计 · 创意总监',
      bio: '偏爱以紫色光晕与留白构建叙事空间，擅长将抽象情绪转化为可触摸的视觉语言。',
    },
    {
      id: 'profile-b',
      name: '果子',
      role: '前端开发 · 交互设计',
      bio: '在代码与画布之间游弋，用 ScrollTrigger 与 Canvas 编织流动的单页体验。',
    },
  ],
  posts: [
    {
      id: 'post-a',
      title: '深海配色指南',
      excerpt: '如何从黑紫基调中提炼层次，让光晕、粒子与文字共处而不互相抢夺。',
      publishedAt: '2026-03-12',
      tags: ['设计', '色彩'],
    },
    {
      id: 'post-b',
      title: '滚动叙事的分镜思维',
      excerpt: '把单页当作一支短片来编排——Hero、过渡与高潮，每一屏都有呼吸感。',
      publishedAt: '2026-05-08',
      tags: ['交互', '叙事'],
    },
    {
      id: 'post-c',
      title: 'Canvas 星座交互笔记',
      excerpt: '记录弹性牵引、光尾拖曳与 reduced motion 降级策略的实现细节。',
      publishedAt: '2026-07-01',
      tags: ['Canvas', '性能'],
    },
  ],
  projects: [
    {
      id: 'project-abyss',
      title: 'The Abyss and The Moon',
      subtitle: '深渊与明月',
      summary:
        '一场关于深潜与仰望的交互叙事——在完全的暗色中，英文标题如月升起，继而展开中文的世界。',
      body: [
        '项目以「下潜—凝视—浮升」三段式结构组织内容，依靠字重、行距与留白建立层级。',
      ],
    },
    {
      id: 'project-tide',
      title: 'Tidal Archive',
      subtitle: '潮汐档案',
      summary:
        '以滚动时间轴呈现海岸观测数据与影像片段，暗色界面中穿插紫色潮汐曲线。',
      body: [
        '将复杂数据压缩为可感知的节奏变化，移动端保留完整信息密度与可读性。',
      ],
    },
    {
      id: 'project-mirror',
      title: 'Mirror Pool',
      subtitle: '镜池',
      summary:
        '品牌视觉升级项目，通过水面倒影隐喻「真实与折射」的双面叙事。',
      body: [
        '主视觉以黑底光晕与细线构图为主，应用系统覆盖网页、海报与动态展示。',
      ],
    },
    {
      id: 'project-drift',
      title: 'Drift Notes',
      subtitle: '漂流笔记',
      summary:
        '互动阅读体验，章节随滚动逐页展开，像信件在暗流中缓缓传递。',
      body: [
        '结合 GSAP 分镜与响应式排版，在桌面端与移动端均保持连贯的阅读节奏。',
      ],
    },
  ],
  contact: {
    eyebrow: 'CONTACT',
    title: '投递信笺',
    description: '若我们的游弋轨迹与你的项目交汇，请留下讯息——信件会沉入本地 Demo，不会发往真实邮箱。',
    nameLabel: '称呼',
    emailLabel: '邮箱',
    messageLabel: '留言',
    submitLabel: '投入深海',
    demoNotice: 'Demo 表单不会实际发送信息。',
    successMessage: '信笺已收入本地 Demo，感谢你的留言。',
    emailErrorMessage: '请输入有效的邮箱地址。',
    requiredErrorMessage: '请填写所有必填项。',
  },
  footer: {
    copyright: '© 2026 双鱼工作室',
    tagline: '在深海与星芒之间游弋',
  },
} satisfies SiteContent
