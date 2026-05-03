export const cafeCornerTheme = {
  colors: {
    background: "#efe1c5",
    backgroundSoft: "#f7ecd6",
    surface: "#fff7e7",
    surfaceMuted: "#e4d1ac",
    text: "#2f271f",
    textSoft: "#6f5a44",
    accent: "#6f3f24",
    accent2: "#a45332",
    border: "#8b7659",
    highlight: "#fff5ca",
    plantGreen: "#526f34",
    wood: "#8a5a2d",
    terracotta: "#b45f38",
    charcoal: "#2a2621"
  },
  radius: {
    soft: "0.5rem",
    round: "999px"
  },
  shadow: {
    soft: "0 18px 40px rgba(47, 39, 31, 0.14)",
    lifted: "0 22px 52px rgba(47, 39, 31, 0.18)",
    ink: "0 2px 0 rgba(42, 38, 33, 0.2)"
  },
  spacing: {
    pageX: "clamp(1rem, 4vw, 2rem)",
    sectionY: "clamp(3rem, 8vw, 6.5rem)"
  },
  texture: {
    paper:
      "radial-gradient(circle at 18% 20%, rgba(255, 245, 202, 0.45), transparent 24%), radial-gradient(circle at 80% 0%, rgba(164, 83, 50, 0.18), transparent 28%), linear-gradient(135deg, rgba(82, 111, 52, 0.1), transparent 38%)",
    wash:
      "radial-gradient(circle at 20% 12%, rgba(255, 247, 231, 0.72), transparent 26%), radial-gradient(circle at 82% 28%, rgba(180, 95, 56, 0.18), transparent 28%), radial-gradient(circle at 28% 78%, rgba(82, 111, 52, 0.2), transparent 30%)"
  }
} as const;

export type CafeCornerTheme = typeof cafeCornerTheme;
