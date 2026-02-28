import { MetadataRoute } from "next";

import CONSTANTS from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl: string = CONSTANTS.appUrl;

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];
}
