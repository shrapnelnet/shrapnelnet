"use server"

import { verify } from "argon2"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const apikey = process.env.SUPABASE_KEY
const url = process.env.SUPABASE_URL
const jwtsecret = process.env.JWT_SECRET

export default async function Login(username, password) {
    username = username.toLowerCase()
    const res = await fetch(`${url}/rest/v1/USERS?username=eq.${username}&select=hash,uid,profile_picture`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": apikey
        }
    })
    const resParsed = await res.json()
    if (resParsed === undefined || resParsed.length === 0) {
        return { success: false, message: "Account not found. nice one idiot !" }
    }
    const hash = resParsed[0].hash
    const uid = resParsed[0].uid
    const profilePicture = resParsed[0].profile_picture
    const hashMatches = await verify(hash, password)
    if (!hashMatches) {
        return { success: false, message: "Incorrect password. if you're trying to guess mine, i promise you won't." }
    } else {
        const signedJWT = jwt.sign({ uid, username, profilePicture }, jwtsecret, { expiresIn: "24h" })
        await cookies().set("jwt", signedJWT, {
            httpOnly: true,
            sameSite: "lax"
        })
        return { success: true, message: "Logged in! Redirecting..." }
    }
}