import { Metadata } from "next";

import ogImg from "@public/images/meta-image.png";

import CONSTANTS from "@/lib/constants";

const appName = CONSTANTS.appName;
const baseUrl = CONSTANTS.appUrl;

export const siteMetadata: Metadata = {
    metadataBase: new URL(baseUrl),
    alternates: {
        canonical: "/",
    },
    title: {
        default: `${appName} | ${CONSTANTS.slogan}`,
        template: `%s :: ${appName}`,
    },
    description: CONSTANTS.description,
    keywords: CONSTANTS.keywords,
    robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        googleBot: "index, follow",
    },
    appleWebApp: {
        title: appName,
        statusBarStyle: "black-translucent",
        capable: true,
    },
    openGraph: {
        title: {
            default: appName,
            template: `%s :: ${appName}`,
        },
        description: CONSTANTS.description,
        locale: "en_US",
        url: baseUrl,
        type: "website",
        siteName: appName,
        images: [
            {
                url: ogImg.src,
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: CONSTANTS.slogan + " | " + appName,
        description: CONSTANTS.description,
        images: [ogImg.src],
    },
    manifest: "/icon/site.webmanifest",
    icons: {
        icon: [
            {
                url: "/icon/favicon.ico",
                type: "image/x-icon",
            },
            {
                url: "/icon/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/icon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/icon/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                url: "/icon/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        shortcut: [
            {
                url: "/icon/favicon.ico",
                type: "image/x-icon",
            },
        ],
        apple: [
            {
                url: "/icon/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
            {
                url: "/icon/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/icon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
    },
    applicationName: appName,
    category: "technology",
    creator: CONSTANTS.author.name,
    publisher: CONSTANTS.author.name,
    authors: [CONSTANTS.author],
};
