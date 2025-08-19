"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { testsData } from "../../data/data";

type TestItem = {
  sno: number;
  material: string;
  test: string;
  method: string;
};

// Component that actually uses useSearchParams
function FacilitiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [tests, setTests] = useState<TestItem[]>([]);

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

  const chunkArray = (arr: typeof testsData, size: number) => {
    return arr.reduce((acc: typeof testsData[], _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const categoryRows = chunkArray(testsData, 6);

  return (
    <Container sx={{ py: 6 }}>
      {/* Heading */}
      <Typography
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "1.25rem",
            sm: "1.5rem",
            md: "1.75rem",
          },
        }}
      >
        Facilities & Tests
      </Typography>

      {/* Categories Table */}
      <Box sx={{ mt: 4, mb: 4, overflowX: { xs: "auto", md: "visible" } }}>
        <Paper sx={{ minWidth: { xs: "600px", md: "100%" } }}>
          <Table>
            <TableBody>
              {categoryRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cat, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        border: "none",
                        whiteSpace: "nowrap",
                        padding: "8px",
                        cursor: "pointer",
                        fontWeight:
                          selectedCategory === cat.category ? "bold" : "normal",
                      }}
                      onClick={() => handleCategoryChange(cat.category)}
                    >
                      <input
                        type="radio"
                        checked={selectedCategory === cat.category}
                        readOnly
                        style={{ marginRight: "8px" }}
                      />
                      {cat.category}
                    </TableCell>
                  ))}
                  {row.length < 7 &&
                    Array.from({ length: 7 - row.length }).map(
                      (_, emptyIndex) => (
                        <TableCell
                          key={`empty-${emptyIndex}`}
                          sx={{ border: "none" }}
                        />
                      )
                    )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Tests Table */}
      {tests.length > 0 && (
        <Box sx={{ overflowX: { xs: "auto", md: "visible" } }}>
          <Paper sx={{ mt: 4, minWidth: { xs: "800px", md: "100%" } }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Materials or Products tested
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Component, parameter or characteristic tested / Specific
                    Test Performed / Tests or type of tests performed
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Test Method Specification against which tests are performed
                    and / or the techniques / equipment used
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
        </Box>
      )}
    </Container>
  );
}

// ✅ Wrap FacilitiesContent in Suspense
export default function FacilitiesPage() {
  return (
    <Suspense fallback={<div>Loading facilities...</div>}>
      <FacilitiesContent />
    </Suspense>
  );
}
