# 🚀 Next.js + HeroUI + Tailwind CSS 模板

一个现代化的 Next.js 项目模板，集成了最新的技术栈，为您提供开箱即用的开发体验。

## 📖 项目背景

这个模板是为了解决现代 Web 开发中的常见痛点而创建的：

- 🎯 **快速启动** - 无需重复配置，直接开始开发
- 🌍 **国际化支持** - 内置多语言切换功能，支持 23 种语言
- 🌙 **主题切换** - 支持浅色、深色和自动主题模式
- 📱 **响应式设计** - 完美适配各种设备尺寸
- 🔧 **现代化工具链** - 使用最新的开发工具和最佳实践

## ✨ 主要特性

- ⚡ **Next.js 15** - 最新版本，支持 App Router 和 Turbopack
- 🎨 **Tailwind CSS 4** - 最新版本，更快的构建速度
- 🧩 **HeroUI 2.8** - 丰富的 React 组件库
- 🌐 **国际化** - 基于 next-intl 的完整多语言支持
- 🌓 **主题切换** - 基于 next-themes 的深色模式支持
- 📝 **TypeScript** - 完整的类型安全支持
- 🎭 **Framer Motion** - 流畅的动画效果
- 🎪 **Iconify** - 丰富的图标库

## 🛠️ 主要依赖

### 核心框架
```json
{
  "next": "15.3.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

### UI 和样式
```json
{
  "@heroui/react": "2.8.0-beta.10",
  "tailwindcss": "^4",
  "framer-motion": "^12.19.1"
}
```

### 国际化
```json
{
  "next-intl": "^4.3.1",
  "next-themes": "^0.4.6"
}
```

### 图标
```json
{
  "@iconify/react": "^6.0.0"
}
```

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd next-heroui-tailwind-template
```

### 2. 安装依赖
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3. 启动开发服务器
```bash
# 使用 pnpm (推荐)
pnpm dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

### 4. 打开浏览器
访问 [http://localhost:3000](http://localhost:3000) 查看结果

## 📁 目录结构

```
next-heroui-tailwind-template/
├── 📁 src/
│   ├── 📁 app/
│   │   └── 📁 [locale]/          # 国际化路由
│   │       ├── 📄 page.tsx       # 主页面
│   │       └── 📄 layout.tsx     # 布局文件
│   ├── 📁 components/
│   │   └── 📁 system/
│   │       ├── 📄 Language.tsx   # 语言切换组件
│   │       ├── 📄 ThemeMode.tsx  # 主题切换组件
│   │       └── 📄 ThemeModeClient.tsx
│   ├── 📁 i18n/                  # 国际化配置
│   │   ├── 📄 request.ts
│   │   └── 📄 routing.ts
│   ├── 📁 layout/                # 布局组件
│   ├── 📁 lib/                   # 工具函数
│   └── 📄 middleware.ts          # 中间件
├── 📁 public/
│   ├── 📁 json/
│   │   └── 📄 languageList.json  # 语言列表
│   └── 📁 locales/               # 翻译文件
│       ├── 📄 en.json
│       ├── 📄 zh-CN.json
│       └── ...                   # 其他语言
├── 📄 package.json
├── 📄 next.config.ts
├── 📄 tailwind.config.ts
└── 📄 README.md
```

## 🎯 使用方法

### 添加新页面
在 `src/app/[locale]/` 目录下创建新的页面文件：

```tsx
// src/app/[locale]/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>关于我们</h1>
    </div>
  );
}
```

### 使用国际化
```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("common");
  
  return <h1>{t("title")}</h1>;
}
```

### 使用主题切换
```tsx
import ThemeMode from "@/components/system/ThemeMode";

export default function Header() {
  return (
    <header>
      <ThemeMode />
    </header>
  );
}
```

### 使用语言切换
```tsx
import Language from "@/components/system/Language";

export default function Header() {
  return (
    <header>
      <Language />
    </header>
  );
}
```

## 🌍 支持的语言

- 🇺🇸 English
- 🇨🇳 简体中文
- 🇹🇼 繁體中文
- 🇯🇵 日本語
- 🇰🇷 한국인
- 🇷🇺 Русский
- 🇫🇷 Français
- 🇪🇸 Español
- 🇩🇪 Deutsch
- 🇮🇹 Italiano
- 🇵🇹 Português
- 🇳🇱 Nederlands
- 🇸🇪 Svenska
- 🇳🇴 Norsk
- 🇩🇰 Dansk
- 🇫🇮 Suomi
- 🇵🇱 Polski
- 🇨🇿 Čeština
- 🇭🇺 Magyar
- 🇷🇴 Română
- 🇧🇬 Български
- 🇭🇷 Hrvatski
- 🇸🇰 Slovenčina

## 🎨 自定义主题

### 修改 HeroUI 主题
在 `tailwind.config.ts` 中自定义主题：

```ts
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 自定义颜色
      }
    }
  },
  darkMode: "class",
  plugins: [heroui()]
}
```

### 添加新的翻译
在 `public/locales/` 目录下添加新的语言文件：

```json
// public/locales/zh-CN.json
{
  "common": {
    "title": "标题",
    "description": "描述"
  }
}
```

## 📦 构建和部署

### 构建生产版本
```bash
pnpm build
```

### 启动生产服务器
```bash
pnpm start
```

### 代码检查
```bash
pnpm lint
```


## 📄 许可证

这个项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 感谢

感谢以下开源项目的支持：

- ⚡ [Next.js](https://nextjs.org/) - React 全栈框架
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- 🧩 [HeroUI](https://heroui.com/) - 现代化的 React 组件库
- 🌐 [next-intl](https://next-intl-docs.vercel.app/) - Next.js 国际化解决方案
- 🌓 [next-themes](https://github.com/pacocoursey/next-themes) - 完美的深色模式支持
- 🎭 [Framer Motion](https://www.framer.com/motion/) - 生产就绪的动画库
- 🎪 [Iconify](https://iconify.design/) - 统一的图标框架

## 📞 联系我们

如果你有任何问题或建议，请随时联系我：

- 📧 Email: ferret.icu.com
---

⭐ 如果这个项目对你有帮助，请给我们一个星标！
