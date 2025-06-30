"use client"
import ThemeMode from "@/components/system/ThemeMode";
import Language from "@/components/system/Language";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("guide");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between p-6 sticky top-0 z-20 shadow-lg bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <Icon icon="tabler:brand-nextjs" className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Language />
          <ThemeMode />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t("description")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Chip color="primary" variant="flat">
              {t("features.nextjs.title")}
            </Chip>
            <Chip color="secondary" variant="flat">
              {t("features.tailwind.title")}
            </Chip>
            <Chip color="success" variant="flat">
              {t("features.heroui.title")}
            </Chip>
            <Chip color="warning" variant="flat">
              {t("features.internationalization.title")}
            </Chip>
            <Chip color="danger" variant="flat">
              {t("features.typescript.title")}
            </Chip>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Next.js 15 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                <Icon icon="tabler:brand-nextjs" className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{t("features.nextjs.title")}</p>
                <p className="text-small text-default-500">{t("features.latest")}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("features.nextjs.description")}
              </p>
            </CardBody>
          </Card>

          {/* Tailwind CSS 4 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500">
                <Icon icon="tabler:brand-tailwind" className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{t("features.tailwind.title")}</p>
                <p className="text-small text-default-500">{t("features.latest")}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("features.tailwind.description")}
              </p>
            </CardBody>
          </Card>

          {/* HeroUI 2.8 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
                <Icon icon="tabler:components" className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{t("features.heroui.title")}</p>
                <p className="text-small text-default-500">{t("features.latest")}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("features.heroui.description")}
              </p>
            </CardBody>
          </Card>

          {/* 国际化 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                <Icon icon="tabler:language" className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{t("features.internationalization.title")}</p>
                <p className="text-small text-default-500">{t("features.latest")}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("features.internationalization.description")}
              </p>
            </CardBody>
          </Card>

          {/* 主题切换 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <Icon icon="tabler:palette" className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{t("features.theme.title")}</p>
                <p className="text-small text-default-500">{t("features.latest")}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("features.theme.description")}
              </p>
            </CardBody>
          </Card>

          {/* TypeScript */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Icon icon="tabler:brand-typescript" className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{t("features.typescript.title")}</p>
                <p className="text-small text-default-500">{t("features.latest")}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("features.typescript.description")}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Component Demo */}
        <div className="">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t("components.title")}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 语言切换组件 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("components.language.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("components.language.description")}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{t("components.language.current")}</span>
                  <Language />
                </div>
              </div>

              {/* 主题切换组件 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("components.theme.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("components.theme.description")}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{t("components.theme.current")}</span>
                  <ThemeMode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
        <p>
          {t("footer.description")}
        </p>
      </footer>
    </div>
  );
}
