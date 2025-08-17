// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CA17A", // PSGM Green
    },
    secondary: {
      main: "#F4C542", // PSGM Yellow
    },
    background: {
      default: "#FAFAFA", // Page background
      paper: "#F0F0F0", // Card/section background
    },
    text: {
      primary: "#333333", // Body text
      secondary: "#1A1A1A", // Dark headings
    },
    divider: "#C4C4C4", // Borders
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
