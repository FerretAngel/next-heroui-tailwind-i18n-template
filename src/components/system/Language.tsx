"use client";
import { Icon } from "@iconify/react";
import {
  Button,
  ButtonProps,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import LanguageList from "../../../public/json/languageList.json";
import { useEffect, useMemo, useState } from "react";
export interface LanguageProps extends ButtonProps {
  className?: string;
}

export default function Language({ className, ...props }: LanguageProps) {
  const [currentLocale, setCurrentLocale] = useState<string>("en");
  const [currentPath, setCurrentPath] = useState<string>("");
  // 获取当前语言
  useEffect(() => {
    setCurrentLocale(document.documentElement.lang ?? "en");
    // 获取当前路径，但排除语言前缀
    const path = window.location.pathname;
    const pathWithoutLocale = path.split("/").slice(2).join("/");
    setCurrentPath(pathWithoutLocale);
  }, []);
  // 获取语言列表
  const selectOptions = useMemo(() => {
    return Object.keys(LanguageList).map((item) => {
      return {
        key: item,
        label: LanguageList[item as keyof typeof LanguageList],
      };
    });
  }, []);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          isIconOnly
          className={cn("text-inherit z-0", className)}
          {...props}
        >
          <Icon
            icon="tabler:language"
            className="h-6 w-6 pointer-events-none"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Merge options"
        selectedKeys={[currentLocale]}
        selectionMode="single"
        className="max-h-[200px] overflow-y-auto"
        onSelectionChange={(key) => {
          // 2. 使用 router.push 进行导航，这会触发完整的页面刷新
          const selectedLocale = Array.from(key)[0] as string;
          window.location.href = `/${selectedLocale}/${currentPath}`;
        }}
      >
        {selectOptions.map(({ key, label }) => {
          return <DropdownItem key={key}>{label}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
