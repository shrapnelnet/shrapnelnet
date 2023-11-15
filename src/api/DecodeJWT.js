"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const jwtsecret = process.env.JWT_SECRET

export default async function DecodeJWT() {
    const token = cookies().get("jwt")
    try {
        return jwt.verify(token.value, jwtsecret)
    } catch(err) {
        console.error(err)
        return undefined
    }
}