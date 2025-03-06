import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Predefined users - in a real app, this would be in a secure database
const USERS = [
  {
    id: '1',
    email: 'admin@moh.go.ke',
    password: 'Admin@2024',
    name: 'MOH Admin',
    role: 'admin'
  },
  {
    id: '2',
    email: 'supervisor@moh.go.ke',
    password: 'Supervisor@2024',
    name: 'MOH Supervisor',
    role: 'supervisor'
  }
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'MOH Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter both email and password');
          }

          const user = USERS.find(u => 
            u.email === credentials.email && 
            u.password === credentials.password
          );

          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Never send the password to the client
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
