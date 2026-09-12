import { useEffect, useRef } from 'react'

/**
 * 数字滚动：滚动到该数字进入视口中部时，从 0 滚到目标值（只触发一次）。
 * 自动解析前缀 / 后缀 / 千分位 / 小数位 / 补零，覆盖以下格式：
 *   '7,000'、'53,546'、'90%'、'85%+'、'+40%'、'$0.15'、'7.45%'、'3h'、'10x'、'05'
 * 动画期间直接写 DOM 文本（不走 React 重渲染），性能开销趋近于零。
 */
export default function CountUp({ value, duration = 1800, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const m = String(value).match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
    if (!m) {
      el.textContent = value
      return
    }
    const [, prefix, numStr, suffix] = m
    const target = parseFloat(numStr.replace(/,/g, ''))
    const dec = (numStr.split('.')[1] || '').length
    const useComma = numStr.includes(',')
    const padLen = dec === 0 && /^0\d/.test(numStr) ? numStr.length : 0

    const fmt = (v) => {
      let s = dec > 0 ? v.toFixed(dec) : String(Math.round(v))
      if (useComma) {
        s = Number(s).toLocaleString('en-US', {
          minimumFractionDigits: dec,
          maximumFractionDigits: dec,
        })
      } else if (padLen) {
        s = s.padStart(padLen, '0')
      }
      return prefix + s + suffix
    }

    el.textContent = fmt(0)

    let raf = 0
    const ob = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        ob.disconnect()
        const t0 = performance.now()
        const tick = (now) => {
          const k = Math.min(1, (now - t0) / duration)
          const eased = 1 - Math.pow(1 - k, 4)
          el.textContent = fmt(target * eased)
          if (k < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      /* 数字露出 40%（约板块露出 40% 处）即触发滚动 */
      { threshold: 0.4 }
    )
    ob.observe(el)

    return () => {
      ob.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return <span ref={ref} className={className} />
}
