"use client";
import { AnimatePresence, motion } from "framer-motion";
import { cn, Button, Tooltip, ButtonProps, TooltipProps } from "@heroui/react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";

// 主题配置
const THEMES = {
  system: "ic:round-auto-awesome",
  light: "line-md:sunny-filled-loop",
  dark: "line-md:moon-filled-loop",
} as const;

const MEDIA_QUERY = "(prefers-color-scheme: light)";

export type ThemeKey = keyof typeof THEMES;

export interface ThemeModeProps extends ButtonProps {
  tooltipProps?: TooltipProps;
}

// Hook: 系统主题检测
const useSystemTheme = () => {
  const [isSystemLight, setIsSystemLight] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    setIsSystemLight(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemLight(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { isSystemLight, isMounted };
};

// Hook: 主题切换动画
const useThemeTransition = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();

  const handleViewTransition = useCallback((newTheme: ThemeKey) => {
    if (!buttonRef.current) {
      setTheme(newTheme);
      return;
    }

    // 检查浏览器是否支持 view transition API
    if (typeof document?.startViewTransition !== "function") {
      setTheme(newTheme);
      return;
    }

    try {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;

      // 清理现有的 vt-name- 类名
      const vtElements = document.querySelectorAll('[class*="vt-name-"]');
      vtElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.classList.add("vt-name-none");
        }
      });

      const root = document.documentElement;

      // 设置 CSS 变量
      root.style.setProperty("view-transition-name", "themeMode");
      root.style.setProperty("--themeMode-x", `${centerX}px`);
      root.style.setProperty("--themeMode-y", `${centerY}px`);

      // 执行主题切换动画
      document.startViewTransition(() => {
        setTheme(newTheme);
      }).finished.finally(() => {
        // 清理 CSS 变量和类名
        root.style.removeProperty("view-transition-name");
        root.style.removeProperty("--themeMode-x");
        root.style.removeProperty("--themeMode-y");

        vtElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.classList.remove("vt-name-none");
          }
        });
      });
    } catch (error) {
      // 动画失败时直接切换主题
      console.warn("Theme transition failed:", error);
      setTheme(newTheme);
    }
  }, [setTheme]);

  return {
    theme,
    setTheme: handleViewTransition,
    buttonRef,
  };
};

// Hook: 主题状态逻辑
const useThemeState = () => {
  const { theme, setTheme, buttonRef } = useThemeTransition();
  const { isSystemLight, isMounted } = useSystemTheme();
  const t = useTranslations("themeMode");

  const themeState = useMemo(() => {
    // 未挂载时返回固定的初始状态，避免水合错误
    if (!isMounted) {
      return {
        currentIcon: THEMES.system,
        displayText: t("system"),
        tooltip: t("changeToSystem"),
        onClick: () => { },
      };
    }

    if (theme === "system") {
      const targetTheme = isSystemLight ? "dark" : "light";
      const currentIcon = isSystemLight ? THEMES.light : THEMES.dark;

      return {
        currentIcon,
        displayText: t("system"),
        tooltip: isSystemLight ? t("changeToDark") : t("changeToLight"),
        onClick: () => setTheme(targetTheme),
      };
    }

    const currentTheme = theme as ThemeKey;

    return {
      currentIcon: THEMES[currentTheme] || THEMES.system,
      displayText: t(currentTheme),
      tooltip: t("changeToSystem"),
      onClick: () => setTheme("system"),
    };
  }, [theme, isSystemLight, isMounted, setTheme, t]);

  return {
    ...themeState,
    buttonRef,
    currentTheme: isMounted ? theme : "system", // 统一的主题键值
  };
};

// 主组件
export default function ThemeMode({
  className,
  isIconOnly,
  tooltipProps,
  ...props
}: ThemeModeProps) {
  const {
    currentIcon,
    displayText,
    tooltip,
    onClick,
    buttonRef,
    currentTheme,
  } = useThemeState();

  return (
    <>
      <Tooltip content={tooltip} {...tooltipProps}>
        <Button
          className={cn(
            "relative flex items-center justify-center text-white",
            className
          )}
          ref={buttonRef}
          isIconOnly={isIconOnly}
          onPress={onClick}
          color="primary"
          {...props}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentTheme}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -30,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center gap-2"
            >
              <Icon
                icon={currentIcon}
                className="-translate-y-[1px] text-2xl"
              />
              {!isIconOnly && (
                <span className="text-xl font-bold tracking-widest">
                  {displayText}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </Tooltip>

      {/* 内联样式，确保在生产环境也能正常工作 */}
      <style jsx global>{`
        @keyframes themeClipAnimation {
          from {
            clip-path: circle(
              0% at var(--themeMode-x, 50%) var(--themeMode-y, 50%)
            );
          }
          to {
            clip-path: circle(
              max(150dvw, 150dvh) at var(--themeMode-x, 50%) var(--themeMode-y, 50%)
            );
          }
        }

        ::view-transition-old(themeMode) {
          animation: none;
        }
        
        ::view-transition-new(themeMode) {
          mix-blend-mode: normal;
          animation: themeClipAnimation 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .vt-name-none {
          view-transition-name: none !important;
        }
      `}</style>
    </>
  );
}
