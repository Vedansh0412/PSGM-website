"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { testsData } from "../../data/data"; // Ensure testsData follows the new shape

type TestItem = {
  sno: number;
  material: string;
  test: string;
  method: string;
};

export default function FacilitiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [tests, setTests] = useState<TestItem[]>([]);

  // Tell Navbar loader to stop when page renders
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("loadingComplete"));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      const categoryData = testsData.find(
        (cat) => cat.category.toLowerCase() === categoryFromUrl.toLowerCase()
      );
      if (categoryData) setTests(categoryData.tests);
    }
  }, [searchParams]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    router.push(`/facilities?category=${encodeURIComponent(value)}`);
    const categoryData = testsData.find(
      (cat) => cat.category.toLowerCase() === value.toLowerCase()
    );
    if (categoryData) setTests(categoryData.tests);
  };


  // Split categories into rows of max 7
  const chunkArray = (arr: typeof testsData, size: number) => {
    return arr.reduce((acc: typeof testsData[], _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const categoryRows = chunkArray(testsData, 6);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Facilities & Tests
      </Typography>

        {/* Categories Table (Radio Buttons) */}
      <Paper sx={{ mt: 4, mb: 4 }}>
        <Table>
          <TableBody>
            {categoryRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cat, index) => (
                  <TableCell
                    key={index}
                    sx={{ border: "none", whiteSpace: "nowrap", padding: "8px" }}
                  >
                    <Radio
                      checked={selectedCategory === cat.category}
                      onChange={() => handleCategoryChange(cat.category)}
                      value={cat.category}
                    />
                    {cat.category}
                  </TableCell>
                ))}
                {/* Fill remaining cells in row with empty ones for symmetry */}
                {row.length < 7 &&
                  Array.from({ length: 7 - row.length }).map((_, emptyIndex) => (
                    <TableCell key={`empty-${emptyIndex}`} sx={{ border: "none" }} />
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>


      {/* Category Radio Buttons */}
      {/* <RadioGroup
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        row
        sx={{
          flexWrap: "wrap",
          gap: 2,
          my: 3,
        }}
      >
        {testsData.map((cat, index) => (
          <FormControlLabel
            key={index}
            value={cat.category}
            control={<Radio />}
            label={cat.category}
          />
        ))}
      </RadioGroup> */}

      {/* Tests Table */}
      {tests.length > 0 && (
        <Paper sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Materials or Products tested</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Component, parameter or characteristic tested / Specific Test Performed / Tests or type of tests performed
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Test Method Specification against which tests are performed and / or the techniques / equipment used
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test, i) => (
                <TableRow key={i}>
                  <TableCell>{test.sno}</TableCell>
                  <TableCell>{test.material}</TableCell>
                  <TableCell>{test.test}</TableCell>
                  <TableCell>{test.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
