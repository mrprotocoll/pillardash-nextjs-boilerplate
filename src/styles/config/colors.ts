import Color from "color";

import { ColorShades, SystemTheme } from "@/styles/config/types";

export function generateColorShades(baseColor: string): ColorShades {
    const color = Color(baseColor);

    return {
        50: color.mix(Color("#FFFFFF"), 0.92).hex(), // Very light
        100: color.mix(Color("#FFFFFF"), 0.85).hex(), // Light
        200: color.mix(Color("#FFFFFF"), 0.7).hex(), // Light medium
        300: color.mix(Color("#FFFFFF"), 0.5).hex(), // Medium light
        400: color.mix(Color("#FFFFFF"), 0.25).hex(), // Slightly light
        500: color.hex(),
        600: color.darken(0.15).hex(), // Slightly dark
        700: color.darken(0.3).hex(), // Medium dark
        800: color.darken(0.45).hex(), // Dark
        900: color.darken(0.6).hex(),
    };
}

export const applyThemeVariables = (config: SystemTheme) => {
    const root = document.documentElement;

    // Set base colors
    root.style.setProperty("--color-primary", config.primaryColor);
    root.style.setProperty("--color-secondary", config.secondaryColor);

    // Set primary shades
    Object.entries(config.primaryShades).forEach(([key, value]) => {
        root.style.setProperty(`--color-primary-${key}`, value);
    });

    // Set secondary shades
    Object.entries(config.secondaryShades).forEach(([key, value]) => {
        root.style.setProperty(`--color-secondary-${key}`, value);
    });
};
