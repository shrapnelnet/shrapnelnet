"use client"

import { Box, Paper, Skeleton } from "@mui/material"

export default function PostSkeleton() {
    return (
        <Paper className="skeleton" sx={{ width: "45vw", height: "200px", margin: "0 auto 20px auto", padding: "1%" }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <Skeleton variant="circular" sx={{ width: "40px", height: "40px", marginRight: "10px" }} />
                <Skeleton variant="rounded" sx={{ width: "75px" }} />
            </Box>
            <Box>
                <Skeleton variant="rounded" sx={{ width: "100%", marginBottom: "10px" }} />
                <Skeleton variant="rounded" sx={{ width: "100%", marginBottom: "10px" }} />
                <Skeleton variant="rounded" sx={{ width: "100%" }} />
            </Box>
        </Paper>
    )
}