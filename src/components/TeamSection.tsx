"use client";

import { Box, Typography, Avatar, Container, Grid, Paper } from "@mui/material";

const founder = {
  name: "Piyush Sharma",
  designation: "Founder & Director",
  bio: "Mr. Piyush Sharma, the Director of PSGM Testing Lab, brings with him over 30 years of extensive experience in the construction and material testing industry. He previously served as the Proprietor of M/s GITECH Engineers and Consultants, located at E-14, Vikram Colony, Ramghat Road, Aligarh. In 2024, he founded M/s PSGM Testing Lab (OPC) Pvt. Ltd., leading the company under his visionary leadership.",
  photo: "/team/Piyush.jpg",
};

const team = [
  {
    name: "Pankaj Kumar Sharma",
    designation: "Deputy Director - (BE-Civil graduate (1992))",
    bio: "Began his career with Tata Consulting Engineers before starting his own consultancy in 1994. With prestigious recognitions such as Fellow Membership of the Institution of Valuers and Chartered Engineer (India), he brings decades of expertise in construction, consultancy, and valuation services.",
    photo: "/team/pankaj.png",
  },
  {
    name: "Mohammed Umair",
    designation: "Technical Engineer and  Manager - (M.Tech in Geotechnical Engineering)",
    bio: "Ensures every process meets the highest accuracy and quality standards. He leads our skilled team in delivering reliable, accredited results for research, production, and quality assurance needs.",
    photo: "/team/Umair.jpg",
  },
  // {
  //   name: "Emily Johnson",
  //   designation: "Customer Relations Manager",
  //   bio: "Dedicated to client satisfaction and seamless service experience.",
  //   photo: "/team/member3.jpg",
  // },
];

export default function TeamSection() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Founder */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Avatar
          src={founder.photo}
          alt={founder.name}
          sx={{
            width: 200,
            height: 200,
            margin: "0 auto",
            mb: 2,
            "& img": {
              objectFit: "contain", // prevents cropping
              backgroundColor: "#fff", // optional, to avoid transparent edges blending
            },
          }}
        />
        <Typography variant="h5" fontWeight="bold">
          {founder.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {founder.designation}
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 700, margin: "0 auto", mt: 2, textAlign:'justify' }}
        >
          {founder.bio}
        </Typography>
      </Box>

      {/* Other Team Members */}
      <Grid container spacing={4} justifyContent="center">
        {team.map((member, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Avatar
                src={member.photo}
                alt={member.name}
                sx={{
                  width: 150,
                  height: 150,
                  margin: "0 auto",
                  mb: 2,
                  "& img": {
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  },
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {member.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {member.designation}
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 700, margin: "0 auto", mt: 2, textAlign: "justify" }}>{member.bio}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
