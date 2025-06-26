import dynamic from "next/dynamic";

const ThemeMode = dynamic(() => import("./ThemeModeClient"), {
  ssr: false,
});

export default ThemeMode;