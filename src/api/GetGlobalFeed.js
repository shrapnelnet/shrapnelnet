"use server"

const url = process.env.SUPABASE_URL
const apikey = process.env.SUPABASE_KEY

function getPostAndUserIDs(offset) {
    return fetch(`${url}/rest/v1/POSTS?order=date.desc&limit=10&offset=${offset}`, {
        headers: {
            "Content-Type": "application/json",
            "apikey": apikey
        },
        cache: "no-cache"
    })
        .then((res) => res.json())

}

async function getPostContent(posts) {
    let postArray = []
    for (const post of posts) {
        const postPromise = await fetch(`${url}/storage/v1/object/posts/${post.post_id}.json`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        })
        const postJSON = await postPromise.json()
        postArray.push(postJSON)
    }
    return postArray
}

async function getMetadata(posts) {
    let metadataArray = []
    for (const post of posts) {
        const postPromise = await fetch(`${url}/rest/v1/USERS?select=username,profile_picture&uid=eq.${post.user_id}`, {
            headers: {
                "Content-Type": "application/json",
                "apikey": apikey
            },
        })
        const metadataJSON = await postPromise.json()
        metadataJSON.date = post.date
        metadataArray.push(metadataJSON)
    }
    return metadataArray
}

async function toPostArray(contentArray, metadataArray) {
    let postArray = []
    for (let i = 0; i < contentArray.length; i++) {
        postArray.push({
            content: contentArray[i].content,
            profilePicture: metadataArray[i][0].profile_picture,
            date: metadataArray[i].date,
            username: metadataArray[i][0].username
        })
    }
    return postArray
}

// WELCOME TO THE TOWER OF POWER
// weird race condition that i couldn't fix with Promise.all happened
// will rewrite when i am smarter
export default async function GetGlobalFeed(offset) {
    const UIDArray = await getPostAndUserIDs(offset)
    const contentArray = await getPostContent(UIDArray)
    const metadataArray = await getMetadata(UIDArray)
    return await toPostArray(contentArray, metadataArray)
}