"use server"
import { getUID } from "@/api/GetUserInfo"
import { v4 as uuidv4 } from "uuid"
const url = process.env.SUPABASE_URL
const apikey = process.env.SUPABASE_KEY

// we post to 2 endpoints
// the first POST creates object [uuidv4].json
// the second creates a post in the database
// with the same uuid as primary key

export default async function Post(content) {
    const uid = await getUID()
    const postID = uuidv4()
    const storageBody = { content }
    const dbBody = { post_id: postID, user_id: uid }
    try {
        // POST to storage web API
        const storageRes = await fetch(`${url}/storage/v1/object/posts/${postID}.json`, {
            method: "POST",
            body: JSON.stringify(storageBody),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        })
        if (storageRes.status !== 200)
            return false
        const dbRes = await fetch(`${url}/rest/v1/POSTS`, {
            method: "POST",
            body: JSON.stringify(dbBody),
            headers: {
                "Content-Type": "application/json",
                "apikey": apikey
            }
        })
        return dbRes.status === 201;
    } catch(err) {
        console.error(err)
        return false
    }
}