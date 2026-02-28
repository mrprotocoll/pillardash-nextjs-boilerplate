import { MetadataRoute } from "next";

import CONSTANTS from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
    const baseUrl: string = CONSTANTS.appUrl;

    return {
        rules: {
            userAgent: "*",
            allow: ["/"],
            disallow: ["/admin/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
