// @ts-nocheck
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (
  !process.env.NEXTAUTH_GOOGLE_CLIENT_ID ||
  !process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET
) {
  throw new Error("Missing Google OAuth environment variables");
}
const baseUrlBackend = process.env.BASE_URL_API;

let UserUID;
const handler = NextAuth({
  secret: `${process.env.NEXTAUTH_SECRET}`,
  providers: [
    GoogleProvider({
      clientId: `${process.env.NEXTAUTH_GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  session: {
    maxAge: 400 * 60 * 60,
  },

  callbacks: {
    async signIn({ profile, session }) {
      const response = await fetch(`${baseUrlBackend}/auth/googleSignUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const userAccount = await response.json();
      // console.log(userAccount);
      if (userAccount) {
        UserUID = userAccount.uid;
        return true;
      } else {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (UserUID) {
        token.uid = UserUID;
      }
      return token;
    },

    async session({ session, token }) {
      // Use the information from the JWT to enrich the session
      session.user.id = token.uid;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.picture = token.picture;
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
