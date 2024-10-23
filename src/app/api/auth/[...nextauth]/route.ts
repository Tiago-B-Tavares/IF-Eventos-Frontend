import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { api } from "../../../../services/setupApiClient";
import bcrypt from "bcryptjs";
import registerNewUser from "@/services/user/registerNewUser";
import getUserData from "@/services/user/getUserDataByEmail";
import UpdateUserData from "@/services/user/updateUserData";
import getUserDataByEmail from "@/services/user/getUserDataByEmail";

const nextAuthOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          console.log("Credenciais inválidas");
          return null;
        }

        const { email, password } = credentials;

        try {

          const signin = await api.post("/session", {
            email,
            password,
          });

          if (signin.status !== 200) return null;

          const user = signin.data;

          return {
            id: user.id,
            name: user.nome,
            email: user.email,
          };
        } catch (error) {
          console.log("Erro na autenticação das credenciais", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {

        try {
          const dataUser = await getUserData(user.email as string);

          if (!dataUser.exists) {
            const randomPassword = Math.random().toString(36).substring(7);
            const hashedPassword = await bcrypt.hash(randomPassword, 12);

            const data = {
              email: user.email as string,
              nome: user.name as string,
              senha: hashedPassword,
              googleId: account.providerAccountId,
            };

            await registerNewUser(data);

            user.id = dataUser.id;
          } else if (dataUser.exists && !dataUser.googleId) {
            const data = {
              id: user.id,
              data: {
                email: user.email,
                googleId: account.providerAccountId,
              },
            };

            await UpdateUserData(data);

            user.id = dataUser.id;
          } else {
            user.id = dataUser.id;
          }


          return true;
        } catch (error) {
          console.error("Erro ao verificar/criar usuário:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;


        const dataUser = await getUserDataByEmail(user.email as string);

        token.role = dataUser.role
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  }
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };