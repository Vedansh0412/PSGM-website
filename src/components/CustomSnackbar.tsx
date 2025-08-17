"use client";

import { Snackbar, Alert, Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  onClose: () => void;
  duration?: number;
}

export default function CustomSnackbar({
  open,
  message,
  severity = "info",
  onClose,
  duration = 5000,
}: CustomSnackbarProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (open) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 100 / (duration / 100) : 0));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [open, duration]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <Box sx={{ width: "100%" }}>
        <Alert
          onClose={onClose}
          severity={severity}
          sx={{ width: "100%", mb: 0, p: "10px 16px" }}
        >
          {message}
        </Alert>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={severity === "success" ? "success" : "error"}
          sx={{ height: 3, borderRadius: 0 }}
        />
      </Box>
    </Snackbar>
  );
}
