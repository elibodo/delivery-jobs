export default function sitemap() {
  const baseUrl = "https://deliveryjobs.com";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/logIn`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/signUp`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/termsAndConditions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contactPage`,
      lastModified: new Date(),
    },
  ];
}
