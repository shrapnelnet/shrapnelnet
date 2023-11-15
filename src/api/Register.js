"use server"
import { argon2id, hash } from "argon2"

const url = process.env.SUPABASE_URL
const apikey = process.env.SUPABASE_ANON
export default async function Register(username, password) {
    username = username.toLowerCase()
    const computedHash = await hash(password, { type: argon2id })
    const res = await fetch(`${url}/rest/v1/USERS`, {
        method: "POST",
        body: JSON.stringify({ username, hash: computedHash }),
        headers: {
            "Content-Type": "application/json",
            "apikey": apikey
        }
    })
    if (res.status !== 201) {
        return { success: false, message: "Account creation failed! Your username is probably already being used." }
    }
    return { success: true, message: "Account created! Redirecting to login..." }
}