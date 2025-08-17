"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const stopLoading = () => setLoading(false);
  window.addEventListener("loadingComplete", stopLoading);
  return () => window.removeEventListener("loadingComplete", stopLoading);
}, []);


  const handleNavClick = (href: string) => {

     if (pathname === href) return;

    if (href !== "/") {
      setLoading(true);
      window.scrollTo(0, 0);
      router.push(href);
    } else {
      router.push("/");
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Facilities & Tests", href: "/facilities" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Awards", href: "/awards" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {loading && <Loader />}
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => handleNavClick("/")}
          >
            PSGM
          </Typography>

          {/* Nav Links */}
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  color: "white",
                  marginLeft: 2,
                  position: "relative",
                  overflow: "hidden",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    backgroundColor: "white",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
