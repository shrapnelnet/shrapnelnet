"use client"
import Navbar from "@/components/Navbar"
import Entry from "@/components/Entry"
import Post from "@/components/Post"
import PostSkeleton from "@/components/PostSkeleton"
import IsLoggedIn from "@/api/IsLoggedIn"
import {useEffect, useState} from "react"
import { Box, Button, Typography, CircularProgress } from "@mui/material"
import GetGlobalFeed from "@/api/GetGlobalFeed"

export default function Index() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [postOffset, setPostOffset] = useState(0)
    const [posts, setPosts] = useState([])
    const [showButton, setShowButton] = useState(true)
    const [endOfPosts, setEndOfPosts] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        IsLoggedIn()
            .then((res) => {
                setIsLoggedIn(res)
            })
            .then(() => {
                handleLoadMorePosts()
            })
    }, [])

    const handleLoadMorePosts = () => {
        setShowLoading(true)
        GetGlobalFeed(postOffset)
            .then((res) => {
                if (res.length < 10) {
                    setShowButton(false)
                    setEndOfPosts(true)
                }
                setPostOffset(postOffset + 10)
                setPosts([...posts, ...res])
                setShowLoading(false)
            })
    }

    return (
        <>
            <Navbar />
            <Entry />
            {
                posts.length === undefined || posts.length === 0 && isLoggedIn === true ?
                        <>
                            <PostSkeleton />
                            <PostSkeleton />
                            <PostSkeleton />
                        </>
                        :
                        isLoggedIn ?
                            <>
                                {
                                    posts ?
                                        posts.map((post, index) => (
                                            <Post date={post.date} author={post.username} content={post.content} profilePicture={`https://wbjetausvsqfuudlrdpo.supabase.co/storage/v1/object/public/profile-pictures${post.profilePicture}`} key={index}  />
                                        )) :
                                        null
                                }
                                <Box sx={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
                                    <Button sx={{ display: showButton ? "block" : "none", marginRight: "20px" }} onClick={handleLoadMorePosts} variant="contained">Load More</Button>
                                    {
                                        showLoading ?
                                            <CircularProgress />
                                            :
                                            null
                                    }
                                </Box>
                                <Typography display={endOfPosts ? "block" : "none"} sx={{ textAlign: "center", margin: "40px" }}>Nowhere but up from here...</Typography>
                            </>
                            :
                            <Typography sx={{ textAlign: "center", margin: "40px" }}>Make an account to create and view posts.</Typography>
            }
        </>
    )
}