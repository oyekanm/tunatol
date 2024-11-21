import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "smith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;

        const passwordCorrect = await compare(
          credentials?.password || "",
          user?.password as string
        );

        const { password, passcode,createdAt,updatedAt, ...rest } = user;

        if (passwordCorrect) {
          return rest;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID as string,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    // }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60
  },
  callbacks: {
    // async signIn({ user, account, email }) {
    //   const users = await prisma.user.findUnique({
    //     where: {
    //       email: user?.email as string,
    //     },
    //   });
    //   // console.log(email, user, users)
    //   if (users) {
    //     return true; //if the email exists in the User collection, email them a magic login link
    //   } else {
    //     console.log("first");
    //     return false;
    //   }
    // },
    async jwt({ token, user,session }) {
      // console.log("jwt",token, user,session,"js" )
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
    
      // console.log("session()",session, token)
      return session;
    },

  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// const handler = NextAuth({
//   providers:[

//   ]
// })

// export { handler as GET, handler as POST }
