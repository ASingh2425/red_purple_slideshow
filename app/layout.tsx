import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MANU Protocol — Final Transit",
  description: "A cinematic story transition from Research to the final assessment."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><script dangerouslySetInnerHTML={{ __html: 'window.location.replace("https://the-last-dataset-jqpr.vercel.app/");' }} /><meta http-equiv="refresh" content="0; url=https://the-last-dataset-jqpr.vercel.app/" />{children}</body></html>;
}
