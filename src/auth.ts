import CredentialsProvider from "next-auth/providers/credentials"
import { SuccessLoginResponse, FailedLoginResponse } from "./interfaces/login"
import { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import { getNextAuthSecret } from "./lib/env"


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const payload: SuccessLoginResponse | FailedLoginResponse = await response.json()
                if ('token' in payload) {

                    return {
                        id: payload.user.email,
                        user: payload.user,
                        token: payload.token
                    }
                } else {
                    throw new Error(payload.message)
                }

            }
        })
    ],
    callbacks: {

        jwt({ token, user }) {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        session: ({ session, token }) => {
            session.user = token.user
            session.token = token.token
            return session
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    secret: getNextAuthSecret()
}