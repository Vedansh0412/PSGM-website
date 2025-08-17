export type GalleryItem = {
  id: number;
  type: "image" | "video";
  src: string;
};

export type GalleryCategory = {
  category: string;
  items: GalleryItem[];
};

export const galleryData: GalleryCategory[] = [
  {
    category: "Our Office",
    items: [
      { id: 2, type: "image", src: "/gallery/9.jpeg" },
      { id: 3, type: "image", src: "/gallery/10.jpg" },
      { id: 4, type: "image", src: "/gallery/13.jpg" },
      { id: 5, type: "image", src: "/gallery/15.jpg" },
    //   { id: 20, type: "video", src: "/gallery/video1.mp4" },
    ],
  },
  {
    category: "Lab Equipment",
    items: [
      { id: 6, type: "image", src: "/gallery/1.jpg" },
      { id: 7, type: "image", src: "/gallery/2.jpg" },
      { id: 8, type: "image", src: "/gallery/3.jpg" },
      { id: 10, type: "image", src: "/gallery/5.jpg" },
      { id: 11, type: "image", src: "/gallery/6.jpg" },
      { id: 12, type: "image", src: "/gallery/8.jpg" },
      { id: 13, type: "image", src: "/gallery/11.jpg" },
      { id: 14, type: "image", src: "/gallery/12.jpg" },
      { id: 15, type: "image", src: "/gallery/14.jpg" },
      { id: 16, type: "image", src: "/gallery/16.jpg" },
      { id: 17, type: "image", src: "/gallery/17.jpg" },
      { id: 18, type: "image", src: "/gallery/18.jpg" },
    ],
  },
  {
    category: "Achievements",
    items: [
      { id: 19, type: "image", src: "/gallery/awards1.jpeg" },
    //   { id: 5, type: "video", src: "/gallery/award-ceremony.mp4" },
    ],
  },
];
