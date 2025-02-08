"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { setTheme, theme } = useTheme();
  setTheme("dark");
  console.log(theme);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;


}
