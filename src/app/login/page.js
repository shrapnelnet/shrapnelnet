"use client"
import Navbar from "@/components/Navbar";
import { TextField, Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { useState, useEffect } from "react"
import Login from "@/api/Login"
import { useRouter } from "next/navigation"

export default function ClientLogin() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
        Login(username, password)
            .then((res) => {
                if (res.success) {
                    setError("")
                    setSuccess(res.message)
                    setTimeout(() => {
                        router.push("/")
                    }, 500)
                } else {
                    setSuccess("")
                    setError(res.message)
                }
            })
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    // autocomplete fix. sorry for using DOM methods !
    // (err the vdom is faster 🤓)
    useEffect(() => {
        const initialUsername = document.getElementById("username").value
        const initialPassword = document.getElementById("password").value
        setUsername(initialUsername)
        setPassword(initialPassword)
    }, [])

    return (
        <>
            <Navbar isLoggedIn={false} />
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
                <TextField id="username" onChange={handleUsernameChange} autoComplete="username" required name="username" sx={{ width: "20%" }} label="Username"></TextField>
                <TextField id="password" onChange={handlePasswordChange} autoComplete="password" required type="password" name="password" sx={{ width: "20%", marginTop: "25px" }} label="Password"></TextField>
                <Button onClick={handleLogin} type="submit" variant="contained" sx={{ width: "20%", margin: "25px 0", padding: "10px 0" }}>Log In</Button>
                <Link href={"/register"}>Or register...</Link>
                <Typography sx={{ marginTop: "20px" }} color={"#00d000"}>{success}</Typography>
                <Typography color={"red"}>{error}</Typography>
            </Box>
        </>
    )
}