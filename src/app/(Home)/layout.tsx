import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { HomeLayout } from "@/layout";
import { PrelineScript } from "@/lib";
import { useCurrentUser } from "@/hooks";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const current = await useCurrentUser()

  console.log(current)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HomeLayout>
          {children}
        </HomeLayout>
        <PrelineScript />
      </body>
    </html>
  );
}
