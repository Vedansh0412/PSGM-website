"use client";

import { 
  Box, Container, Typography, Button, Grid, Paper, IconButton, Dialog, Stack 
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import Image from "next/image";
import certificate from "../../public/certificate-preview.jpeg";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 6, sm: 8, md: 10 }, // responsive padding
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2.2rem", md: "2.8rem", lg: "3rem" },
              whiteSpace: {xs:"wrap", sm:"nowrap"},
              textOverflow: "ellipsis",
            }}
          >
            PSGM TESTING LAB (OPC) PVT. LTD.
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            Precision. Quality. Trust.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              mt: 3,
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 1.2 },
            }}
            href="/facilities"
          >
            Explore Our Facilities
          </Button>
        </Container>
      </Box>

      {/* ISO Accreditation Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper sx={{ p: { xs: 2, sm: 3 }, boxShadow: 3 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Certificate Preview */}
            <Grid size={{xs:12, md:5}} sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <Image
                  src={certificate}
                  alt="ISO Certificate"
                  width={400}
                  height={400}
                  style={{
                    filter: "blur(2px)",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={() => setOpen(true)}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "white" },
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: { xs: 24, md: 30 }, color: "primary.main" }} />
                </IconButton>
              </Box>
            </Grid>

            {/* Accreditation Text */}
            <Grid size={{xs:12, md:7}}>
              <Typography
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
              >
                NABL - TESTING CERTIFIED
              </Typography>
              <Typography
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                ISO/IEC 17025:2017 Accredited
              </Typography>
              <Typography
                sx={{
                  textAlign: "justify",
                  lineHeight: 1.8,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Our laboratory holds ISO/IEC 17025:2017 accreditation. The NABL
                (National Accreditation Board for Testing and Calibration
                Laboratories) certificate is a formal recognition of a testing
                laboratory&apos;s technical competence and reliability in
                performing specific tests. This accreditation signifies that a
                laboratory has demonstrated its ability to produce accurate and
                reliable test results through a rigorous third-party assessment
                process conducted by NABL assessors, evaluating aspects such as
                infrastructure, equipment, personnel competency, quality
                management systems, and proficiency testing.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Full Certificate Modal */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
          <Box
            sx={{
              position: "relative",
              bgcolor: "white",
              p: { xs: 1, sm: 2 },
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Certificate Image */}
            <Image
              src={certificate}
              alt="Full ISO Certificate"
              width={800}
              height={1000}
              style={{
                objectFit: "contain",
                display: "block",
                margin: "auto",
                width: "100%",
                height: "auto",
              }}
            />

            {/* Download Options */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              mt={2}
              sx={{
                position: "sticky",
                bottom: 0,
                bgcolor: "white",
                py: 2,
                zIndex: 10,
                borderTop: "1px solid #ddd",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<PictureAsPdfIcon />}
                href="/certificate.pdf"
                download
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                Download PDF
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ImageIcon />}
                href={certificate.src}
                download
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                Download JPEG
              </Button>
            </Stack>
          </Box>
        </Dialog>
      </Container>
    </>
  );
}
