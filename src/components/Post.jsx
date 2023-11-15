import { Avatar, Box, Chip, Typography, IconButton, Paper, Tooltip } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AddComment from "@mui/icons-material/AddComment"
import { useState } from "react"
import Link from "next/link"

export default function Post({ author, date, content, comments, likes, profilePicture }) {
    likes = likes ?? 0
    comments = comments ?? 0
    const [liked, setLiked] = useState(false)
    return (
        <>
            <Box className="content" sx={{ width: "50vw", margin: "0 auto 10px auto" }}>
                <Paper sx={{ maxWidth: "90%", margin: "0 auto" }}>
                        <Box sx={{ padding: "2%", display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ marginRight: "5px" }} src={profilePicture} />
                            <Link href={`/profile/${author}`}>
                                <Chip label={`@${author ?? ""}`} variant={"outlined"} clickable />
                            </Link>
                            <Tooltip title={new Date(date).toLocaleString()}>
                                <Typography sx={{ marginLeft: "auto" }}>{new Date(date).toLocaleDateString()}</Typography>
                            </Tooltip>
                        </Box>
                            <Box sx={{ padding: "15px" }}>
                                <Typography>{content}</Typography>
                            </Box>
                    <Box className="button-group" sx={{ padding: "10px", display: "flex", alignItems: "center" }}>
                        <IconButton>
                            <AddComment />
                        </IconButton>
                        <Typography>{comments}</Typography>
                        <IconButton onClick={() => {setLiked(!liked)}}>
                            {
                                liked ?
                                    <FavoriteIcon sx={{ color: "red" }} />
                                    :
                                    <FavoriteBorderIcon />
                            }
                        </IconButton>
                        <Typography>{likes}</Typography>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}