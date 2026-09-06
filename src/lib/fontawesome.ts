import { config } from "@fortawesome/fontawesome-svg-core";

// Prevent Font Awesome from injecting its own <style> tag (avoids
// flash-of-unstyled-icons); we import the CSS explicitly once in layout.tsx.
config.autoAddCss = false;
