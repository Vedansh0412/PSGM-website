"use client";

import { Box, Typography } from "@mui/material";

const clients = [
  "U.P. Jal Nigam, Mathura, Aligarh, Agra, Greater Noida, Firozabad",
  "U.P. Jal Nigam (Construction and Designing Services)",
  "Yamuna Pollution Control U.P. Jal Nigam",
  "Krishi Utpadan Mandi Parishad",
  "Rajkiya Nirman Nigam",
  // "Gandhi Eye Hospital, Aligarh",
  "Akaia Centre, New Delhi",
  // "M.A.J. Hospital, Rampur",
  // "Sai Baba Trust, Aligarh",
  // "Anand Agro Chemical Industries, Aligarh",
  "Development Authorities, Aligarh and Bulandshahr",
  // "Grain Storage Unit, Aligarh",
  "U.P. State Electricity Board (Civil Construction Division)",
  // "Delhi Public School, Aligarh",
  "Police Avas Nigam",
  // "Syed Builders, Aligarh",
  "Bridge Corporation, Aligarh",
  "Department of Telecommunication, Agra",
  "C.P.W.D.",
  "Aligarh Muslim University, Aligarh",
  "Air-Tel, Infratel",
  // "Indus Towers",
  "Idea",
  "Vodaphone",
  "Easter Railway",
  "U.P. Housing and Development Board"
];

export default function ClientsPartners() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Our Clients & Partners
      </Typography>

      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            animation: "scroll 85s linear infinite",
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {/* First set */}
          {clients.map((name, i) => (
            <Box
              key={`set1-${i}`}
              sx={{
                width: "350px",
                mx: 2,
                fontSize: "1rem",
                fontWeight: 500,
                textAlign: "center",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Box>
          ))}
          {/* Second set for seamless looping */}
          {clients.map((name, i) => (
            <Box
              key={`set2-${i}`}
              sx={{
                minWidth: "300px",
                mx: 3,
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              {name}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
