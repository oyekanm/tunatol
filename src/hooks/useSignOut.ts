"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function useSignOut() {
    // const router = useRouter();
    const logout = async()=>{
      // const {url} = await signOut({redirect: false, callbackUrl: "/foo"})
        signOut({ callbackUrl: '/' })
        // router.push(data.url)
    }
  return{
    logout
  }
}
