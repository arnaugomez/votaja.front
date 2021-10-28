module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.votaja.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  exclude: ["/sorry", "/ca/sorry", "/es/sorry"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sorry", "/ca/sorry", "/es/sorry"],
      },
    ],
  },
};
