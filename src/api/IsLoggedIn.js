"use server"
const jwtsecret = process.env.JWT_SECRET
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export default async function IsLoggedIn() {
    const token = cookies().get({ name: "jwt" })
    try {
        jwt.verify(token.value, jwtsecret)
        return true
    } catch {
        return false
    }
}