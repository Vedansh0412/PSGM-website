"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader";
import logo from "../../public/psgmLogo.png"; // place your logo in /public/logo.png

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    setDrawerOpen(false); // close drawer after navigation
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
          <Box
            sx={{ display: "flex", flexDirection:'column', alignItems: "center", cursor: "pointer" }}
            onClick={() => handleNavClick("/")}
          >
            <Image src={logo} alt="PSGM Logo" width={60} height={70} />
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
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

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "primary.main",
            color: "white",
            height: "100vh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ textAlign: "center" }}>
          {navItems.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton onClick={() => handleNavClick(item.href)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
