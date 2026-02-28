"use client";

import React, { ReactNode, useEffect } from "react";

import CONSTANTS from "@/lib/constants";
import { applyThemeVariables, generateColorShades } from "@/styles/config/colors";
import { SystemTheme } from "@/styles/config/types";

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    let config: SystemTheme;
    // eslint-disable-next-line prefer-const
    config = {
        primaryColor: CONSTANTS.colors.primary,
        secondaryColor: CONSTANTS.colors.secondary,
        primaryShades: generateColorShades(CONSTANTS.colors.primary),
        secondaryShades: generateColorShades(CONSTANTS.colors.secondary),
    };

    useEffect(() => {
        if (config) {
            applyThemeVariables(config);
        }
    }, [config]);

    return <>{children}</>;
}
