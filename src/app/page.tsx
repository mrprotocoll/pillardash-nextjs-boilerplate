import type { Metadata } from "next";

import HomePage from "@/app/HomePage";
import CONSTANTS from "@/lib/constants";

export const metadata: Metadata = {
    title: `Home :: ${CONSTANTS.appName}`,
    description: CONSTANTS.description,
    alternates: {
        canonical: "/",
    },
};

const Page = () => {
    return <HomePage />;
};

export default Page;
