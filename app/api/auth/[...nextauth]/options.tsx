import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Profile } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: { username: string; password: string } | undefined,
      ) {
        //retrieve user data
        //verify user data
        const user = { id: "42", name: "Me", password: "me0000" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Sign in attempt:", { user, account, profile });

      if (account?.provider === "google") {
        // Extend the Profile interface
        interface ExtendedProfile extends Profile {
          email_verified?: boolean; // Add this line to include email_verified
        }
        // Use ExtendedProfile in your code
        const userProfile: ExtendedProfile = {
          /* your user data */
        };

        // Use the userProfile variable to avoid the unused variable error
        console.log(userProfile); // Example usage

        // Ensure the email is verified and ends with the desired domain
        return !!(
          profile?.email_verified && profile.email?.endsWith("@example.com")
        );
      }
      return true; // Allow sign-in for other providers
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/admin/home";
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT callback:", {
        token,
        user,
        account,
        profile,
        isNewUser,
      });
      return token;
    },
    async session({ session, user, token }) {
      console.log("Session callback:", { session, user, token });
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
};
