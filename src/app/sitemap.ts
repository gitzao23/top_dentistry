import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: clinic.siteUrl, lastModified: now, priority: 1 },
  ];
}
