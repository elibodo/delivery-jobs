export default function sitemap() {
  const baseUrl = "https://deliveryjobs.com";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/logIn`,
      lastModified: new Date(),
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/signUp`,
      lastModified: new Date(),
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/termsAndConditions`,
      lastModified: new Date(),
      changefreq: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contactPage`,
      lastModified: new Date(),
      changefreq: "yearly",
      priority: 0.5,
    },
  ];
}
