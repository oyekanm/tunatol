import "@/app/globals.css";
import { DashboardHeader, DashboardMainContent, SideBar } from "@/features/dashboard/components";
import PrelineScript from "@/lib/PrelineScript";
import { BreadCrumbs } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`font-sans`}>
          <DashboardHeader />
          <BreadCrumbs />
          <SideBar />
          <DashboardMainContent>
            {children}
          </DashboardMainContent>
          <PrelineScript />
        </body>
    </html>
  )
}