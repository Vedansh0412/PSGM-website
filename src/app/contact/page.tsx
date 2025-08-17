"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { testsData } from "@/data/data";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CustomSnackbar from "@/components/CustomSnackbar";

const officeLocations = [
  {
    name: "Head Office - Aligarh",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.011692174346!2d78.09198867544983!3d27.901614516896416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a4c6c529e48f%3A0xaaba205199ee77bc!2sE-14%2C%20Vikram%20Colony%2C%20Begpur%2C%20Aligarh%2C%20Uttar%20Pradesh%20202122!5e0!3m2!1sen!2sin!4v1754825522351!5m2!1sen!2sin",
  },
  {
    name: "Sample Collection Office - Delhi NCR",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.544432673961!2d77.51528457546661!3d28.433000193113735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc052997d821b%3A0xb71b296a6b3eeb47!2sATS%20Greens%20Paradiso%2C%20Tower%2016%2C%202%20to%20a%20CORE%2C%20Lagerstroemia%20Estate%2C%20Chi%20IV%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201312!5e0!3m2!1sen!2sin!4v1754825793589!5m2!1sen!2sin",
  },
];

export default function ContactUsPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("loadingComplete"));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    categories: [] as string[],
  });
  const [selectAll, setSelectAll] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "warning" | "info",
  });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(category);
      let updatedCategories = exists
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];

      // Condition 1: If selectAll is true and one is unchecked → uncheck selectAll
      if (selectAll && exists) {
        setSelectAll(false);
      }

      // Condition 2: If all are selected manually → check selectAll
      if (updatedCategories.length === testsData.length) {
        setSelectAll(true);
      }

      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setFormData({ ...formData, categories: [] });
      setSelectAll(false);
    } else {
      setFormData({
        ...formData,
        categories: testsData.map((cat) => cat.category),
      });
      setSelectAll(true);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      showSnackbar("Please fill all mandatory fields", "error");
      return;
    }

    try {
      const res = await fetch("/api/sendContactEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showSnackbar("Form submitted successfully!", "success");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          categories: [],
        });
        setSelectAll(false);
      } else {
        showSnackbar("Error submitting form.", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Error sending request.", "error");
    }
  };

  const handleLocationChange = (direction: "prev" | "next") => {
    setLocationIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? officeLocations.length - 1 : prev - 1;
      } else {
        return prev === officeLocations.length - 1 ? 0 : prev + 1;
      }
    });
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side - Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <TextField
              label="Name *"
              fullWidth
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Company / Organization"
              fullWidth
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone Number *"
              fullWidth
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Select All Checkbox */}
            <Box display="flex" flexWrap="wrap" mb={2}>
              <Box width="100%">
                <FormControlLabel
                  control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
                  label="Select All"
                />
              </Box>

              {/* Categories in Two Columns */}
              {testsData.map((cat, idx) => (
                <Box key={idx} width={{ xs: "100%", sm: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.categories.includes(cat.category)}
                        onChange={() => handleCategoryToggle(cat.category)}
                      />
                    }
                    label={cat.category}
                  />
                </Box>
              ))}
            </Box>

            <Box mt={2}>
              <Button variant="contained" onClick={handleSubmit} fullWidth>
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side - Map & Locations */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            {/* Google Map iframe */}
            <Box sx={{ width: "100%", height: "500px" }}>
              <iframe
                src={officeLocations[locationIndex].mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>

            {/* Location Navigation */}
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
              <IconButton onClick={() => handleLocationChange("prev")}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="subtitle1" mx={2}>
                {officeLocations[locationIndex].name}
              </Typography>
              <IconButton onClick={() => handleLocationChange("next")}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
}
