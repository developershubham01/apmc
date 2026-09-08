import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kirti Rana | President — Navi Mumbai Merchants Chamber",
    short_name: "Kirti Rana",
    description: "Official portal of Kirti Rana, President of Navi Mumbai Merchants Chamber (APMC Vashi), Trade Leader and Philanthropist.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1F3A",
    theme_color: "#0B1F3A",
    icons: [
      {
        src: "/images/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
