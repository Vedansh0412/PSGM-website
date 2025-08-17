"use client";

import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  // Lock scroll when loader is active
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; // disable scroll
    return () => {
      document.body.style.overflow = originalStyle; // restore scroll
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "#ffffff", // Solid white background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography
        variant="body1"
        sx={{ mt: 2, fontWeight: 500, color: "text.primary" }}
      >
        Fetching details...
      </Typography>
    </Box>
  );
}
