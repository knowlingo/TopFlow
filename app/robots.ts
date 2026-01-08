import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/builder", "/reports/"],
      },
    ],
    sitemap: "https://topflow.dev/sitemap.xml",
  }
}
