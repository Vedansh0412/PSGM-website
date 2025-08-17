"use client";

import { Box, Container,Typography } from "@mui/material";
import TeamSection from "@/components/TeamSection";
import FacilitiesList from "@/components/FacilitiesList";
import { useEffect } from "react";

export default function AboutUs() {

     // Tell Navbar loader to stop when page renders
      useEffect(() => {
        const timer = setTimeout(() => {
          window.dispatchEvent(new Event("loadingComplete"));
        }, 0);
        return () => clearTimeout(timer);
      }, []);
      
  return (
    <>
    <Container sx={{ py: 6 }}>
      {/* Team Info */}
      <TeamSection />

      {/* About the Firm */}
      <Box sx={{ textAlign: "center", maxWidth: 800, margin: "50px auto 0" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          About PSGM Lab
        </Typography>
         <Typography variant="body1" paragraph>
        <strong>Registered Address:</strong> E-14, Vikram Colony, Ramghat Road, Aligarh – 202001
      </Typography>
      <Typography variant="body1" paragraph>
        Established in 2024, <em>M/s PSGM Testing Lab (OPC) Pvt. Ltd.</em> is dedicated to
        serving the construction industry with high-quality material testing services
        for both private and public sector projects.
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to deliver <strong>cost-effective, high-quality</strong> testing
        solutions that ensure quality, durability, and safety in construction materials.
        We take pride in our highly qualified and knowledgeable team, with some
        professionals bringing over 35 years of expertise to the field—guaranteeing
        top-tier service and reliability.
      </Typography>
      </Box>
    </Container>
          {/* Services Section */}
      <FacilitiesList />
      </>
  );
}
