"use client"
import { Box, Typography, TextField, Fab, Paper, CircularProgress } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { useEffect, useState, useRef } from "react"
import { Roboto } from "next/font/google"
import Post from "@/api/Post"

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"]
})

export default function Entry() {
    const [error, setError] = useState("")
    const [keyCount, setKeyCount] = useState(0)
    const [isMaxLength, setIsMaxLength] = useState(false)
    const [makePost, setMakePost] = useState(false)
    const isInitialMount = useRef(true)
    const [content, setContent] = useState("")

    const handleKeyDown = (event) => {
        const contentRaw = event.target.value
        const len = event.target.value.length
        setContent(contentRaw)
        setKeyCount(len)
    }

    const handlePost = () => {
        if (keyCount > 150 || keyCount === 0) {
            setError("don't even try to post this! dumbass!")
            return
        }
        setMakePost(true)
    }

    useEffect(() => {
        if (keyCount > 150) {
            setIsMaxLength(true)
        } else {
            setIsMaxLength(false)
        }
    }, [keyCount,])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            Post(content)
                .then(() => {
                    // router wasn't working !
                    window.location.reload()
                })
        }
    }, [makePost])

    return (
        <Box className="content" sx={{ margin: "0 auto 20px", width: "50vw" }}>
            <Paper sx={{ padding: "5px 25px 0 25px", margin: "4% auto", maxWidth: "90%" }}>
                <Box sx={{ width: "100%", height: "fit-content", margin: "5% auto", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                    <TextField className="entry" onChange={handleKeyDown} rows="2" variant="outlined" multiline placeholder="Share your awful opinion!"></TextField>
                    <Typography sx={{ color: "red", marginTop: "10px" }}>{error}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ margin: "20px 20px 20px 0" }}>{keyCount}/150</Typography>
                        <Box sx={{ flex: "auto" }}>
                            <CircularProgress size={25} variant="determinate" value={(keyCount / 150) * 100} />
                        </Box>
                        <Fab onClick={handlePost} disabled={isMaxLength} variant="extended" color="primary" sx={{ margin: "20px 0 20px 20px", display: "flex", alignItems: "center" }}>
                            <SendIcon sx={{ marginRight: "5px" }} />
                            <Typography className={roboto.className}>Send</Typography>
                        </Fab>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}