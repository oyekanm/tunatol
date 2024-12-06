import "./../../globals.css";
import { DashboardHeader, DashboardMainContent, SideBar } from "@/features/dashboard/components";
import PrelineScript from "@/lib/PrelineScript";
import { BreadCrumbs } from "@/components";
import { CurrentUser } from "@/hooks";
import { redirect } from "next/navigation";
import { SessionProvider, StoreProvider, ToastProvider } from "@/components/provider";


enum UserType {
  "ADMIN",
  "USER"
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const current: any = await CurrentUser()
  const user: any = UserType.ADMIN

  // console.log(UserType.ADMIN)
  // 
  // if(user_type !== user){
  //   redirect("/")
  // }

  return (
    <html lang="en">
      <body className={`font-sans relative`}>
        <SessionProvider session={current}>
          <ToastProvider>
            <StoreProvider>
              <DashboardHeader />
              <BreadCrumbs />
              <SideBar />
              <DashboardMainContent>
                {children}
              </DashboardMainContent>
              <PrelineScript />
            </StoreProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  )
}