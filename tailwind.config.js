/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // 告诉它扫描根目录下的所有 .html 文件
    "./blog/**/*.html" // 也扫描 blog 目录下的所有 .html 文件
  ],
    theme: {
          extend: {
            colors: {
              primary: "#3B82F6",
              secondary: "#10B981",
              dark: "#1F2937",
              light: "#F9FAFB",
            },
            fontFamily: {
              sans: ["Inter", "system-ui", "sans-serif"],
              display: ["Montserrat", "sans-serif"],
            },
          },
        },
  plugins: [],
}