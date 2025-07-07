import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "@/libs/mongoClient"


export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET, // don't actually need this, nextauth detects NEXTAUTH_SECRET automatically
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

