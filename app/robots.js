export default function robots() {
  const baseUrl = "https://deliveryjobs.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/logIn", "/signUp", "/termsAndConditions", "/contactPage"],
      disallow: "/private/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
