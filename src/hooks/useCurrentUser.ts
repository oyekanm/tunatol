import { authOptions } from "@/utils";
import { getServerSession } from "next-auth";
import { cache } from "react";

// export default async function useCurrentUser ():Promise<Partial<User>> {
//     const session:{ user:User,expires: any} | null = await getServerSession(authOptions);
//     return{
//         name:session?.user?.name as string,
//         userId:session?.user?.id as string,
//         email:session?.user?.email as string ,
//         user_type:session?.user.user_type as UserType
//     }
// }

export const CurrentUser = cache(async () => {
    const session:{ user:User,expires: any} | null = await getServerSession(authOptions);
    return {
      name: session?.user?.name as string,
      userId: session?.user?.id as string,
      email: session?.user?.email as string,
      user_type: session?.user.user_type as UserType
    };
  });