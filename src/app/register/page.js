"use client"
import { Button, Box, TextField, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Register from "@/api/Register";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterClient() {
    const router = useRouter()

    const [success, setSuccess] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")

    const handleFormSubmit = () => {
        if (!(username || password || passwordConfirm)) {
            return
        }
        if (password !== passwordConfirm) {
            setError("Your passwords didnt match dummy ! try again.")
        }
        setError("")
        Register(username, password)
            .then((res) => {
                if (!res.success) {
                    setSuccess("")
                    setError(res.message)
                } else {
                    setError("")
                    setSuccess(res.message)
                    setTimeout(() => {
                        router.push("/login")
                    }, 1000)
                }
            })
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value)
    }

    return (
        <>
            <Navbar isLoggedIn={false} />
                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
                    <TextField id="username" onChange={handleUsernameChange} autoComplete="username" required name="username" sx={{ width: "20vw" }} label="Username"></TextField>
                    <TextField id="password" onChange={handlePasswordChange} required autoComplete="new-password" type="password" name="password" sx={{ width: "20%", marginTop: "25px" }} label="Password"></TextField>
                    <TextField id="passwordconfirm" onChange={handlePasswordConfirmChange} required autoComplete="off" type="password" name="passwordconfirm" sx={{ width: "20%", marginTop: "25px" }} label="Confirm Password"></TextField>
                    <Button onClick={handleFormSubmit} type="submit" variant="contained" sx={{ width: "20%", margin: "25px 0", padding: "10px 0" }}>Register</Button>
                    <Link href={"/login"}>Or log in...</Link>
                    <Typography sx={{ margin: "40px" }}>If you forget your password, you're stuffed. remember it stupido</Typography>
                    <Typography color={"red"}>{error}</Typography>
                    <Typography color={"#00d000"}>{success}</Typography>
                </Box>
        </>
    )
}