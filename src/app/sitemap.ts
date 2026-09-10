import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/about/chamber",
    "/about/bombay-mudibazar",
    "/business",
    "/organizations",
    "/apmc",
    "/achievements",
    "/board",
    "/gallery",
    "/media",
    "/media/events",
    "/media/social-activities",
    "/media/news",
    "/contact",
  ];
  const now = new Date();
  return routes.map((route) => ({
    url: `https://kirtirana.in${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.7 : 0.8,
  }));
}
