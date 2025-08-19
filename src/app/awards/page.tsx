"use client";

import { Box, Container, Typography, Grid, Paper, IconButton, Dialog, Button, Stack, CardContent, CardMedia, Card } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import { useState, useEffect } from "react";
import Image from "next/image";
import certificate from "../../../public/certificate-preview.jpeg";

export default function AwardsPage() {
  const [open, setOpen] = useState(false);

  // stop navbar loader when page renders
  useEffect(() => {
    window.dispatchEvent(new Event("loadingComplete"));
  }, []);

  return (    
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Our Achievement
      </Typography>

      <Card sx={{ maxWidth: 900, mx: "auto", boxShadow: 3, borderRadius: 3, marginBottom: 4 }}>
  <CardContent>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      NABL Certified Lab - 2025
    </Typography>
  </CardContent>

  {/* <Grid container spacing={1} sx={{ p: 2 }}> */}
    <Grid size={{xs:12, md:6}} sx={{minWidth: 90, p:2}}>
      <CardMedia
        component="img"
        image="/gallery/awards1.jpeg"
        alt="Receiving Award"
        sx={{
          width: "100%",     // full width of parent
          height: "50%",    // full height of parent Grid cell
          objectFit: "cover", // crop/cover while keeping aspect ratio
          borderRadius: 2,
          boxShadow: 2
        }}
      />
      <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
        Receiving the Award
      </Typography>
    {/* </Grid> */}
  </Grid>
</Card>


      <Paper sx={{ p: 3, boxShadow: 3 }}>
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
                style={{ filter: "blur(2px)", objectFit: "cover" }}
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
                <VisibilityIcon sx={{ fontSize: 30, color: "primary.main" }} />
              </IconButton>
            </Box>
          </Grid>

          {/* Certificate Text */}
          <Grid size={{xs:12, md:7}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              NABL - TESTING CERTIFIED
            </Typography>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              ISO/IEC 17025:2017 Accredited
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 1.8 }}
            >
              Our laboratory holds ISO/IEC 17025:2017 accreditation. The NABL (National Accreditation Board for Testing and 
                Calibration Laboratories) certificate is a formal recognition of a testing laboratory&apos;s technical competence and 
                reliability in performing specific tests.
                This accreditation signifies that a laboratory has demonstrated its ability to produce accurate and reliable test 
                results through a rigorous third-party assessment process conducted by NABL assessors, evaluating aspects such as 
                infrastructure, equipment, personnel competency, quality management systems, and proficiency testing.
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
            p: 2,
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

          {/* Full Certificate Image */}
          <Image
            src={certificate}
            alt="Full ISO Certificate"
            width={800}
            height={1000}
            style={{ objectFit: "contain", display: "block", margin: "auto" }}
          />

          {/* Download Options */}
          <Stack
            direction="row"
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
            >
              Download PDF
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ImageIcon />}
              href={certificate.src}
              download
            >
              Download JPEG
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Container>   
  );
}
