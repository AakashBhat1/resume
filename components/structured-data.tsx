import { portfolioData, siteConfig } from "@/constants/site";

export function StructuredData() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.personal.name,
    email: portfolioData.personal.email,
    telephone: portfolioData.personal.phone,
    jobTitle: portfolioData.personal.title,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "J.C. Bose University of Science & Technology, YMCA, Faridabad",
    },
    sameAs: [portfolioData.personal.social.github, portfolioData.personal.social.linkedin],
    url: siteConfig.url,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${portfolioData.personal.name} Portfolio`,
    url: siteConfig.url,
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
