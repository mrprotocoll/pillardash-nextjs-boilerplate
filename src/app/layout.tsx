import type { Metadata } from "next";
import { Mulish } from "next/font/google";

import AppWrapper from "@/components/layouts/AppWrapper";
import CONSTANTS from "@/lib/constants";
import { siteMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

const mulish = Mulish({
    variable: "--font-mulish-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: CONSTANTS.appName,
    url: CONSTANTS.appUrl,
    description: CONSTANTS.description,
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: CONSTANTS.appName,
    url: CONSTANTS.appUrl,
    logo: `${CONSTANTS.appUrl}/icon/android-chrome-512x512.png`,
    sameAs: [CONSTANTS.socials.github].filter(Boolean),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${mulish.variable} `}>
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <AppWrapper>{children}</AppWrapper>
            </body>
        </html>
    );
}
