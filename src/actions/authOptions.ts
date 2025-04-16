import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { cookies } from "next/headers";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID!,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        // }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                try {
                    const token = account.id_token || account.access_token as string;
                    // console.log(token, "⌚ token")
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauth-login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token,
                            provider: account.provider
                        }),
                        credentials: 'include'
                    });
                    const { data } = await response.json();
                    // console.log({ data }, "🟢 data")
                    if (data.token && data.refreshToken) {
                        const cookieStore = await cookies();
                        cookieStore.set("token", data.token, {
                            httpOnly: true,
                            maxAge: 15 * 60, // 15 minutes
                            path: "/",
                            sameSite: "strict",
                            secure: process.env.NODE_ENV === "production",
                        });
                        cookieStore.set("__refreshToken", data.refreshToken, {
                            httpOnly: true,
                            maxAge: 30 * 24 * 60 * 60 * 1000,
                            path: "/",
                            sameSite: "strict",
                            secure: process.env.NODE_ENV === "production",
                        });
                    }



                } catch (error) {
                    console.log("OAuth Backend Login Failed", error);
                }
            }
            return token;
        },


    },
    secret: process.env.NEXTAUTH_SECRET, // Use a strong secret
    session: {
        strategy: "jwt", // Store session in JWT (more secure)
    },
}