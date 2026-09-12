/**
 * 全站文案与素材的唯一数据源。
 * 后续只需要改这一个文件（图片放进 public/ 后把路径填进来即可）。
 *
 * 内容来源：夏艳宣简历 + 方案A（品牌设计主管）+ 方案B（跨境电商视觉负责人）
 */

export const site = {
  /* ---------------- 品牌 / 导航 ---------------- */
  brand: {
    mark: 'XY',
    name: 'XIA YANXUAN',
    nameCN: '夏艳宣',
  },

  nav: [
    { label: '首页', en: 'Index', href: '#home' },
    { label: '经历', en: 'About', href: '#about' },
    { label: '项目', en: 'Work', href: '#work' },
    { label: '优势', en: 'Capabilities', href: '#capabilities' },
  ],
  navCTA: { label: '联系我', href: '#contact' },

  /* ---------------- 首页 HERO ----------------
   * heroVideo: 把视频放到 public/ 后填 '/hero.mp4' 即可自动启用；
   * 为 null 时使用内置的 Canvas 粒子背景（无需任何素材）。
   * heroPoster: 视频封面图。
   */
  hero: {
    video: null,
    poster: null,
    eyebrow: 'Brand Visual · Cross-border E-commerce · AI Workflow',
    titleLines: ['让每一个像素', '都有商业价值'],
    desc:
      '5 年品牌视觉经验，从 UI 设计师成长至品牌设计总监。主导 3C 潮流配饰品牌 0-1 全案搭建、7 国独立站视觉 SOP 标准化，以及 AI 设计工作流的团队级落地——用策略驱动设计，用系统赋能增长。',
    metaLeft: ['广州 / Guangzhou', '求职中 · 设计总监 / 经理'],
    metaRight: ['Scroll', '↓'],
    role: '品牌设计经理 / 视觉设计总监 / 跨境电商视觉负责人',
  },

  /* ---------------- 个人经历 ---------------- */
  about: {
    label: '01 — About',
    heading: '关于我',
    portrait: '/portrait.jpg',
    paragraphs: [
      '我是夏艳宣，5 年品牌视觉与跨境电商设计经验，从 UI 设计师一路走到品牌设计总监。我的工作不只是把画面做好看，而是把品牌定位、用户偏好与转化数据翻译成一套可被执行、可被复用、可被交接的视觉规则。',
      '近两年我把重心放在两件事上：一是把 7 国独立站的视觉输出标准化成 SOP，让多站点视觉零偏差、团队效率提升 30%+；二是把 AI 真正接入生产流程——从口令库、终审机制到视频脚本模板，让成熟素材从「天级」压缩到 3 小时/条。',
      '我相信 AI 不是替代设计师，而是把设计师从重复执行里解放出来，把判断力还给真正需要判断的地方。',
    ],
    contact: [
      { k: 'Email', v: '2247828263@qq.com', href: 'mailto:2247828263@qq.com' },
      { k: 'Phone', v: '177 3803 5607', href: 'tel:17738035607' },
      { k: 'WeChat', v: 'Xyanxuan0329', href: null },
      { k: 'Based in', v: '广州 · 求职意向：设计总监 / 经理', href: null },
    ],
    stats: [
      { n: '05', u: '年', k: '品牌视觉经验', en: 'Years' },
      { n: '07', u: '国', k: '独立站视觉 SOP', en: 'Countries' },
      { n: '7.45', u: '%', k: '广告点击率 CTR', en: 'Ad CTR' },
      { n: '327', u: '单', k: '广告有效订单', en: 'Orders' },
    ],
    timeline: [
      { y: '2017 — 2020', t: 'UI 设计师', d: '蓝凌 / 智随互动 · 设计规范搭建与产品视觉落地' },
      { y: '2020 — 2022', t: '品牌设计主管', d: '京坤巨将餐饮 · 连锁品牌视觉与物料体系' },
      { y: '2022 — 2025', t: '品牌设计总监', d: '泰晟时尚 · just one name 品牌 0-1 全案' },
      { y: '2025 — 至今', t: '品牌视觉负责人', d: '罗拉信息科技 · 7 国独立站 SOP / AI 工作流' },
    ],
    edu: { k: '教育背景', v: '四川传媒学院 · 视觉传达 本科（2013-2017）' },
  },

  /* ---------------- 精选项目 ---------------- */
  work: {
    label: '02 — Selected Work',
    heading: '精选项目',
    desc: '从品牌 0-1 到跨境增长，每个项目都由策略推导视觉，并由数据验证结果。',
    projects: [
      {
        id: '01',
        title: 'just one name',
        subtitle: '3C 潮流配饰品牌从 0 到 1 全案搭建',
        year: '2023 — 2025',
        role: '品牌设计总监',
        scope: 'VI / 包装 / 独立站 / 运营 / 产品',
        tags: ['Brand 0-1', 'VI System', 'Packaging', 'Web'],
        metrics: [
          { n: '7,000', k: '原创图案 B 端采购（件）' },
          { n: '90%', k: '资产库业务覆盖' },
        ],
        image: '/work/p1.jpg',
        tone: 'a',
        /* 项目详情浮层：七大品类作品墙 */
        detail: {
          intro: '品牌 0-1 全案：从符号系统、VI 手册到独立站、EDM、大促活动、包材与产品图案，所有视觉由同一套品牌规则生长出来。',
          categories: [
            {
              key: 'brand', label: '品牌设计', en: 'Brand',
              desc: '品牌符号 / VI 手册 / 视觉定位 — 点击封面可翻阅完整 PDF',
              images: [
                { cover: '/work/jon/brand-1.jpg', pdf: '/pdf/brand-vi.pdf', title: 'VI 手册 · just one name' },
                { cover: '/work/jon/brand-2.jpg', pdf: '/pdf/brand-standard.pdf', title: '品牌标准化 VIS（中文版）' },
                { cover: '/work/jon/brand-3.jpg', pdf: '/pdf/brand-standard-en.pdf', title: 'Brand Standard（英文版）' },
                { cover: '/work/jon/brand-4.jpg', pdf: '/pdf/brand-position.pdf', title: '品牌产品视觉定位' },
                { cover: '/work/jon/brand-5.jpg', pdf: '/pdf/brand-position-2.pdf', title: '品牌产品视觉定位 2' },
              ],
            },
            {
              key: 'web', label: '网页设计', en: 'Web',
              desc: '独立站首页 / 产品内容页',
              note: 'JUST ONE NAME 作为一家 3C 潮流配饰品牌，自创立之初便秉持着 “探索世界、自由的、环保” 的宗旨，致力于为年轻人提供表达自我、探索自然的时尚穿搭选择，因此我们将环保元素及颜色贯穿到整站设计中，以及将品牌 LOGO 图形延伸为元素，运用到网页、布局、转场交互等细节中，加深品牌印象的同时，使网站整体视觉感更强，以垂直滚屏形式配合微交互，将内容层级丰富化，使整体网站的视觉品质、品牌形象进行全面升级。',
              images: [
                '/work/jon/web-1.jpg', '/work/jon/web-2.jpg', '/work/jon/web-3.jpg', '/work/jon/web-4.jpg', '/work/jon/web-5.jpg', '/work/jon/web-6.jpg',
                { video: '/work/jon/web-banner.mp4', poster: '/work/jon/web-banner.jpg' },
              ],
            },
            {
              key: 'ops', label: '运营设计', en: 'CRM',
              desc: 'EDM 邮件 / Web Push / 召回链路',
              note: '一些网站的邮件设计，有一些是网站建立之初设计的固定邮件，也有一些是后面上新品，或者活动推荐的。关于邮件我们还做了一些AB测——动图与否、按钮动与否等等，很多就不放了，这些应该差不多了，大概看看吧。',
              images: [
                '/work/jon/ops-01.jpg', '/work/jon/ops-02.jpg', '/work/jon/ops-03.jpg', '/work/jon/ops-04.jpg', '/work/jon/ops-05.jpg', '/work/jon/ops-06.jpg', '/work/jon/ops-07.jpg', '/work/jon/ops-08.jpg',
                { gif: '/work/jon/ops-gif-09.gif' },
                '/work/jon/ops-10.jpg', '/work/jon/ops-11.jpg', '/work/jon/ops-12.jpg', '/work/jon/ops-13.jpg', '/work/jon/ops-14.jpg',
                { video: '/work/jon/ops-gif-15.mp4', poster: '/work/jon/ops-gif-15.jpg', loop: true },
                '/work/jon/ops-16.jpg', '/work/jon/ops-17.jpg', '/work/jon/ops-19.jpg', '/work/jon/ops-20.jpg', '/work/jon/ops-21.jpg', '/work/jon/ops-22.jpg', '/work/jon/ops-23.jpg', '/work/jon/ops-24.jpg',
              ],
            },
            {
              key: 'banner', label: 'banner设计', en: 'Banner',
              desc: '首页头图 / 品类专区 / 常态促销',
              layout: 'banner',
              note: '一些网站的 BANNER 设计。动图 banner 基本集中在黑五较多——想要更加吸引注意，节日促销氛围更浓郁；有些 banner 是结合在一起为一组在首页轮播的。黑五期间我们一个星期换 2 套 banner，是真的做了挺多的。',
              images: [
                '/work/jon/banner-06.jpg',
                '/work/jon/banner-02.jpg', '/work/jon/banner-03.jpg', '/work/jon/banner-04.jpg', '/work/jon/banner-05.jpg',
                '/work/jon/banner-07.jpg', '/work/jon/banner-08.jpg',
                { gif: '/work/jon/banner-gif-09.gif' },
                { gif: '/work/jon/banner-gif-10.gif' },
                { gif: '/work/jon/banner-gif-11.gif' },
                { gif: '/work/jon/banner-gif-12.gif' },
                { video: '/work/jon/banner-gif-13.mp4', poster: '/work/jon/banner-gif-13.jpg', loop: true },
                { gif: '/work/jon/banner-gif-14.gif' },
                { video: '/work/jon/banner-gif-15.mp4', poster: '/work/jon/banner-gif-15.jpg', loop: true },
                { video: '/work/jon/banner-gif-16.mp4', poster: '/work/jon/banner-gif-16.jpg', loop: true },
                { gif: '/work/jon/banner-gif-17.gif' },
                { gif: '/work/jon/banner-gif-18.gif' },
                { gif: '/work/jon/banner-gif-19.gif' },
                { gif: '/work/jon/banner-gif-20.gif' },
                { gif: '/work/jon/banner-gif-21.gif' },
                { video: '/work/jon/banner-gif-22.mp4', poster: '/work/jon/banner-gif-22.jpg', loop: true },
                { video: '/work/jon/banner-gif-23.mp4', poster: '/work/jon/banner-gif-23.jpg', loop: true },
                { video: '/work/jon/banner-gif-24.mp4', poster: '/work/jon/banner-gif-24.jpg', loop: true },
                { video: '/work/jon/banner-gif-25.mp4', poster: '/work/jon/banner-gif-25.jpg', loop: true },
                '/work/jon/banner-26.jpg', '/work/jon/banner-27.jpg', '/work/jon/banner-28.jpg', '/work/jon/banner-29.jpg',
                '/work/jon/banner-30.jpg', '/work/jon/banner-31.jpg', '/work/jon/banner-32.jpg', '/work/jon/banner-33.jpg',
              ],
            },
            {
              key: 'campaign', label: '活动设计', en: 'Campaign',
              desc: 'Summer Sale / 会员日 / 大促社媒',
              note: '本次活动设计的概念主题以 “阳光”“旅行”“沙滩”“年轻活力” 为主题，结合微可爱圆润的线条，不做复杂的设计，将铺面而来的夏日活力与沙滩融入到主视觉的设计中。其中 “花朵” 设计寓意 “象征生活中微小但值得珍惜的幸福”，将祝福藏在了花朵的设计中。',
              images: ['/work/jon/campaign-1.jpg', '/work/jon/campaign-2.jpg', '/work/jon/campaign-3.jpg', '/work/jon/campaign-4.jpg', '/work/jon/campaign-5.jpg', '/work/jon/campaign-6.jpg', '/work/jon/campaign-7.jpg', '/work/jon/campaign-8.jpg', '/work/jon/campaign-9.jpg'],
            },
            {
              key: 'packaging', label: '包材设计', en: 'Packaging',
              desc: '礼盒 / 卡片包材 / 刀版结构',
              layout: 'flow',
              note: '设计说明\n为契合品牌环保与可持续发展理念，增强用户印象，增加品牌记忆点 "让包装成为你生活的第一个礼物"\n"我们递出的不仅是商品，更是可延续的体验"\n实现「可持续惊喜」开箱哲学：每个折痕都是精心设计的收纳动线，拆完快递，收获一件定制版家居艺术品。\n环保价值点："0 废弃开箱体验：所有包装元素都预装了第二次生命"\n专为品牌设计了 2 款快递盒，最后可通过简单的手工变成收纳盒，可以在 JUST 1 NAME 社媒帐号上看到快递盒的实际应用与效果。',
              images: [
                { wide: '/work/jon/pack-1.jpg' },
                {
                  duo: [
                    {
                      note: '飞机盒收纳盒\n只需 6 步就可以把快递盒变成一个收纳盒啦，契合品牌调性与理念并加深品牌印象增强消费者与品牌的交互。\n资源再利用：延长纸盒的使用寿命，减少一次性包装的丢弃，降低垃圾量。\n手工乐趣：通过剪裁，拼接的方式，提升动手能力和创造力。',
                      img: '/work/jon/pack-2.jpg',
                    },
                    {
                      note: '快递盒收纳盒\n尺寸多样：快递盒大小不一，可分类收纳不同物品（如小件文具、化妆品、数据线等。\n增强互动：传递品牌环保理念。\n重量轻：纸盒便于移动和调整位置，尤其适合收纳轻量物品。\n可替换性强：损坏后容易更换，无负担。',
                      img: '/work/jon/pack-3.jpg',
                    },
                  ],
                },
              ],
            },
            {
              key: 'product', label: '产品设计', en: 'Product',
              desc: '行李箱 / 手机壳 / The Explorer / 北极熊 / 东北大花',
              bare: true,
              layout: 'flow',
              note: '产品开模·设计说明：小蛮腰 —— 极简美学与结构创新的融合\n灵感溯源\n以广州塔标志性的 "螺旋扭转" 形态为灵感原点，提炼其富有张力的曲线语言，转化为产品设计中的轻量化螺旋腰线。通过几何重构，将建筑的恢宏尺度凝练为符合人体工学的精致细节，实现建筑美学与实用功能的共生。\n核心设计策略\n线条间距依人体黄金比例收放，形成视觉上的 "呼吸感" 收缩。极简生物形态架构主体轮廓借鉴水滴型拓扑结构，既还原女性腰线的纤薄意象，又优化握持舒适性。实现 "一眼可辨" 的符号化设计，同时以模块化结构确保量产可行性，达成艺术性与工程性的精准平衡。',
              images: [
                { wide: '/work/jon/product-mold-full.jpg' },
                { note: '图案设计·设计说明\n来到 JUST ONE NAME 第一次接触手机壳这个品类，经过工作期间也学习到了不少东西，不得不感叹时间过的真快啊。产品开发时画了不少图，有的打完样后没有做大货，（IMD 工艺）有的没拍照，就各放一些吧' },
                { wide: '/work/jon/product-patterns.jpg' },
              ],
            },
          ],
        },
      },
      {
        id: '02',
        title: '圣诞 AI 广告战役',
        subtitle: 'AI 批量生产 + 人工终审 + 数据迭代的三轮驱动',
        year: '2025 · 15 天',
        role: '品牌视觉负责人',
        scope: '独立站 + 效果广告 · 7 国市场',
        tags: ['AI Generation', 'Performance Ad', '7 Markets'],
        metrics: [
          { n: '7.45%', k: '点击率 CTR', s: '行业 2-3% 的 2.5-3.7x' },
          { n: '$0.15', k: '单次点击 CPC', s: '行业 $0.30-$1.50' },
          { n: '327', k: '有效订单数', s: '15 天投放周期' },
        ],
        image: '/work/p2.jpg',
        video: '/work/p2.mp4',
        videoWebm: '/work/p2.webm',
        poster: '/work/p2-poster.jpg',
        portrait: true,
        tone: 'b',
        /* 项目详情浮层：圣诞 AI 广告战役完整案例（8 大板块 · 原生排版） */
        detail: {
          intro: '为 KettenMachen 个性化珠宝品牌的 7 国独立站，在圣诞营销节点设计并投放的 AI 驱动效果广告战役——AI 批量生产 + 人工终审 + 数据迭代的三轮驱动。',
          categories: [
            {
              key: 'overview', label: '项目概览', en: 'Overview',
              desc: '为 KettenMachen 个性化珠宝品牌的 7 国独立站，在圣诞营销节点设计并投放的 AI 驱动效果广告战役。',
              blocks: [
                {
                  t: 'facts',
                  items: [
                    { k: 'Brand', kb: '品牌', v: 'KettenMachen', sub: '个性化定制珠宝' },
                    { k: 'Role', kb: '角色', v: '品牌视觉负责人', sub: 'Brand Visual Lead' },
                    { k: 'Scope', kb: '范围', v: '独立站 + 效果广告', sub: '7 国市场' },
                    { k: 'Duration', kb: '周期', v: '15 天', sub: '2025.10 投放' },
                  ],
                },
              ],
            },
            {
              key: 'challenge', label: '背景挑战', en: 'Challenge',
              desc: '圣诞季是珠宝品类最大的送礼转化窗口，但市场差异化审美与素材产能瓶颈是核心挑战。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '业务挑战', tone: 'teal', icon: '!',
                      bullets: [
                        '圣诞季是珠宝品类年度最大转化窗口，需在 15 天内快速产出市场投放素材',
                        '传统设计产能无法支撑差异化需求',
                        '独立站 + 效果广告双渠道投放，素材需同时满足品牌调性与投放转化率',
                        '产品为个性化定制吊坠（支持刻字如 “Grandma”），需在广告中具象化 “送礼” 概念',
                      ],
                    },
                    {
                      title: '设计挑战', tone: 'gold', icon: '?',
                      bullets: [
                        '如何在 15 天内为 7 国市场批量产出高质量、差异化但品牌统一的广告素材',
                        '如何用 AI 生成保证金属质感、清晰度与人脸自然度的同时维持产出效率',
                        '如何在 14 秒竖版视频中完成 “场景共情 → 产品揭示 → 情感升华 → 品牌收束” 的完整叙事',
                        '如何将验证有效的方法论沉淀为可复用 SOP，赋能平面部门跨部门复用',
                      ],
                    },
                  ],
                },
              ],
            },
            {
              key: 'strategy', label: '设计策略', en: 'Strategy', bigDesc: true,
              desc: '以 “AI 批量生产 + 人工终审 + 数据迭代” 三轮驱动为核心方法论，将品牌情感定位转化为可批量产出的视觉系统。',
              blocks: [
                { t: 'chips', hero: true, items: ['场景共情', 'AI 批量生成', '5 维质检终审', '数据驱动迭代', '7 国本地化', 'SOP 沉淀'] },
                {
                  t: 'steps', cols: 3, hero: true,
                  items: [
                    {
                      n: '01', title: '情感先行 · 场景共情',
                      desc: '以圣诞家庭场景（壁炉、圣诞树、礼物、童真女孩）为开场，唤起目标用户 “善交重情者”（Y 世代女性）的节日送礼情感需求，再通过产品揭示将 “送礼” 概念具象化为个性化定制吊坠。',
                    },
                    {
                      n: '02', title: 'AI 驱动 · 批量产出',
                      desc: '搭建覆盖豆包图片 / 视频、即梦视频的标准化 AI 提示词库，按 7 国市场审美偏好批量生成差异化素材，15 天内完成传统流程需数周才能产出的素材量级，支撑 7 国同步投放。',
                    },
                    {
                      n: '03', title: '数据迭代 · SOP 复用',
                      desc: '投放后以 CTR、CPC 为核心指标快速迭代素材模板，将验证有效的提示词库、终审标准与 SOP 向平面部门共享输出，实现跨部门设计能力赋能与素材横向复用。',
                    },
                  ],
                },
              ],
            },
            {
              key: 'video', label: '创意执行', en: 'Video',
              desc: '14 秒竖版投放视频采用四段式叙事结构，从情感共鸣到品牌收束，驱动用户完成从共情到购买的完整转化路径。',
              blocks: [
                { t: 'video', src: '/work/p2.mp4', webm: '/work/p2.webm', poster: '/work/p2-poster.jpg' },
                {
                  t: 'timeline',
                  items: [
                    {
                      time: '0-3s', role: '场景共情',
                      shot: { tone: 'ember', lines: ['圣诞场景', '壁炉 / 圣诞树', '女孩 / 童真 / 礼物'] },
                      effects: ['圣诞家庭场景唤起节日送礼情感需求'],
                    },
                    {
                      time: '3-6s', role: '价值具象',
                      shot: { tone: 'teal', lines: ['产品揭示', '礼盒', '“Grandma” 刻吊坠'] },
                      effects: ['个性化刻字吊坠将 “送礼” 概念具象化'],
                    },
                    {
                      time: '6-9s', role: '情感连接',
                      shot: { tone: 'indigo', lines: ['情感升华', '佩戴者 / 微笑 / 回忆'] },
                      effects: ['佩戴者微笑强化', '情感连接触发购买'],
                    },
                    {
                      time: '9-12s', role: '产品交付',
                      shot: { tone: 'paper', lines: ['产品规范', '白底 / 展示', '细节 / 特写'] },
                      effects: ['白底规范展示', '消除购买疑虑'],
                    },
                    {
                      time: '12-14s', role: '品牌心智',
                      shot: { tone: 'deep', lines: ['品牌收束', 'KettenMachen', 'slogan / 品牌承诺'] },
                      effects: ['品牌 Slogan 收束', '强化品牌记忆'],
                    },
                  ],
                },
                {
                  t: 'group', title: '叙事逻辑流程',
                  blocks: [{ t: 'flow', items: ['圣诞场景共情', '产品价值具象', '情感连接升华', '品牌 Slogan 收束'] }],
                },
              ],
            },
            {
              key: 'workflow', label: 'AI 工作流', en: 'Workflow',
              desc: '从需求输入到 SOP 沉淀的 6 步完整工作流，实现 “AI 量产 + 人工质检 + 数据迭代” 的闭环生产体系。',
              blocks: [
                {
                  t: 'steps', cols: 3, badge: true,
                  items: [
                    { n: '1', title: '需求输入', desc: '整合产品卖点、用户痛点、品牌视觉规范与投放部门需求，明确创意方向与素材规格。' },
                    { n: '2', title: '脚本设计', desc: '设计视频脚本与叙事结构（四段式），明确每帧场景、产品、情感与品牌元素的编排逻辑。' },
                    { n: '3', title: 'AI 生成', desc: '调用标准化提示词库（豆包图片 / 视频、即梦视频），按市场审美批量生成差异化素材。' },
                    { n: '4', title: '人工终审', desc: '按 5 维标准（角度 / 金属质感 / 清晰度 / 脏污 / 人脸变形）逐一质检，输出 “AI 口令调整 + PS 后处理” 分层修改方案。' },
                    { n: '5', title: '剪辑交付', desc: '按脚本编排剪辑成片，同步交付投放部门进行 A/B 测试，收集 CTR、CPC 等核心数据反馈。' },
                    { n: '6', title: 'SOP 沉淀', desc: '将验证有效的提示词、终审标准与工作流输出为 SOP，向平面部门共享生成口令，实现跨部门能力赋能。' },
                  ],
                },
                {
                  t: 'group', title: 'AI 生成图 5 维终审标准',
                  blocks: [
                    {
                      t: 'cards', cols: 5,
                      items: [
                        { title: '角度', icon: '⊿', desc: '产品展示角度是否符合规范' },
                        { title: '金属质感', icon: '◆', desc: '银 / 金质感是否真实还原' },
                        { title: '清晰度', icon: '◎', desc: '产品细节是否足够清晰' },
                        { title: '脏污', icon: '⊘', desc: '是否有 AI 生成伪影 / 脏污' },
                        { title: '人脸变形', icon: '☺', desc: '人物面部是否自然无变形' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              key: 'data', label: '数据成果', en: 'Results',
              desc: '15 天投放周期核心指标全面优于行业基准，CPA 低至 $1.83（珠宝类目均值 $15-$50），验证 AI 驱动效果广告的高投产能力。',
              blocks: [
                {
                  t: 'metrics',
                  items: [
                    { n: '7.45%', k: '点击率 CTR', tone: 'gold', s: '▲ 行业 2-3% 的 2.5-3.7 倍', dir: 'up' },
                    { n: '$0.15', k: '单次点击成本 CPC', tone: 'teal', s: '▼ 行业均值 $0.30-$1.50', dir: 'up' },
                    { n: '327', k: '有效订单数', tone: 'green', s: '点击到订单转化率约 8.2%', dir: 'up' },
                  ],
                },
                {
                  t: 'table',
                  title: '完整投放数据与推算指标',
                  lastGood: true,
                  head: ['指标', '数值', '行业基准', '表现'],
                  rows: [
                    ['曝光量', '53,546', '—', '15 天投放周期'],
                    ['点击率 CTR', '7.45%', '2-3%', '提升 2.5-3.7x'],
                    ['CPC 单次点击成本', '$0.15', '$0.30-$1.50', '降低 50%-90%'],
                    ['点击量（推算）', '≈3,989', '—', '曝光 × CTR'],
                    ['加购次数', '1,128', '—', '加购率约 28.3%'],
                    ['有效订单', '327', '—', '转化率约 8.2%'],
                    ['CPA 单订单获客成本（推算）', '≈$1.83', '$15-$50', '降低 88%-96%'],
                  ],
                },
              ],
            },
            {
              key: 'deliver', label: '交付与沉淀', en: 'Assets',
              desc: '项目产出不止于投放素材，更沉淀为可复用的方法论体系，实现跨部门赋能与持续提效。',
              blocks: [
                {
                  t: 'cards', cols: 2,
                  items: [
                    { title: '投放视频素材', icon: '▶', desc: '14 秒竖版投放视频，四段式叙事结构，覆盖 7 国市场本地化版本，15 天投放周期内持续迭代优化。' },
                    { title: 'AI 提示词库', icon: '✎', desc: '覆盖豆包图片 / 视频、即梦视频的标准化出图口令库，沉淀要素提炼、数量控制、上下文管理等口令要领。' },
                    { title: '5 维终审标准', icon: '✓', desc: '针对角度 / 金属质感 / 清晰度 / 脏污 / 人脸变形的质检规范，配套 “AI 口令调整 + PS 后处理” 分层修改方案。' },
                    { title: '工作流 SOP', icon: '⟳', desc: '6 步完整工作流标准化文档（需求 → 脚本 → AI 生成 → 终审 → 剪辑 → SOP 沉淀），向平面部门共享，实现跨部门赋能。' },
                    { title: '可复用设计模板', icon: '▤', desc: '分品类、分节点的可复制设计模板库，已横向复用于返校季等其他节日营销节点，缩短大促素材产出周期。' },
                    { title: '数据验证报告', icon: '◫', desc: '15 天投放完整数据链路（曝光 → 点击 → 加购 → 订单）+ 推算指标（CPA / 加购率 / 转化率）+ 行业基准对比分析。' },
                  ],
                },
              ],
            },
            {
              key: 'retro', label: '项目复盘', en: 'Retro',
              desc: '客观总结成功经验与优化方向，体现对数据的深度理解而非仅报喜。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '成功经验', tone: 'green', icon: '✓', titleColor: 'green',
                      bullets: [
                        'AI 批量生成 + 人工终审的工作流在 15 天内完成了传统流程数周的工作量，验证了三轮驱动方法论的有效性',
                        '四段式叙事结构（场景共情 → 产品具象 → 情感升华 → 品牌收束）有效驱动用户转化路径，CTR 达行业 2.5-3.7 倍',
                        'CPA 低至 $1.83（珠宝类目均值 $15-$50），证明 AI 素材在控制成本的同时维持了转化质量',
                        'SOP 与提示词库已横向复用于返校季等节点，验证了方法论的可迁移性',
                      ],
                    },
                    {
                      title: '优化方向', tone: 'gold', icon: '→', titleColor: 'gold',
                      bullets: [
                        '加购到订单转化率约 29%（约 70% 弃购率），下一步将优化购物车流程、引入弃购挽回策略',
                        '7 国市场本地化目前以视觉微调为主，后续可深化语言、文化符号层面的差异化',
                        'AI 终审标准可进一步量化为评分系统，减少主观判断，提升终审效率',
                        '可将数据看板从投放后分析升级为投放中实时监控，缩短迭代周期',
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: '03',
        title: '2026 返校季',
        subtitle: '亚马逊视觉再设计 · 不换产品换视觉打造 TOP1 爆款',
        year: '2026',
        role: '品牌视觉负责人',
        scope: '主图 / 副图 / A+ 页面 · 21 款 SPU',
        tags: ['Amazon', 'Main Image', 'A+ Page'],
        metrics: [
          { n: '74%', k: '单款销量占比' },
          { n: '738', k: '该款销量（件）· TOP1' },
        ],
        image: '/work/p3.jpg',
        tone: 'c',
        detail: {
          intro:
            '亚马逊返校季大促 · 不开发新品，用视觉重构盘活现有书包库存 —— 单款销量占项目 21 款 SPU 总销量的 74%',
          categories: [
            /* ---------- 01 项目概览（PDF p2 + 封面数据卡） ---------- */
            {
              key: 'overview', label: '项目概览', en: 'Overview',
              desc: '亚马逊返校季大促中，基于现有书包库存进行视觉再设计，通过图案创新与场景重构将滞销库存品转变为当季热销，验证 “视觉盘活存量” 的商业价值。',
              blocks: [
                {
                  t: 'facts',
                  items: [
                    { k: 'Channel', kb: '渠道', v: 'Amazon 亚马逊', sub: 'Product Listing' },
                    { k: 'Product', kb: '产品', v: '学生书包（现有库存）', sub: 'Existing Backpack Inventory' },
                    { k: 'Role', kb: '角色', v: '全案视觉设计（独立）', sub: 'Independent Visual Design' },
                    { k: 'Outcome', kb: '成果', v: '738 件 / 占比 74%', sub: '1 SPU of 21' },
                  ],
                },
                {
                  t: 'metrics',
                  cols: 4,
                  items: [
                    { n: '738件', k: '单品销量', tone: 'gold', s: '独立负责全案视觉' },
                    { n: '74%', k: '占项目总销量比', tone: 'green', s: '1 款 / 21 款 SPU' },
                    { n: '1001件', k: '项目总销量', tone: 'gold', s: '21 款 SPU 合计' },
                    { n: '≈56x', k: '超其余 SPU 均值倍数', tone: 'green', s: '738 ÷ 13.2 件/款' },
                  ],
                },
              ],
            },

            /* ---------- 02 项目背景（PDF p3） ---------- */
            {
              key: 'background', label: '项目背景', en: 'Background',
              desc: '返校季是亚马逊箱包品类年度核心大促节点。项目并非开发新品，而是用视觉重构让现有库存书包在大促中重新具备竞争力。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '库存困境', tone: 'ember', icon: '!',
                      bullets: [
                        '现有书包为库存品，产品本身已有但市场表现平淡，存在滞销风险',
                        '返校季大促窗口期有限，无法等待新品开发，必须在现有库存基础上做视觉突围',
                        '亚马逊同类目竞品密集，库存品原有视觉在同质化搜索结果中缺乏吸引力',
                        '项目共上线 21 款 SPU，需要在大促节点中让目标款脱颖而出',
                      ],
                    },
                    {
                      title: '设计命题', tone: 'gold', icon: '?',
                      bullets: [
                        '产品不变，仅靠视觉重构能否让库存品变身当季热销？',
                        '如何让旧库存的视觉呈现产生 “新品感”，重新抓住用户注意力？',
                        '如何从图案、场景、卖点三个维度全面重构，而非仅优化排版？',
                        '如何将视觉差异化直接转化为搜索点击率和详情页转化率的提升？',
                      ],
                    },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '核心命题',
                  blocks: [
                    {
                      t: 'lead',
                      text: '这是一个 “不开发新产品，用设计盘活旧库存” 的项目。产品本身（书包）没有任何变化，变化的是用户看到它的方式 —— 从图案到场景到卖点的全维度视觉重构，让同一款库存品在返校季大促中呈现出全新的市场竞争力。',
                      hl: ['不开发新产品，用设计盘活旧库存', '变化的是用户看到它的方式'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 03 盘活链路（PDF p4） ---------- */
            {
              key: 'chain', label: '盘活链路', en: 'Transformation',
              desc: '从 “库存滞销” 到 “当季热销”，4 个阶段完成视觉驱动的存量盘活闭环。',
              blocks: [
                {
                  t: 'chain',
                  items: [
                    { tone: 'red', icon: '▣', title: '库存滞销', lines: ['现有书包库存', '原有视觉表现平淡', '市场竞争力不足'] },
                    { tone: 'ember', icon: '◎', title: '视觉诊断', lines: ['分析原有视觉短板', '定位差异化机会', '提炼卖点与场景'] },
                    { tone: 'gold', icon: '◨', title: '视觉重构', lines: ['图案原创设计', '场景化卖点呈现', '主副图体系重构'] },
                    { tone: 'green', icon: '↗', title: '当季热销', lines: ['738 件销量', '占项目 74%', '超均值 56 倍'] },
                  ],
                },
              ],
            },

            /* ---------- 04 改版前后对比（PDF p5 / p6 / p7） ---------- */
            {
              key: 'compare', label: '改版前后对比', en: 'Before & After',
              desc: '同一款库存品，改版前后的视觉呈现产生质的飞跃 —— 图案、场景、卖点三个维度的逐项对照。',
              blocks: [
                {
                  t: 'compare', icon: '◧', title: '主视觉改版对比',
                  before: {
                    tag: '改版前', en: 'BEFORE', img: '/work/hx/before-main.jpg',
                    caption: '原有库存品主图 · 纯色无图案',
                    label: '问题：',
                    text: '产品图视觉平淡，缺乏场景化表达，在亚马逊搜索结果中与大量同类竞品高度同质化，难以形成点击吸引力。图案无差异化记忆点，卖点呈现依赖文字堆砌，用户浏览效率低。',
                  },
                  after: {
                    tag: '改版后', en: 'AFTER', img: '/work/hx/after-main.jpg',
                    caption: '视觉重构后的主图 · 原创图案 + 场景化呈现',
                    label: '改变：',
                    text: '原创图案赋予产品独特视觉记忆点，场景化呈现让用户一眼感知使用价值。主图通过角度与光影优化提升产品质感，在搜索结果页形成差异化视觉锚点，驱动点击率提升。',
                  },
                },
                {
                  t: 'compare', icon: '◨', title: '场景化卖点改版对比',
                  before: {
                    tag: '改版前', en: 'BEFORE', img: '/work/hx/before-scene.jpg',
                    caption: '原有卖点呈现 · 白底平铺 + 文字罗列',
                    label: '问题：',
                    text: '卖点以纯产品平铺图 + 文字罗列方式呈现，缺乏使用场景代入感。用户无法快速理解 “这款书包适合什么场景、能解决什么问题”，决策成本高。',
                  },
                  after: {
                    tag: '改版后', en: 'AFTER', img: '/work/hx/after-scene.jpg', tall: true,
                    caption: '场景化卖点呈现 · 真实使用场景',
                    label: '改变：',
                    text: '每个核心卖点（容量 / 分区 / 材质 / 舒适度）配以真实使用场景图，用户浏览时即完成 “看见 → 理解 → 需要” 的认知链路。场景化呈现降低了购买决策门槛，加速转化。',
                  },
                },
                {
                  t: 'compare', icon: '◫', title: '图案设计改版对比',
                  before: {
                    tag: '改版前', en: 'BEFORE',
                    /* 单张展示：15 款同类目在售产品，各自独立成图；框内滑动查看全部 */
                    scroll: true,
                    items: [
                      '/work/hx/pattern/b-01.jpg', '/work/hx/pattern/b-02.jpg', '/work/hx/pattern/b-03.jpg',
                      '/work/hx/pattern/b-04.jpg', '/work/hx/pattern/b-05.jpg', '/work/hx/pattern/b-06.jpg',
                      '/work/hx/pattern/b-07.jpg', '/work/hx/pattern/b-08.jpg', '/work/hx/pattern/b-09.jpg',
                      '/work/hx/pattern/b-10.jpg', '/work/hx/pattern/b-11.jpg', '/work/hx/pattern/b-12.jpg',
                      '/work/hx/pattern/b-13.jpg', '/work/hx/pattern/b-14.jpg', '/work/hx/pattern/b-15.jpg',
                    ],
                    caption: '同类目在售产品 · 纯色与通用图案 · 框内上下滑动查看全部 15 款',
                    label: '问题：',
                    text: '原有产品使用纯色或通用图案，在亚马逊搜索结果页缺乏视觉记忆点。同类目竞品也大量使用类似方案，产品辨识度为零，用户扫过即忘。',
                  },
                  after: {
                    tag: '改版后', en: 'AFTER',
                    /* 单张展示：4 款原创图案产品 + 1 张定制选项表 */
                    items: [
                      '/work/hx/pattern/a-01.jpg', '/work/hx/pattern/a-02.jpg', '/work/hx/pattern/a-03.jpg',
                      '/work/hx/pattern/a-04.jpg', '/work/hx/pattern/a-05.jpg',
                    ],
                    caption: '原创图案设计稿 · 校园活力 + 潮流视觉语言',
                    label: '改变：',
                    text: '针对返校季目标用户（学生群体）设计原创图案，融合校园活力与潮流视觉语言。图案让产品从 “功能配件” 升级为 “个性表达”，在搜索结果页形成独特视觉记忆点，驱动点击。',
                  },
                },
              ],
            },

            /* ---------- 05 设计策略（PDF p8） ---------- */
            {
              key: 'strategy', label: '设计策略', en: 'Strategy', bigDesc: true,
              desc: '不局限于排版优化，而是从图案创新、场景重塑、卖点重构三个维度全面重构，让库存品产生 “新品感”。',
              blocks: [
                { t: 'chips', hero: true, items: ['图案原创', '场景化', '卖点重构', '视觉记忆点', '差异化竞争', '库存盘活'] },
                {
                  t: 'steps', cols: 3, hero: true,
                  items: [
                    {
                      n: '01', title: '图案创新 · 视觉记忆点',
                      desc: '为库存书包设计原创图案，从 “纯色 / 通用” 升级为 “有辨识度的个性表达”。图案融合校园生活元素与潮流视觉语言，让产品在搜索结果页形成独特视觉锚点，用户扫过即有记忆。',
                    },
                    {
                      n: '02', title: '场景重塑 · 使用代入感',
                      desc: '将产品从 “白底平铺图” 升级为 “场景使用图”。每个核心卖点配以真实使用场景（校园 / 通勤 / 旅行），用户浏览时即完成 “看见 → 理解 → 需要” 的认知链路，降低决策门槛。',
                    },
                    {
                      n: '03', title: '卖点重构 · 信息高效化',
                      desc: '从 “文字罗列卖点” 升级为 “视觉化呈现卖点”。容量 / 分区 / 材质 / 舒适度等核心卖点通过对比图、标注图、场景图等方式直观呈现，遵循用户浏览路径递进排列，降低决策成本。',
                    },
                  ],
                },
              ],
            },

            /* ---------- 06 数据成果（PDF p9 / p10） ---------- */
            {
              key: 'data', label: '数据成果', en: 'Results',
              desc: '项目共上线 21 款 SPU，总销量 1001 件。独立负责全案视觉设计的 1 款 SPU 最终销量 738 件，单款占项目总销量 74%，约为其余 SPU 均值的 56 倍 —— 产品不变，视觉改变了一切。',
              blocks: [
                {
                  t: 'metrics',
                  items: [
                    { n: '738件', k: '单品销量（独立负责）', tone: 'gold', s: '全案视觉重构' },
                    { n: '1001件', k: '项目总销量（21 款 SPU）', tone: 'teal', s: '返校季档期' },
                    { n: '74%', k: '单款销量占比', tone: 'green', s: '▲ 1/21 贡献 74% 销量' },
                  ],
                },
                {
                  t: 'table',
                  title: 'SPU 销量分布',
                  head: ['维度', '数值', '说明', '表现'],
                  lastGood: true,
                  rows: [
                    ['项目 SPU 总数', '21 款', '返校季上线 SPU', '—'],
                    ['项目总销量', '1001 件', '21 款 SPU 合计', '—'],
                    ['我的 SPU 销量', '738 件', '独立全案视觉的 1 款', '占总销量 74%'],
                    ['其余 20 款 SPU 合计', '263 件', '平均 13.2 件 / 款', '占 26%'],
                    ['单款超均值倍数', '≈56x', '738 ÷ 13.2 件 / 款', '视觉驱动销量'],
                  ],
                },
                {
                  t: 'bars', title: '销量占比可视化',
                  items: [
                    { label: '我的 SPU', pct: 74, text: '738 件 · 74%', tone: 'gold', total: '738 件' },
                    { label: '其余 20 款', pct: 26, text: '263 件 · 26%', tone: 'teal', total: '263 件' },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '关键洞察',
                  blocks: [
                    {
                      t: 'lead',
                      text: '21 款 SPU 的产品本身差异不大（均为库存书包），但 1 款贡献了 74% 的销量，唯一的变量是视觉。这组数据直接证明了：在产品不变的前提下，视觉重构是库存盘活的决定性因素。738 ÷ 13.2 ≈ 56 倍 的销量差距，是设计差异化商业杠杆效应的最直观体现。',
                      hl: ['1 款贡献了 74% 的销量', '唯一的变量是视觉', '738 ÷ 13.2 ≈ 56 倍'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 07 交付物（PDF p11） ---------- */
            {
              key: 'deliver', label: '交付物', en: 'Deliverables',
              desc: '项目交付覆盖从图案设计到产品图包的全链路视觉资产，详情页设计仅为图包内容的一部分。',
              blocks: [
                {
                  t: 'cards', cols: 2,
                  items: [
                    { title: '原创图案设计', icon: '✎', accent: true, desc: '为库存书包设计的原创图案，融合校园活力与潮流视觉，使产品形成独特视觉记忆点，是本次盘活的核心差异化要素。' },
                    { title: '场景化产品图包', icon: '▤', accent: true, desc: '含主图（白底规范）+ 副图（场景 / 功能 / 材质 / 尺寸 / 生活方式）的完整图包，场景化呈现让用户快速理解产品价值，降低决策成本。' },
                    { title: '详情页视觉设计', icon: '◫', accent: true, desc: '亚马逊 A+ 页面全案设计，含品牌叙事 / 场景大图 / 卖点对比 / 细节放大等模块，是图包内容在详情页的落地呈现。' },
                    { title: 'ERP 数据验证', icon: '▦', accent: true, desc: '返校季档期 ERP 系统录屏数据，21 款 SPU 销量明细，客观验证视觉重构对库存盘活的商业转化效果。' },
                  ],
                },
              ],
            },

            /* ---------- 08 项目复盘（PDF p12） ---------- */
            {
              key: 'retro', label: '项目复盘', en: 'Retrospective',
              desc: '客观总结成功经验与可优化方向，体现对 “设计驱动商业价值” 的深度思考。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '成功经验', tone: 'green', icon: '✓', titleColor: 'green',
                      bullets: [
                        '产品不变，仅靠三维视觉重构（图案 + 场景 + 卖点）实现单款销量占项目 74%，验证 “视觉盘活存量” 策略的有效性',
                        '原创图案是核心差异化杠杆 —— 同类目竞品多用纯色 / 通用图案，原创图案让库存品在搜索结果页形成视觉记忆点',
                        '场景化卖点呈现替代文字罗列，降低了用户决策成本，加速了 “看见 → 理解 → 需要 → 购买” 的认知链路',
                        '1/21 的资源投入产出 74% 的销量，证明设计差异化在存量竞争中具有极高商业杠杆效应',
                      ],
                    },
                    {
                      title: '优化方向', tone: 'gold', icon: '→', titleColor: 'gold',
                      bullets: [
                        '其余 20 款 SPU 平均销量仅 13.2 件，可将已验证的图案创新 + 场景重构方法论横向复用于更多库存品',
                        '可建立 “库存盘活视觉设计模板库”，将图案创新、场景重塑等策略标准化为可复制流程',
                        '建议引入 A/B 测试机制，对图案方向、场景选择做数据驱动验证，进一步提升视觉 ROI',
                        '可将 “视觉盘活存量” 方法论从返校季延伸至其他大促节点（如黑五、Prime Day），形成跨节点复用体系',
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: '04',
        title: '7 国独立站 · 视觉标准化 SOP',
        subtitle:
          '从零搭建覆盖 7 国独立站全品类产品视觉的标准化输出 SOP，4 大核心模块 + 终审机制，让平面设计部门按标准执行即可实现多站点视觉零偏差与可规模化交付',
        year: '2025 — 2026',
        role: '品牌视觉负责人',
        scope: '首页 / 产品页 / Banner / 包装 / EDM',
        tags: ['SOP', 'Localization', 'Team Management'],
        metrics: [
          { n: '7', k: '覆盖国家站点', s: '英法德意美澳西' },
          { n: '4', k: 'SOP 核心模块', s: '从场景到终审标准' },
        ],
        image: '/work/p4-banner.jpg',
        portrait: true,
        tone: 'd',
        detail: {
          intro:
            '统筹 7 国独立站全品类产品视觉品牌化升级，从零制定完整的视觉输出 SOP 交付平面设计部门执行 —— 覆盖拍摄场景选型、产品图片规范、详情页排版逻辑、设计稿终审标准四大核心模块',
          categories: [
            /* ---------- 01 项目概览（PDF p1 封面数据 + p2） ---------- */
            {
              key: 'overview', label: '项目概览', en: 'Overview',
              desc: '从零建立覆盖 7 国独立站全品类产品视觉的标准化输出 SOP —— 4 大核心模块 + 终审机制，让平面设计部门按标准执行即可实现多站点视觉零偏差与可规模化交付。',
              blocks: [
                {
                  t: 'facts',
                  items: [
                    { k: 'Scope', kb: '范围', v: '7 国独立站 · 全品类', sub: 'UK / FR / DE / IT / US / AU / ES' },
                    { k: 'Role', kb: '角色', v: 'SOP 制定者 + 终审', sub: 'SOP Creator & Quality Lead' },
                    { k: 'Output', kb: '产出', v: '4 大 SOP 模块 + 终审机制', sub: 'Audit System' },
                    { k: 'Execution', kb: '执行', v: '平面设计部门按 SOP 执行', sub: 'Design Team Follows SOP' },
                  ],
                },
                {
                  t: 'metrics',
                  cols: 4,
                  items: [
                    { n: '7', k: '覆盖国家站点', tone: 'gold', s: '英法德意美澳西' },
                    { n: '4', k: 'SOP 核心模块', tone: 'gold', s: '从场景到终审标准' },
                    { n: '0', k: '站点视觉偏差', tone: 'green', s: 'Zero Deviation' },
                    { n: '7', k: '全品类产品线', tone: 'gold', s: 'All Categories' },
                  ],
                },
              ],
            },

            /* ---------- 02 项目背景（PDF p3） ---------- */
            {
              key: 'background', label: '项目背景', en: 'Background',
              desc: '7 国独立站覆盖英 / 法 / 德 / 意 / 美 / 澳 / 西，各站全品类产品视觉长期各自为政，风格碎片化严重，缺乏统一标准，跨部门沟通成本高、返工率居高不下。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '业务困境', tone: 'ember', icon: '!',
                      bullets: [
                        '7 国独立站全品类产品视觉长期各自为政，风格碎片化严重，用户跨站体验割裂',
                        '缺少统一视觉输出标准，不同设计师产出风格不一致，全站视觉调性难以统一',
                        '平面设计部门缺乏可执行的标准文档，每次产出靠口头沟通确认，效率低、返工率高',
                        '7 国市场审美差异大（德区偏音乐运动、法区偏时尚美容、英区偏生活宠物），需平衡品牌一致性与市场适配性',
                      ],
                    },
                    {
                      title: 'SOP 命题', tone: 'gold', icon: '?',
                      bullets: [
                        '如何制定一套 SOP，让平面设计部门按标准执行即可产出视觉零偏差的 7 国素材？',
                        '如何将视觉输出流程标准化为可复制、可培训、可规模化交付的执行文档？',
                        '如何建立终审机制，在标准化输出中保证质量并持续降低返工率？',
                        '如何在 7 国统一标准中保留必要的本地化微调空间？',
                      ],
                    },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '核心命题',
                  blocks: [
                    {
                      t: 'lead',
                      text: '这是一个 “把个人设计能力转化为团队可执行标准” 的体系建设项目。核心不是做一套设计，而是制定一套可执行、可培训、可验收的 SOP 文档 —— 让平面设计部门的任何设计师按照 SOP 执行，都能产出视觉风格零偏差的 7 国站点素材。SOP 由品牌视觉负责人独立制定，交付平面设计部门执行。',
                      hl: ['把个人设计能力转化为团队可执行标准', '可执行、可培训、可验收的 SOP 文档'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 03 SOP 四大核心模块（PDF p4 + p5） ---------- */
            {
              key: 'architecture', label: 'SOP 核心模块', en: 'Architecture',
              desc: '从拍摄场景选型到设计稿终审标准，4 大模块覆盖独立站视觉输出的全链路标准化，每个模块包含子模块、执行规范与成果展示位。SOP 由品牌视觉负责人制定，交付平面设计部门执行。',
              blocks: [
                {
                  t: 'mods', cols: 2,
                  items: [
                    {
                      n: '1', title: '拍摄场景选型', en: 'Scene Selection',
                      desc: '建立 7 国站点的标准化拍摄场景库，按产品品类与使用场景分类，统一场景风格、道具搭配与拍摄角度规范。针对 7 国市场审美差异做场景本地化微调（德区偏音乐运动场景、法区偏时尚美容场景、英区偏生活宠物场景），在统一品牌调性基础上保留市场适配空间。',
                      hl: ['标准化拍摄场景库', '场景本地化微调'],
                      subs: [
                        { title: '场景分类库', desc: '按品类（珠宝 / 配饰 / 箱包等）× 场景（日常 / 节日 / 送礼 / 生活方式）建立标准化场景矩阵' },
                        { title: '7 国本地化适配', desc: '每类场景提供 7 国市场偏好的微调方案，平衡品牌一致性与市场适配性' },
                      ],
                      footer: '成果展示位 · 场景选型规范 / 场景库',
                    },
                    {
                      n: '2', title: '产品图片规范', en: 'Image Standards',
                      desc: '建立全品类产品图片规范，统一产品角度、光影、背景、裁切比例、清晰度等视觉参数，确保 7 国站点产品图风格零偏差。规范覆盖主图（白底规范）、副图（场景 / 功能 / 材质 / 尺寸 / 生活方式）、详情页配图等全触点，形成可执行的参数化标准。',
                      hl: ['可执行的参数化标准'],
                      subs: [
                        { title: '产品拍摄参数表', desc: '角度 / 光影 / 背景 / 裁切 / 分辨率等参数化标准，可量化、可培训、可验收' },
                        { title: '主图 + 副图体系', desc: '主图白底规范 + 副图递进式信息层级，统一 7 国站点产品图浏览逻辑' },
                      ],
                      footer: '成果展示位 · 产品图片规范 / 参数表',
                    },
                  ],
                },
                {
                  t: 'mods', cols: 2,
                  items: [
                    {
                      n: '3', title: '详情页排版逻辑', en: 'Page Layout Logic',
                      desc: '建立独立站详情页的标准化排版逻辑，规定信息模块顺序、图文比例、卖点呈现层次与视觉节奏，确保 7 国站点详情页体验统一。排版逻辑遵循用户浏览路径：首屏抓眼 → 场景代入 → 卖点理解 → 信任强化 → 转化引导，形成从吸引到购买的标准化视觉链路。',
                      hl: ['首屏抓眼 → 场景代入 → 卖点理解 → 信任强化 → 转化引导'],
                      subs: [
                        { title: '模块化排版模板', desc: '品牌叙事 / 场景大图 / 卖点对比 / 细节放大 / 用户场景等标准模块，可自由组合' },
                        { title: '信息层级规范', desc: '标题 / 副标题 / 正文 / 标注的字号层级与间距标准，确保 7 国站点视觉一致性' },
                      ],
                      footer: '成果展示位 · 详情页排版模板 / 规范',
                    },
                    {
                      n: '4', title: '设计稿终审标准', en: 'Design Audit Standards',
                      desc: '建立设计稿终审与反馈机制，由品牌视觉负责人对平面部门按 SOP 产出的设计稿进行质量把控，输出针对性修改方案。终审标准覆盖角度 / 金属质感 / 清晰度 / 脏污 / 人脸变形等维度，输出分层反馈，明确 “该怎么改”，降低沟通成本与返工率。',
                      hl: ['该怎么改'],
                      subs: [
                        { title: '5 维质检标准', desc: '角度 / 金属质感 / 清晰度 / 脏污 / 人脸变形的参数化质检规范' },
                        { title: '分层修改方案', desc: '终审后输出针对性修改方案，明确修改标准与优化方向，降低返工率' },
                      ],
                      footer: '成果展示位 · 终审标准 / 修改方案',
                    },
                  ],
                },
              ],
            },

            /* ---------- 04 终审机制与执行流程（PDF p6） ---------- */
            {
              key: 'quality', label: '终审机制', en: 'Quality',
              desc: 'SOP 不止于输出规范，更建立设计稿终审与反馈机制。平面部门按 SOP 执行产出后，由品牌视觉负责人终审把关，输出针对性修改方案，形成 “执行 → 终审 → 修改 → 通过” 的质量闭环。',
              blocks: [
                {
                  t: 'group', title: '终审流程',
                  blocks: [
                    {
                      t: 'chain',
                      items: [
                        { icon: '✎', title: 'SOP 执行', lines: ['平面设计部门', '按 4 大模块 SOP', '执行产出设计稿'] },
                        { icon: '◎', title: '5 维质检', lines: ['品牌视觉负责人', '按角度 / 质感 / 清晰度', '脏污 / 人脸 5 维质检'] },
                        { icon: '✕', title: '修改方案', lines: ['输出针对性', '修改标准与方案', '明确怎么改'] },
                        { icon: '✓', title: '终审通过', lines: ['质量达标后', '交付 7 国站点', '规模化上线'] },
                      ],
                    },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '终审机制价值',
                  blocks: [
                    {
                      t: 'lead',
                      text: '终审机制不是简单的 “质检通过 / 不通过”，而是输出针对性修改方案 —— 明确告诉设计师该怎么改、改到什么标准。这套机制有效降低了跨部门沟通成本与返工率，让 SOP 从 “规范文档” 升级为可执行的质量保障系统。平面设计部门按 SOP 执行 → 品牌视觉负责人终审把关 → 输出修改方案 → 修改后通过，形成完整的质量闭环。',
                      hl: ['明确告诉设计师该怎么改、改到什么标准', '可执行的质量保障系统'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 05 情人节 7 国示范（PDF p7 - p9） ---------- */
            {
              key: 'demo', label: '情人节 7 国示范', en: 'Demo',
              desc: '以情人节为示范节点，展示 SOP 四大模块如何在 7 国市场中落地执行 —— 同一节日、统一品牌调性、差异化本地化适配，验证 SOP “零偏差 + 可规模化” 的实际效果。每张横幅均为 SOP 标准化产出，点击横幅可切换查看该站点改造前的原 banner 作视觉对比。',
              blocks: [
                {
                  t: 'lead',
                  text: '以下 7 张横幅为 SOP 标准化产出（AFTER）。点击任意一张横幅，即可切换查看该站点改造前的原 banner（BEFORE）—— 同一节日、同一站点，直观对比 SOP 落地前后的视觉差异。',
                  hl: ['点击任意一张横幅', '改造前的原 banner'],
                },
                {
                  t: 'shots',
                  items: [
                    { label: '英国', en: 'UK', img: '/work/sop/demo/uk.jpg', orig: '/work/sop/demo/orig-uk.jpg', tone: 'ember' },
                    { label: '法国', en: 'FR', img: '/work/sop/demo/fr.jpg', orig: '/work/sop/demo/orig-fr.jpg', tone: 'orange' },
                    { label: '德国', en: 'DE', img: '/work/sop/demo/de.jpg', orig: '/work/sop/demo/orig-de.jpg', tone: 'gold' },
                    { label: '意大利', en: 'IT', img: '/work/sop/demo/it.jpg', orig: '/work/sop/demo/orig-it.jpg', tone: 'green' },
                    { label: '美国', en: 'US', img: '/work/sop/demo/us.jpg', orig: '/work/sop/demo/orig-us.jpg', tone: 'indigo' },
                    { label: '澳大利亚', en: 'AU', img: '/work/sop/demo/au.jpg', orig: '/work/sop/demo/orig-au.jpg', tone: 'teal' },
                    { label: '西班牙', en: 'ES', img: '/work/sop/demo/es.jpg', orig: '/work/sop/demo/orig-es.jpg', tone: 'violet' },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '示范价值',
                  blocks: [
                    {
                      t: 'lead',
                      text: '情人节 7 国示范展示了 SOP 的 “统一基准 + 差异化适配” 核心逻辑：产品规范（角度 / 金属质感 / 清晰度 / 5 维质检）7 国零偏差，场景选型与排版逻辑按 7 国独立站偏好做本地化微调。这意味着平面设计部门任何设计师按照这套 SOP 执行，都能在情人节节点同时产出 7 国视觉统一又本地化的素材 —— 这就是 SOP “可规模化交付” 的实际效果。',
                      hl: ['统一基准 + 差异化适配', '可规模化交付'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 06 建设成果（PDF p10） ---------- */
            {
              key: 'results', label: '建设成果', en: 'Results',
              desc: 'SOP 体系建成后，平面设计部门按标准执行即可实现 7 国站点视觉风格零偏差，大幅提升出图效率与素材复用率，有效降低跨部门沟通成本与返工率。',
              blocks: [
                {
                  t: 'metrics',
                  cols: 3,
                  items: [
                    { n: '0', k: '站点视觉偏差', tone: 'gold', s: '7 国统一标准' },
                    { n: '4', k: 'SOP 核心模块', tone: 'gold', s: '从场景到终审' },
                    { n: '↑', k: '出图效率与复用率', tone: 'green', s: '团队效能提升' },
                  ],
                },
                {
                  t: 'table',
                  title: 'SOP 体系核心成果',
                  lastGood: true,
                  numCol: null,
                  head: ['成果维度', 'SOP 前', 'SOP 后', '改善'],
                  rows: [
                    ['站点视觉一致性', '7 国各自为政，风格碎片化', '零偏差', '全站统一'],
                    ['设计输出流程', '无标准、靠经验、不可复制', '4 模块 SOP', '可培训可规模化'],
                    ['部门执行方式', '口头沟通确认、效率低', '按 SOP 执行', '标准化交付'],
                    ['质量把控', '返工率高、沟通成本高', '终审 + 修改方案', '返工率降低'],
                    ['素材复用率', '低、各站独立产出', '跨站复用', '复用率提升'],
                    ['团队出图效率', '效率受限、无法规模化', '可规模化交付', '效率提升'],
                  ],
                },
              ],
            },

            /* ---------- 07 交付物（PDF p11） ---------- */
            {
              key: 'deliver', label: '交付物', en: 'Deliverables',
              desc: '项目交付的是一套可复用的标准化系统资产，交付平面设计部门执行。',
              blocks: [
                {
                  t: 'cards', cols: 2,
                  items: [
                    { icon: '✓', title: '4 大模块 SOP 文档', desc: '拍摄场景选型、产品图片规范、详情页排版逻辑、设计稿终审标准四大核心模块的完整标准化执行文档。' },
                    { icon: '▣', title: '产品拍摄参数表', desc: '全品类产品拍摄的角度 / 光影 / 背景 / 裁切 / 分辨率等参数化标准，可量化、可培训、可验收。' },
                    { icon: '⌾', title: '终审标准与机制', desc: '5 维质检标准（角度 / 金属质感 / 清晰度 / 脏污 / 人脸变形）+ 针对性修改方案输出机制。' },
                    { icon: '◫', title: '可复用设计模板库', desc: '分品类、分渠道的标准化设计模板，平面部门可直接套用产出 7 国站点素材。' },
                    { icon: '▤', title: '7 国本地化适配方案', desc: '统一品牌调性基础上的 7 国审美偏好微调方案，平衡品牌一致性与市场适配性。' },
                    { icon: '✦', title: '培训与赋能文档', desc: 'SOP 培训材料与设计师上手指南，确保平面部门任何成员按 SOP 执行均可产出零偏差素材。' },
                  ],
                },
                {
                  t: 'group', title: '交付范例 · 品类视觉标准化（PART 07）',
                  blocks: [
                    {
                      t: 'lead',
                      text: 'SOP 落地到具体品类的实际交付物 —— 以下为皮带 / 钱包 / 钥匙扣三个品类的视觉标准化文档，覆盖侧边导航、投产款式排序、灰底图 / 礼盒图 / 场景图 / 横特图等图片规范与最终效果参考，点击可直接翻阅完整文档。',
                      hl: ['皮带 / 钱包 / 钥匙扣', '图片规范', '点击可直接翻阅完整文档'],
                    },
                    {
                      t: 'docs',
                      items: [
                        {
                          cover: '/pdf/sop/cover-belt.jpg',
                          pdf: '/pdf/sop/sop-belt.pdf',
                          tag: 'PART 07 · BELT',
                          title: '皮带品类 · 视觉标准化',
                          meta: '6 页 · 侧边导航 / 投产款式排序 / 图组规范 / 最终效果参考',
                        },
                        {
                          cover: '/pdf/sop/cover-wallet.jpg',
                          pdf: '/pdf/sop/sop-wallet.pdf',
                          tag: 'PART 07 · WALLET',
                          title: '钱包品类 · 视觉标准化',
                          meta: '8 页 · 内外里图组 / 礼盒与礼袋 / 场景图 / 最终效果参考',
                        },
                        {
                          cover: '/pdf/sop/cover-keychain.jpg',
                          pdf: '/pdf/sop/sop-keychain.pdf',
                          tag: 'PART 07 · KEYCHAIN',
                          title: '钥匙扣品类 · 视觉标准化',
                          meta: '10 页 · 款式排序 / 图组规范 / 场景与横特图 / 最终效果参考',
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* ---------- 08 项目复盘（PDF p12） ---------- */
            {
              key: 'retro', label: '项目复盘', en: 'Retrospective',
              desc: '客观总结体系建设经验与优化方向，体现对 “设计标准化与规模化” 的深度思考。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '成功经验', tone: 'green', icon: '✓',
                      bullets: [
                        '从零制定 4 大核心 SOP 模块，交付平面设计部门执行，实现 7 国站点视觉风格零偏差，验证 “标准化先行” 的体系建设路径有效性',
                        '将个人设计经验转化为团队可执行标准，让任何设计师按 SOP 执行都能产出风格统一的素材，实现设计能力团队化沉淀',
                        '终审机制的 “针对性修改方案” 设计，将质检从 “通过 / 不通过” 升级为 “该怎么改” 的可执行反馈，大幅降低返工率与沟通成本',
                        '7 国本地化适配方案成功平衡了品牌一致性与市场适配性，证明统一标准不等于一刀切',
                        'SOP 体系实现了从 “靠经验产出” 到 “可培训、可复制、可规模化交付” 的能力升级',
                      ],
                    },
                    {
                      title: '优化方向', tone: 'gold', icon: '→', titleColor: 'gold',
                      bullets: [
                        '可将 SOP 从独立站延伸至亚马逊等更多渠道，建立跨渠道的视觉标准化体系',
                        '终审标准可进一步量化为评分系统，减少主观判断，提升终审效率与一致性',
                        '可建立 SOP 执行的数据看板，量化各站点 SOP 遵循率与素材产出效率',
                        '可将 7 国本地化适配从 “经验微调” 升级为 “用户数据驱动” 的本地化策略',
                        '可建立 SOP 版本迭代机制，随品类扩展与市场变化持续更新标准',
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: '05',
        title: '亚马逊优化',
        subtitle: '9 图标准排列 · 痛点驱动设计 · 9 款产品落地 —— 建立可复制的亚马逊产品视觉规范',
        year: '2026',
        role: '品牌设计主管',
        scope: 'Amazon · 男士手链 / 情感线 / 功能线',
        tags: ['9-Image System', 'A+ Content', 'Data-Driven'],
        metrics: [],
        image: '/work/p5.jpg',
        tone: 'e',
        detail: {
          intro:
            '面向亚马逊男士手链品类的视觉标准化方案 —— 以 9 图标准排列为核心框架、以用户痛点数据为设计依据，输出一套可复制的亚马逊产品视觉规范，并落地 9 款产品的 A+ 页面。',
          categories: [
            /* ---------- 01 项目背景（PDF p3 + p4） ---------- */
            {
              key: 'background', label: '项目背景', en: 'Background',
              desc: '针对亚马逊男士手链品类视觉参差不齐、用户痛点明确但缺乏系统性解决方案的现状，制定一套完整的亚马逊产品视觉优化指导方案 —— 以 9 图标准排列为核心框架，以用户痛点数据为设计依据。',
              blocks: [
                {
                  t: 'specs', cols: 3, hero: true,
                  items: [
                    {
                      n: '27%', title: '材质疑虑差评', tone: 'risk',
                      desc: '“cheaply made” 或材质担忧是常见差评，“Came horribly tarnished” 是古巴链典型差评。',
                    },
                    {
                      n: '35%+', title: '尺寸退货率', tone: 'risk',
                      desc: '尺寸问题是退货主因，缺乏直观尺寸引导导致用户选择困难。',
                    },
                    {
                      n: '73%', title: '好评提及品质',
                      desc: '73% 好评提到 “high-quality material”，五金件是判断品质的第一信号。',
                    },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '核心命题',
                  blocks: [
                    {
                      t: 'lead',
                      text: '亚马逊产品视觉不是「把产品拍好看」，而是用 9 张图片系统性地回答用户所有疑虑 —— 实物是否一致？五金件牢不牢？礼盒体不体面？我戴着好不好看？尺寸合不合适？会不会掉色？每一张图都对应一个用户痛点，每一个设计决策都有数据支撑。',
                      hl: ['用 9 张图片系统性地回答用户所有疑虑', '每一张图都对应一个用户痛点'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 02 交付物（PDF p19） ---------- */
            {
              key: 'deliver', label: '交付物', en: 'Deliverables',
              desc: '6 项交付物，覆盖标准框架、数据映射、落地页面、本地化方案与竞品分析。',
              blocks: [
                {
                  t: 'cards', cols: 2,
                  items: [
                    { icon: '📋', title: '9 图标准排列体系', accent: true, desc: '首图 → 细节 → 礼盒 → 商务模特 → 休闲模特 → 送礼场景 → 尺寸 → 尺寸引导 → 材质认证，完整的 9 图标准框架。' },
                    { icon: '📊', title: '痛点数据映射表', accent: true, desc: '7 大用户痛点 → 数据支撑 → 设计方案 → 对应图片的完整映射，所有设计决策有数据依据。' },
                    { icon: '🖼', title: '9 款产品 A+ 页面', accent: true, desc: '情侣手链 / 婚礼挂坠 / 生日石 / 男士编织 / 男士项链 / 医疗 EN / 医疗 DE / 魅力手链 / 医疗编织。' },
                    { icon: '🌐', title: '多语言本地化方案', accent: true, desc: '英文 / 德文双语言版本，结构统一 + 文案本地化的设计方法论。' },
                    { icon: '🔍', title: '竞品视觉分析报告', accent: true, desc: '高销量品牌的视觉优点拆解，为优化提供参考基准。' },
                    { icon: '📄', title: '设计规范文档', accent: true, desc: '男士手链品类亚马逊视觉优化指导方案，可复用于其他品类。' },
                  ],
                },
                {
                  t: 'docs', cols: 1,
                  items: [
                    {
                      cover: '/pdf/amz/cover-guideline.jpg',
                      pdf: '/pdf/amz/guideline-preview.pdf',
                      file: '/pdf/amz/amazon-visual-guideline.pptx',
                      badge: 'PPTX',
                      tag: 'GUIDELINE · PPTX · 5 SLIDES',
                      title: '亚马逊男士手链视觉指导方案',
                      meta: '5 页 · 视觉指导系统（9 图标准排列）/ 高销量产品视觉优化与痛点解决 / 新 Listing 必须包含的视觉元素 / 页面最终效果参考',
                    },
                  ],
                },
              ],
            },

            /* ---------- 03 痛点-设计映射表（PDF p7） ---------- */
            {
              key: 'mapping', label: '痛点映射', en: 'Mapping',
              desc: '将用户评价中的核心痛点，一一对应到具体的设计解决方案，确保每一张图都在解决真实问题。',
              blocks: [
                {
                  t: 'table', numCol: null, hlCol: 2,
                  title: '痛点数据 → 设计方案映射表',
                  head: ['用户痛点', '数据支撑', '设计方案', '对应图片'],
                  rows: [
                    ['「实物与图片不一致」', '色差差评常见', '三光线产品图', '图 1'],
                    ['「五金件质感差 / 不牢固」', '73% 好评提及品质', '磁扣 / 品牌标独立特写', '图 2'],
                    ['「礼盒看起来廉价」', '送礼退货原因之一', '开盒序列图 + 礼盒全景', '图 3'],
                    ['「不适合我 / 不好搭」', '场景图提转化 20-30%', '商务 + 休闲双场景模特', '图 4-5'],
                    ['「不知道买来送人行不行」', '送礼动机占 60%+', '送礼场景图', '图 6'],
                    ['「尺寸不合适」', '尺寸退货率 35%+', '尺寸标注 + 手腕测量引导', '图 7-8'],
                    ['「容易掉色 / 生锈」', '27% 差评提及材质', '316L 认证 + 防氧化对比', '图 9'],
                  ],
                },
              ],
            },

            /* ---------- 04 A+ 页面落地成果（PDF p8 + p9–p17） ---------- */
            {
              key: 'showcase', label: 'A+ 落地成果', en: 'Showcase',
              desc: '基于视觉标准体系，已输出 9 款产品的亚马逊 A+ 页面设计，覆盖情感线、男士线、功能线三大品类。',
              blocks: [
                {
                  t: 'metrics', cols: 3,
                  items: [
                    { n: '9', k: '款产品 A+ 页面', tone: 'gold', s: '覆盖三大品类线' },
                    { n: '9', k: '图标准排列', tone: 'gold', s: '统一框架体系' },
                    { n: '6+', k: '设计模块', tone: 'green', s: '可复用组件' },
                  ],
                },
                {
                  t: 'products', title: '情感线', en: 'Emotional Line', icon: '◈',
                  items: [
                    {
                      n: '01', title: '情侣手链 · Forever Intertwined', badge: 'Infinity Couple',
                      img: '/work/amz/aplus-01.jpg',
                      story: '「Forever Intertwined」（永远交织）—— 无限符号手链象征情侣间不可分割的连接。银色是她的温柔拥抱，黑色是他的坚定宣言，合在一起是牢不可破的纽带。',
                      highlights: [
                        '「Worn in Your World」首屏：日常生活场景 + 3 张小图（驾驶 / 阅读 / 咖啡约会）',
                        '「Details of Devotion」：产品细节拆解 + 刻字工艺展示',
                        '蜡烛晚餐送礼场景：浪漫氛围推动转化',
                        '「Eternal Connection」收尾：礼盒 + 丝带 + 完整包装展示',
                      ],
                      modules: ['场景首屏', '细节特写', '场景矩阵', '送礼场景', '包装展示'],
                    },
                    {
                      n: '02', title: '婚礼花束挂坠 · A Timeless Keepsake', badge: 'Bridal Bouquet Charm',
                      img: '/work/amz/aplus-02.jpg',
                      story: '「A Timeless Keepsake」（永恒的纪念）—— 将亲人照片挂在新娘手捧花上，让不在场的亲人也能「参与」婚礼。从婚礼日到纪念日，珍贵回忆随时相伴。',
                      highlights: [
                        '4 个 Icon 标签：Custom Photo / Engraving / Heirloom / Gift Ready',
                        '「A Keepsake for Every Chapter」：后视镜 / 信件 / 手袋 3 种日常场景',
                        '送礼场景：母亲 → 新娘的情感传递瞬间',
                        '「Your Memories, Beautifully Held」：照片保护 + 刻字工艺细节',
                      ],
                      modules: ['首屏 Banner', '功能图标', '场景矩阵', '送礼场景', '产品细节', '包装展示'],
                    },
                    {
                      n: '03', title: '生日石手链 · Nature-Inspired Grace', badge: 'Birthstone Bracelet',
                      img: '/work/amz/aplus-03.jpg',
                      story: '「Customize Your Connection」（定制你的连接）—— 马眼形切割宝石如树叶般优雅，2-7 颗生辰石自由组合，代表你最珍视的亲密关系。',
                      highlights: [
                        '「A Meaningful Token」首屏：礼盒开箱 + 送礼双手场景',
                        '生日石色谱图 + 12 色宝石对应月份',
                        '母女场景：情感连接代入',
                        '3 张手机界面截图：社交分享场景',
                      ],
                      modules: ['首屏 Banner', '定制选项', '色彩选择器', '场景图', '母女情感', '包装展示'],
                    },
                  ],
                },
                {
                  t: 'products', title: '男士线', en: "Men's Line", icon: '◈',
                  items: [
                    {
                      n: '04', title: '男士编织手链 · Capture Your Moments', badge: "Men's Leather Bracelet",
                      img: '/work/amz/aplus-04.jpg',
                      story: '「Your Story, Your Style」（你的故事，你的风格）—— 黑色编织皮质手链，内嵌照片 + 刻字，将珍贵回忆随身携带。黑银双色，1-6 个名字珠可定制。',
                      highlights: [
                        '「Engineered for a Perfect Fit」：6 种尺寸选择 + 尺寸指南',
                        '「A Style for Every Story」：Work / Leisure / Evening / Travel / Daily 5 种生活场景',
                        '「The Moment They\'ll Remember」：礼盒 + 手写信，父亲节 / 生日送礼',
                        '深色皮质 + 木质背景，营造男士品质感',
                      ],
                      modules: ['首屏 Banner', '尺寸指南', '场景矩阵', '送礼场景', '颜色选择', '包装展示'],
                    },
                    {
                      n: '05', title: '男士古巴链项链 · A Present That Means More', badge: "Men's Chain Necklace",
                      img: '/work/amz/aplus-05.jpg',
                      story: '「Built to Last, Worn for Life」（经久耐用，终身佩戴）—— 不锈钢古巴链项链，定制刻字铭牌，为现代男士打造的个人风格单品。父亲节 / 生日 / 圣诞 / 周年纪念的完美礼物。',
                      highlights: [
                        '4 个节日标签：Father\'s Day / Birthday / Christmas / Anniversary',
                        '「Find Your Fit」：5 种长度 + 佩戴效果对比 + 尺寸示意图',
                        '「Crafted from Stainless Steel」：VS 竞品对比，凸显品质差异',
                        '「A Style That Speaks」：街头 / 日常 / 时尚多场景佩戴',
                      ],
                      modules: ['送礼场景', '尺寸指南', 'VS 对比', '材质说明', '风格场景'],
                    },
                  ],
                },
                {
                  t: 'products', title: '功能线', en: 'Functional Line', icon: '◈',
                  items: [
                    {
                      n: '06', title: '医疗急救手环 EN · Critical Info in an Emergency', badge: 'Medical ID · EN',
                      img: '/work/amz/aplus-06.jpg',
                      story: '「Critical Info in an Emergency」（紧急时刻的关键信息）—— 医疗急救手环，激光刻字包含过敏信息、疾病、紧急联系人。弹性材质 + 不锈钢牌，日常 / 居家 / 运动 / 旅行 / 家庭全场景佩戴。',
                      highlights: [
                        '4 个功能图标：快速识别 / 紧急联系 / 过敏信息 / 全天候佩戴',
                        '材质特点可视化：透气箭头示意弹性带结构',
                        '「Your Family\'s Safety」：家庭情感场景',
                        '「A Custom Gift That Truly Cares」：礼盒 + 贺卡，有温度的礼物',
                      ],
                      modules: ['急救场景', '功能图标', '材质展示', '场景矩阵', '家庭场景', '包装送礼'],
                    },
                    {
                      n: '07', title: '医疗急救手环 DE · MEDIZINISCHES NOTFALLARMBAND', badge: 'Medical ID · DE',
                      img: '/work/amz/aplus-07.jpg',
                      story: '「Ein Geschenk der Sicherheit」（安全的礼物）—— 医疗急救手环，激光刻字包含过敏信息、疾病、紧急联系人。为家人送上安心，从孩子到成人全年龄段适用。',
                      highlights: [
                        '5 个功能图标标注：高对比刻字 / 耐用舒适 / 日常时尚 / 个性化信息 / 免费刻字',
                        '「Efficient Rescue」：紧急救援场景，放大展示刻字信息',
                        '5 种颜色选择 + 尺寸示意图（编织款）',
                        '「Den ganzen Tag tragen」：户外 / 居家 / 健身 / 工作 / 旅行 5 场景',
                      ],
                      modules: ['功能标注', '急救场景', '颜色选择', '尺寸参数', '场景矩阵', '送礼场景'],
                    },
                  ],
                },
                {
                  t: 'products', title: '更多品类', en: 'More Categories', icon: '◈',
                  items: [
                    {
                      n: '08', title: '意大利魅力手链 · The Art of Personal Storytelling', badge: 'Italian Charm Bracelet',
                      img: '/work/amz/aplus-08.jpg',
                      story: '「Design Your Narrative」（设计你的故事）—— 模块化魅力手链，名字、日期、符号、照片自由组合，每条手链都是独一无二的个人故事。',
                      highlights: [
                        '模块化展示：Mama / Dada / Love / 姓名 / 符号 / 照片等多种模块',
                        '「For Every Bond」：母子 / 情侣 / 宠物 3 种关系场景',
                        '4 条不同风格手链平铺展示定制多样性',
                        '「Eternal Memories」收尾：礼盒 + 手写卡片，强化纪念属性',
                      ],
                      modules: ['定制选项', '模块选择器', '场景分类', '颜色矩阵', '包装展示'],
                    },
                    {
                      n: '09', title: '医疗编织手环 EN · Clarity That Lasts', badge: 'Medical ID Braided · EN',
                      img: '/work/amz/aplus-09.jpg',
                      story: '「Den ganzen Tag tragen, überall sicher sein」（全天候佩戴，处处安心）—— 编织款医疗急救手环，5 种颜色可选，可调节尺寸 130-220mm，从儿童到成人全年龄段适用。',
                      highlights: [
                        '激光刻字清晰对比：品牌 VS 其他品牌，品质差异可视化',
                        '「Colors Palette」：5 种颜色矩阵展示（黑 / 酒红 / 紫 / 军绿 / 深蓝）',
                        '紧急救援场景 + 日常生活场景双线叙事',
                        '家庭送礼场景：子女为父母购买的情感代入',
                      ],
                      modules: ['VS 对比', '颜色矩阵', '急救场景', '日常场景', '家庭情感', '礼盒送礼'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 05 优化前后对比（PDF p18） ---------- */
            {
              key: 'optimize', label: '优化前后对比', en: 'Before & After',
              desc: '基于视觉标准体系，高销量产品的视觉优化升级方向与痛点解决。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '优化前', tone: 'ember', icon: '×',
                      bullets: [
                        '主图产品占比小，搜索页辨识度低',
                        '缺乏五金件细节特写，品质感未建立',
                        '礼盒展示简单，送礼价值感不足',
                        '场景图单一，用户难以想象佩戴效果',
                        '缺少尺寸引导，退货率高（35%+）',
                        '无材质认证信息，27% 用户有材质疑虑',
                        '变体选择不清晰，增加用户选择成本',
                      ],
                    },
                    {
                      title: '优化后', tone: 'green', icon: '✓',
                      bullets: [
                        '白底主图专业化，产品占 85%+，搜索辨识度提升',
                        '五金细节独立特写，73% 好评提及品质得到呼应',
                        '开盒仪式感展示，60%+ 送礼动机被有效激活',
                        '商务 + 休闲双场景，覆盖 25-40 岁核心消费人群',
                        '尺寸图 + 测量引导双保险，有效降低尺寸退货',
                        '316L / 防氧化认证 + Before/After 对比，建立信任',
                        '颜色 / 尺寸变体清晰展示，减少选择路径',
                      ],
                    },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '优化价值',
                  blocks: [
                    {
                      t: 'lead',
                      text: '视觉优化不是「把图 P 好看」，而是用系统性的设计解决真实的用户痛点。首图解决「实物一致性」疑虑、细节图建立品质信任、礼盒图激活送礼动机、场景图降低决策门槛、尺寸图减少退货、材质图消除品质焦虑 —— 每一张图都在为转化和复购做贡献。',
                      hl: ['用系统性的设计解决真实的用户痛点', '每一张图都在为转化和复购做贡献'],
                    },
                  ],
                },
              ],
            },

            /* ---------- 06 项目复盘（PDF p20） ---------- */
            {
              key: 'retro', label: '项目复盘', en: 'Retrospective',
              desc: '9 图标准排列体系的可复制性验证，以及下一阶段的迭代方向。',
              blocks: [
                {
                  t: 'cols',
                  items: [
                    {
                      title: '成功经验', tone: 'green', icon: '✓',
                      bullets: [
                        '9 图标准排列体系建立了可复制的视觉框架，新品产出效率大幅提升',
                        '痛点驱动的设计方法 —— 每张图都对应真实用户痛点，设计决策有数据支撑',
                        '从竞品研究中提取优秀元素，站在行业标杆基础上优化而非从零开始',
                        '模块化设计体系可跨品类复用，男士线 → 情感线 → 功能线均可适配',
                        '多语言本地化方案成熟，结构统一 + 文案本地化模式可快速拓展市场',
                      ],
                    },
                    {
                      title: '优化方向', tone: 'gold', icon: '→', titleColor: 'gold',
                      bullets: [
                        '可建立 A+ 页面效果跟踪机制，用实际转化数据反哺设计优化',
                        '可将 9 图标准扩展为不同品类的定制版本（情感类 / 功能类 / 礼品类）',
                        '可增加动态图 / GIF 内容，展示产品使用流程和细节变化',
                        '可引入 A/B 测试，对首图 / 场景图 / 礼盒图等关键模块做数据验证',
                        '可建立素材库（产品图 / 场景图 / 图标库），进一步提升产出效率',
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: '06',
        title: '营销视觉与包装',
        subtitle: '节日营销 · AI 广告 · 包装体系 · 移动端',
        year: '2025 — 2026',
        role: '品牌视觉负责人',
        scope: '情人节 / 母亲节 / 黑五 / 圣诞全节点',
        tags: ['Holiday Campaign', 'Packaging', 'Mobile'],
        metrics: [],
        image: '/work/p6.jpg',
        tone: 'f',
        detail: {
          intro:
            '面向欧美市场的定制礼品珠宝品牌视觉统筹 —— 统筹节日营销主视觉、包材物料体系与 AI 出图流程，把「节日氛围 + 情感定制」沉淀为可复用的标准化输出。',
          categories: [
            /* ---------- 01 营销视觉（PDF p2–p3） ---------- */
            {
              key: 'campaign', label: '营销视觉', en: 'Campaign',
              desc: '圣诞活动页 · 全站 -10% 促销',
              blocks: [
                {
                  t: 'figure',
                  img: '/work/mk/campaign.jpg',
                  caption: '圣诞活动首页，融合家庭、礼物与节日氛围',
                },
                { t: 'chips', items: ['法语区站点圣诞', '通过场景共情，强化购买意愿'] },
              ],
            },

            /* ---------- 02 包装体系（PDF p4） ---------- */
            {
              key: 'packaging', label: '包装体系', en: 'Packaging',
              desc: '项链卡片 / 礼盒 · 统一开箱体验',
              blocks: [
                {
                  t: 'gallery',
                  cols: 3,
                  items: ['/work/mk/pack-1.jpg', '/work/mk/pack-2.jpg', '/work/mk/pack-3.jpg'],
                  caption:
                    '依据品牌色彩规范（80% 暖黄主色 + 20% 深蓝绿辅助色）升级产品包装、礼盒、配件卡、售后卡等全套包材，统一品牌开箱体验，强化识别度与情感温度。',
                },
                {
                  t: 'gallery',
                  cols: 2,
                  items: ['/work/mk/pack-box-1.jpg', '/work/mk/pack-box-2.jpg'],
                  caption:
                    '礼盒包材延伸 —— 项链礼盒采用信封插卡 + 心形镂空卡槽 + 缎带结构，外盒延续深蓝烫金语言，与项链卡片形成同一套开箱体验。',
                },
              ],
            },

            /* ---------- 03 情感化产品（PDF p5） ---------- */
            {
              key: 'birthflower', label: '情感化产品', en: 'Emotional',
              desc: '生辰花卡片 · 承载故事与专属心意',
              blocks: [
                {
                  t: 'gallery',
                  cols: 4,
                  items: [
                    '/work/mk/flower-1.jpg',
                    '/work/mk/flower-2.jpg',
                    '/work/mk/flower-3.jpg',
                    '/work/mk/flower-4.jpg',
                  ],
                  caption:
                    '将月份、花卉、生辰石与刻字结合，把产品转化为可讲述的故事。每一张卡片既是产品说明，也是情感媒介。',
                },
              ],
            },

            /* ---------- 04 AI 工作流（PDF p6） ---------- */
            {
              key: 'ai', label: 'AI 工作流', en: 'AI Workflow',
              desc: '钱包照片雕刻图案 · Link Fox AI → Photoshop',
              blocks: [
                {
                  t: 'steps',
                  cols: 3,
                  badge: true,
                  items: [
                    { n: '1', title: '上传顾客照片', desc: 'Link Fox AI 生成线稿图' },
                    { n: '2', title: 'Photoshop 图章滤镜', desc: '高对比黑白图' },
                    { n: '3', title: '输出 PNG', desc: '适配激光雕刻' },
                  ],
                },
                {
                  t: 'group', tone: 'gold', title: '标准化流程',
                  blocks: [
                    {
                      t: 'lead',
                      text: '搭建覆盖 Link Fox AI 与 Photoshop 后处理的标准化流程，沉淀情侣 / 家庭两类口令，确保人物特征完整保留、输出适配多种礼品印刷工艺。完整转化流程已沉淀为团队标准文档，点击卡片可翻阅全文，也可下载原文件。',
                      hl: ['情侣 / 家庭两类口令', '团队标准文档', '下载原文件'],
                    },
                    {
                      t: 'docs',
                      cols: 1,
                      items: [
                        {
                          cover: '/pdf/mk/cover-wallet-flow.jpg',
                          pdf: '/pdf/mk/wallet-photo-flow-v2.pdf',
                          file: '/pdf/mk/Jessemade-wallet-photo-flow-v2.pptx',
                          badge: 'PPTX',
                          tag: 'STANDARD · PPTX',
                          title: '钱包照片转化完整流程 V2',
                          meta: '11 页 · Link Fox AI 参数设置 / Photoshop 图章滤镜 / 情侣·家庭口令 / 注意事项',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  /* ---------------- 个人优势 ---------------- */
  capabilities: {
    label: '03 — Capabilities',
    heading: '我能带来什么',
    desc: '不是一份技能清单，而是六种可以立刻投入生产、并且已被数据验证过的能力。',
    items: [
      {
        n: '01',
        title: '品牌 VIS 体系搭建',
        en: 'Brand System',
        desc: '从市场调研到品牌 DNA，输出 Logo、色彩、字体、图形与应用的完整规范，并建立可长期演进的视觉资产库。',
        tags: ['Identity', 'Guideline', 'Asset Library'],
      },
      {
        n: '02',
        title: 'AI 设计工作流',
        en: 'AI Generation',
        desc: '搭建口令库、品牌 Lora 与终审机制，把 AI 从玩具变成稳定产能：成熟视频脚本 3h/条，素材产出效率 10 倍。',
        tags: ['豆包 / 即梦', '可灵 / Sora', 'Prompt Library'],
      },
      {
        n: '03',
        title: '跨境全链路视觉',
        en: 'E-commerce Visual',
        desc: '独立站首页、产品页、分类页与亚马逊主图、A+ 页面一体化设计，兼顾平台规则与转化效率。',
        tags: ['Shopify', 'Amazon', 'A+ Page'],
      },
      {
        n: '04',
        title: '数据驱动效果广告',
        en: 'Performance Ad',
        desc: '以 CTR / CPC / 加购 / 订单为锚点做 A/B 测试，提炼高表现素材的视觉特征并反哺下一轮创意生产。',
        tags: ['CTR 7.45%', 'CPC $0.15', 'A/B Testing'],
      },
      {
        n: '05',
        title: '团队管理与 SOP',
        en: 'Team & SOP',
        desc: '把零散经验沉淀为文档、模板与 Checklist，新人 2 周独立产出，团队效率 +30%，过稿率稳定 85%+。',
        tags: ['SOP', 'Review', 'Training'],
      },
      {
        n: '06',
        title: '包装与艺术指导',
        en: 'Packaging & AD',
        desc: '包材视觉体系与开箱体验设计，兼顾品牌调性、物流实用性与成本控制，让包装成为品牌第一触点。',
        tags: ['Packaging', 'Unboxing', 'Art Direction'],
      },
    ],
  },

  /* ---------------- 底部联系 ---------------- */
  contact: {
    label: '04 — Contact',
    marquee: 'Let’s build something worth remembering —',
    heading: ['一起做点', '值得被记住的东西'],
    email: '2247828263@qq.com',
    desc: '求职意向：设计总监 / 品牌设计经理 · 期望城市：广州。欢迎聊品牌体系、跨境视觉或 AI 工作流，我会在 24 小时内回复。',
    socials: [
      { k: 'Email', v: '2247828263@qq.com', href: 'mailto:2247828263@qq.com' },
      { k: 'Phone', v: '177 3803 5607', href: 'tel:17738035607' },
      { k: 'WeChat', v: 'Xyanxuan0329', href: '#' },
    ],
    footer: [
      { k: '© 2026 夏艳宣' },
      { k: 'Built with React + Vite' },
      { k: 'Guangzhou · 23.13°N 113.26°E' },
    ],
  },
}
