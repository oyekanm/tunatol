import "@/app/globals.css";
import { DashboardHeader, DashboardMainContent, SideBar } from "@/features/dashboard/components";
import PrelineScript from "@/lib/PrelineScript";
import { BreadCrumbs } from "@/components";
import { useCurrentUser } from "@/hooks";
import { redirect } from "next/navigation";
import { ToastProvider } from "@/components/provider";

enum UserType {
  "ADMIN",
  "USER"
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { email, user_type } = await useCurrentUser()
  const user: any = UserType.ADMIN

  // console.log(UserType.ADMIN)
  // 
  // if(user_type !== user){
  //   redirect("/")
  // }

  return (
    <html lang="en">
      <body className={`font-sans relative`}>
        <ToastProvider>
          <DashboardHeader />
          <BreadCrumbs />
          <SideBar />
          <DashboardMainContent>
            {children}
          </DashboardMainContent>
          <PrelineScript />
        </ToastProvider>
      </body>
    </html>
  )
}