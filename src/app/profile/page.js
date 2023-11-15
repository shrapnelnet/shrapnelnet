"use client"
import Navbar from "@/components/Navbar"
import { Box, Typography, Avatar, Button } from "@mui/material"
import { IBM_Plex_Mono, Roboto } from "next/font/google"
import { useState, useEffect, useRef } from "react"
import { getProfilePicture, getUsername } from "@/api/GetUserInfo"
import IsLoggedIn from "@/api/IsLoggedIn";
import { useRouter } from "next/navigation"
import Logout from "@/api/Logout"

const plex = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: "400"
})

const roboto = Roboto({
    subsets: ["latin"],
    weight: "400"
})

export default function Profile() {
    const isInitialMount = useRef(true)
    const [username, setUsername] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [changeUsernamePressed, setChangeUsernamePressed] = useState(null)
    const [doLogOut, setDoLogOut] = useState(false)
    const router = useRouter()

    useEffect(() => {
        IsLoggedIn()
            .then((res) => {
                if (!res) {
                    router.push("/")
                }
            })

        getUsername()
            .then((res) => {
                setUsername(res)
            })

        getProfilePicture()
            .then((res) => {
                console.log(res)
                setProfilePicture(res)
                console.log(res)
            })
    }, [])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            Logout()
                .then(() => {
                    router.push("/")
                })
        }
    }, [doLogOut])


    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Avatar sx={{ marginRight: "20px", height: "56px", width: "56px" }} src={profilePicture} alt="profile picture" />
                    <Typography variant="h5" className={plex.className}>{username}</Typography>
                </Box>
            </Box>
            <Box className="profile-button-group" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
                <Button onClick={() => { setChangeUsernamePressed(true) }} className={roboto.className} sx={{ color: "white" }}>Change username</Button>
                <Typography sx={{ display: changeUsernamePressed ? "block" : "none", marginTop: "5px" }}>lol no</Typography>
                <Button sx={{ color: "white" }}>Change profile picture</Button>
                <Button onClick={() => { setDoLogOut(true) }} sx={{ color: "red" }}>Log out</Button>
            </Box>
        </>
    )
}