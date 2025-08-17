"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import Loader from "@/components/Loader";
import { testsData } from "@/data/data";

const chunkArray = (arr: typeof testsData, size: number) => {
  return arr.reduce((acc: typeof testsData[], _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

export default function FacilitiesList() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const categoryRows = chunkArray(testsData, 6);

  const handleCategoryClick = (category: string) => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "auto" }); // ensure instant scroll top
    setTimeout(() => {
      router.push(`/facilities?category=${encodeURIComponent(category)}`);
    }, 800);
  };

  return (
    <Box sx={{ py: 6, maxWidth: "80%", mx: "auto" }}>
      {loading && <Loader />}

      <Typography
        component="h1" // SEO: always renders <h1>
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "1.5rem",  // ≈ h6
            md: "1.75rem", // ≈ h4
          },
        }}
      >
        Our Facilities & Tests
      </Typography>

      {categoryRows.map((row, rowIndex) => (
       <Grid
  container
  spacing={2}
  justifyContent="center"
  key={rowIndex}
  sx={{ mb: 2 }}
>
  {row.map((cat, index) => (
    <Grid size={{xs:6, sm:6, md:2}} key={index}>
      <Button
        variant="contained"
        fullWidth
        onClick={() => handleCategoryClick(cat.category)}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 2,
          height: 50,
          whiteSpace: "normal",
        }}
      >
        {cat.category}
      </Button>
    </Grid>
  ))}

  {row.length < 6 &&
    Array.from({ length: 6 - row.length }).map((_, emptyIndex) => (
      <Grid size={{xs:6, sm:6, md:2}} key={`empty-${emptyIndex}`} />
    ))}
</Grid>

      ))}
    </Box>
  );
}