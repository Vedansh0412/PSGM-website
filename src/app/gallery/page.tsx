"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import { galleryData, GalleryItem } from "@/data/galleryData";

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.dispatchEvent(new Event("loadingComplete"));
  }, []);

  const handleOpen = (item: GalleryItem) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gallery
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Explore our office, achievements, and lab equipment.
      </Typography>

      {galleryData.map((section, index) => (
        <div key={index}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mt: 6, mb: 2 }}
          >
            {section.category}
          </Typography>
          <ImageList variant="masonry" cols={3} gap={16}>
            {section.items.map((item) => (
              <ImageListItem
                key={item.id}
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpen(item)}
              >
                {item.type === "image" ? (
                  <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      src={item.src}
                      alt={section.category}
                      loading="lazy"
                    />
                  </Card>
                ) : (
                  <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <CardMedia
                      component="video"
                      src={item.src}
                      controls={false}
                      muted
                      autoPlay
                      loop
                      sx={{ aspectRatio: "16/9" }}
                    />
                  </Card>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      ))}

      {/* Modal Preview */}
      {selectedItem && (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogContent sx={{ p: 0, bgcolor: "black" }}>
            {selectedItem.type === "image" ? (
              <Box
                component="img"
                src={selectedItem.src}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  mx: "auto",
                  display: "block",
                }}
              />
            ) : (
              <Box
                component="video"
                src={selectedItem.src}
                controls
                autoPlay
                sx={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  mx: "auto",
                  display: "block",
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}
