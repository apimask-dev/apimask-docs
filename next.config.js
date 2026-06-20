const nextra = require("nextra").default;

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  codeHighlight: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});

module.exports = withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/apis",
        destination: "/api",
        permanent: true,
      },
      {
        source: "/apis/:path*",
        destination: "/api/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "/apis",
      },
      {
        source: "/api/:path*",
        destination: "/apis/:path*",
      },
    ];
  },
});
