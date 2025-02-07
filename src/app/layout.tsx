import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/config";
import { Providers } from "@/providers/Providers";
import { getTheme } from "@/services";

export const metadata: Metadata = {
  title: {
    template: `%s | ${ process.env.NEXT_PUBLIC_APP_NAME }`,
    default: `${ process.env.NEXT_PUBLIC_APP_NAME } | ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  },
  description: 'Description',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const theme = await getTheme();

  return (
    <html suppressHydrationWarning>
      {/* <link rel="icon" href="/favicon.png" sizes="64x64" /> */}
      <body className={`${ montserrat.className } ${ theme || 'theme-evolvenx' }`}>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  );
}
