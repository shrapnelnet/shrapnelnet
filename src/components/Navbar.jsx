import { Box, Button, Collapse, IconButton, List, ListItemButton, ListItemText, Typography, LinearProgress } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState, useEffect } from "react";
import { IBM_Plex_Mono, Roboto } from "next/font/google"
import Link from "next/link"
import IsLoggedIn from "@/api/IsLoggedIn"

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"]
})

const plex = IBM_Plex_Mono({
    weight: "400",
    subsets: ["latin"]
})

export default function Navbar() {
    const [menuExpanded, setMenuExpanded] = useState(false)
    const [linearProgressVisible, setLinearProgressVisible] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        IsLoggedIn()
            .then((res) => {
                setLoggedIn(res)
            })
    }, [])

    const expandMenu = () => {
        setMenuExpanded(!menuExpanded)
    }

    const displayLoadingBar = () => {
        setLinearProgressVisible(true)
        setTimeout(() => {
            setLinearProgressVisible(false)
        }, 1000)
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignContent: "center", background: "#111", padding: "2%", boxShadow: "#333 1px 1px 2px", marginBottom: "1px" }}>
                <IconButton className="menuBreakpoint" onClick={expandMenu} aria-label="menu">
                    <MenuIcon sx={{ color: "white", marginTop: "10px" }} />
                </IconButton>
                <Box className="nav-container" sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flex: 1 }}>
                    <Link onClick={displayLoadingBar} href="/">
                        <Button className={roboto.className} sx={{ color: "white" }}>Home</Button>
                    </Link>
                    <Button className={roboto.className} sx={{ color: "white" }}>Friends</Button>
                </Box>
                <Typography id="title" sx={{ margin: "0 auto" }} className={plex.className} variant={"h3"}>Shrapnelnet</Typography>
                <Box className="nav-container" sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flex: 1 }}>
                    <Button className={roboto.className} sx={{ color: "white" }}>Messages</Button>
                    <Link onClick={displayLoadingBar} href={loggedIn ? "/profile" : "/login"}>
                        <Button className={roboto.className} sx={{ color: "white" }}>
                            {
                                loggedIn ?
                                    <>
                                        Account
                                    </> :
                                    <>
                                        Log In
                                    </>
                            }
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Collapse className="menuBreakpoint" in={menuExpanded}>
                <Box sx={{ width: "100vw", background: "#111", position: "relative", zIndex: "1051" }}>
                    <List>
                        <Link onClick={displayLoadingBar} href="/">
                            <ListItemButton>
                                    <ListItemText>Home</ListItemText>
                            </ListItemButton>
                        </Link>
                        <ListItemButton>
                            <ListItemText>Friends</ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText>Messages</ListItemText>
                        </ListItemButton>
                        <Link onClick={displayLoadingBar} href={loggedIn ? "/profile" : "/login"}>
                            <ListItemButton>
                                <ListItemText>
                                    {
                                        loggedIn ?
                                            <>
                                                Account
                                            </> :
                                            <>
                                                Log In
                                            </>
                                    }
                                </ListItemText>
                            </ListItemButton>
                        </Link>
                    </List>
                </Box>
            </Collapse>
            <LinearProgress sx={{ display: linearProgressVisible ? "block" : "none", zIndex: "1052" }} />
        </>
    )
}