"use client";
import { AnimatePresence, motion } from "framer-motion";
import { cn, Button, Tooltip, ButtonProps, TooltipProps } from "@heroui/react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";

const useThemeTransition = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();
  const setThemeTransition = useCallback(
    (key: ThemeKey) => {
      if (
        typeof document.startViewTransition !== "function" ||
        !buttonRef.current
      ) {
        setTheme(key);

        return;
      }

      const ButtonRect = buttonRef.current.getBoundingClientRect() as DOMRect;
      const clientX = ButtonRect.left + ButtonRect.width / 2;
      const clientY = ButtonRect.top + ButtonRect.height / 2;
      // 获取类名vt-name-开头的所有元素
      const elements = document.querySelectorAll('[class*="vt-name-"]');
      elements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        element.classList.add("vt-name-none");
      });

      const root = document.documentElement;
      // 设置transition
      root.style.setProperty("view-transition-name", "themeMode");
      root.style.setProperty("--themeMode-x", `${clientX}px`);
      root.style.setProperty("--themeMode-y", `${clientY}px`);
      document
        .startViewTransition(() => {
          setTheme(key);
        })
        .finished.then(() => {
          // 移除transition
          root.style.removeProperty("view-transition-name");
          root.style.removeProperty("--themeMode-x");
          root.style.removeProperty("--themeMode-y");
          elements.forEach((element) => {
            if (!(element instanceof HTMLElement)) return;
            element.classList.remove("vt-name-none");
          });
        });
    },
    [setTheme]
  );
  return { theme, setTheme: setThemeTransition, buttonRef };
};

const themes = {
  system: "ic:round-auto-awesome",
  light: "line-md:sunny-filled-loop",
  dark: "line-md:moon-filled-loop",
} as const;

export type ThemeKey = keyof typeof themes;
export interface ThemeModeProps extends ButtonProps {
  tooltipProps?: TooltipProps;
}
const MEDIA_QUERY = "(prefers-color-scheme: light)";

export default function ThemeMode({
  className,
  isIconOnly,
  tooltipProps,
  ...props
}: ThemeModeProps) {
  const t = useTranslations("themeMode");
  const { theme, setTheme, buttonRef } = useThemeTransition();
  const [systemLight, setSystemLight] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    setSystemLight(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setSystemLight(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const nextTheme = useMemo(() => {
    return theme === "system"
      ? {
        icon: systemLight ? themes.light : themes.dark,
        key: systemLight ? "light" : "dark",
        tip: systemLight ? t("changeToDark") : t("changeToLight"),
        onClick: () => setTheme(systemLight ? "dark" : "light"),
      }
      : {
        icon: themes[theme as ThemeKey],
        key: "system",
        tip: t("changeToSystem"),
        onClick: () => setTheme("system"),
      };
  }, [theme, systemLight, setTheme, t]);

  return (
    <Tooltip
      content={nextTheme.tip}
      {...tooltipProps}
    >
      <Button
        className={cn(
          "relative flex items-center justify-center text-white",
          className
        )}
        ref={buttonRef}
        isIconOnly={isIconOnly}
        onPress={nextTheme.onClick}
        color="primary"
        {...props}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={theme}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, position: "absolute", inset: "2" }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center gap-2"
          >
            <Icon
              icon={themes[theme as ThemeKey] || ""}
              className="-translate-y-[1px] text-2xl"
            />
            {!isIconOnly && (
              <span className="text-xl font-bold tracking-widest">
                {theme && themes[theme as ThemeKey] ? t(theme as ThemeKey) : t("system")}
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        <style jsx>{`
          @keyframes clip {
            from {
              clip-path: circle(
                0% at var(--themeMode-x, 0) var(--themeMode-y, 0)
              );
            }
            to {
              clip-path: circle(
                max(150dvw, 150dvh) at var(--themeMode-x, 0)
                  var(--themeMode-y, 0)
              );
            }
          }

          ::view-transition-old(themeMode) {
            animation: none;
          }
          ::view-transition-new(themeMode) {
            mix-blend-mode: normal;
            animation: clip 0.5s ease-in;
          }
        `}</style>
      </Button>
    </Tooltip>
  );
}
