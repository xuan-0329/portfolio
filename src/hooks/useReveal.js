import { useEffect, useRef } from 'react'

/**
 * 滚动进入视口时添加 .in，配合 .rv 使用。
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 自身 + 内部所有 .rv 子元素一起触发（保留各自的 transitionDelay 做错落）
          el.classList.add('in')
          el.querySelectorAll('.rv').forEach((n) => n.classList.add('in'))
          io.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}

/** 给任意元素批量挂上 reveal（用 data-rv 标记） */
export function useRevealAll(deps = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-rv]:not(.rv-ready)')
    nodes.forEach((n) => n.classList.add('rv', 'rv-ready'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
