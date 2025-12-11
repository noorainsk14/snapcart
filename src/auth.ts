import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Google from "next-auth/providers/google"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials:{
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request){
   
          await connectDb();
          const email = credentials?.email as string
          const password = credentials?.password as string

           if (!email || !password) return null;

          const user = await User.findOne({email}).select("+password");
           if (!user) return null;

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return null

              return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role
              }
       
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      profile(profile){
        return {
          id: profile.sub,
          name: profile.name ?? profile.email.split("@")[0], 
          email: profile.email,
          image: profile.picture,
        }
      }
    })
  ],
  callbacks:{
    async signIn({user, account}){
      if(account?.provider === "google"){
        await connectDb();

        let dbUser = await User.findOne({email:user.email})
        if(!dbUser){
           dbUser = await User.create({
            name: user.name!,
            email:user.email!,
            image:user.image,
            role: "user"
           })
        }

        user.id = dbUser._id.toString()
        user.role = dbUser.role
      }

      return true
    },

    jwt: async ({ token, user }) => {
  // Initial login
  if (user) {
    token.id = user.id;
    token.name = user.name;
    token.email = user.email;
    token.role = user.role;
  }

  // 🔥 Always fetch fresh user from DB on each JWT call
  const dbUser = await User.findById(token.id);

  if (dbUser) {
    token.role = dbUser.role;
    token.mobile = dbUser.mobile;
    token.name = dbUser.name;
     token.createdAt = dbUser.createdAt;
    token.updatedAt = dbUser.updatedAt;
  }

  return token;
},

session: async ({ session, token }) => {
  if (session.user) {
    session.user.id = token.id as string;
    session.user.name = token.name;
    session.user.email = token.email as string;
    session.user.role = token.role as string;
    session.user.mobile = token.mobile as string;
    session.user.createdAt = token.createdAt;
    session.user.updatedAt = token.updatedAt;
  }
  return session;
},

  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:10*24*60*60
  },
  secret:process.env.AUTH_SECRET

})