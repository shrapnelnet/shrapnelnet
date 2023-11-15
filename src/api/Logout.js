"use server"

import { cookies } from "next/headers"

export default async function Logout() {
    await cookies().delete("jwt")
}