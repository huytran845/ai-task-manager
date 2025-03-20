// Explicit Type Import to avoid unnecessary Javascript in runtime.
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        cardForeground: 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        popoverForeground: 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        primaryForeground: 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        secondaryForeground: 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        mutedForeground: 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        accentForeground: 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        destructiveForeground: 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart1: 'hsl(var(--chart-1))',
        chart2: 'hsl(var(--chart-2))',
        chart3: 'hsl(var(--chart-3))',
        chart4: 'hsl(var(--chart-4))',
        chart5: 'hsl(var(--chart-5))',
        sidebarBackground: 'hsl(var(--sidebar-background))',
        sidebarForeground: 'hsl(var(--sidebar-foreground))',
        sidebarPrimary: 'hsl(var(--sidebar-primary))',
        sidebarPrimaryForeground: 'hsl(var(--sidebar-primary-foreground))',
        sidebarAccent: 'hsl(var(--sidebar-accent))',
        sidebarAccentForeground: 'hsl(var(--sidebar-accent-foreground))',
        sidebarBorder: 'hsl(var(--sidebar-border))',
        sidebarRing: 'hsl(var(--sidebar-ring))',
      },
    },
  },
  plugins: [],
};

export default config;
