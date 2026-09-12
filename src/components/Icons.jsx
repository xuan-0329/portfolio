const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const icons = [
  // 01 品牌体系
  () => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...S}>
      <path d="M12 2.6 20.5 7v10L12 21.4 3.5 17V7z" />
      <path d="M12 12 20.5 7M12 12v9.4M12 12 3.5 7" />
    </svg>
  ),
  // 02 AI 工作流
  () => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="17" r="2.2" />
      <circle cx="19" cy="17" r="2.2" />
      <path d="M12 7.2 6.4 15M12 7.2 17.6 15M7.2 17h9.6" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  ),
  // 03 跨境全链路
  () => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.4 9.5h17.2M3.4 14.5h17.2" />
      <path d="M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
    </svg>
  ),
  // 04 数据驱动
  () => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...S}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6M13 20V8M18 20v-9" />
      <path d="M8 11.5 13 6l5 4" opacity=".45" />
    </svg>
  ),
  // 05 团队与 SOP
  () => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...S}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 5.6a3 3 0 0 1 0 5.8M17.5 14.9c2 .7 3.4 2.4 3.4 4.6" />
    </svg>
  ),
  // 06 包装与艺术指导
  () => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...S}>
      <path d="M20.5 8.2v10L12 21.8l-8.5-3.6v-10" />
      <path d="M3.5 8.2 12 4.5l8.5 3.7L12 12z" />
      <path d="M12 12v9.8M7.7 6.3 16.3 10" opacity=".45" />
    </svg>
  ),
]
