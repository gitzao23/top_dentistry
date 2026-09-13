import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: clinic.siteUrl, lastModified: now, priority: 1 },
    { url: `${clinic.siteUrl}/implant`, lastModified: now, priority: 0.8 },
    { url: `${clinic.siteUrl}/ortho`, lastModified: now, priority: 0.8 },
  ];
}
