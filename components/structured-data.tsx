export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lambiv Gills Dzenyuy",
    "alternateName": ["Lambiv Dzenyuy", "Lambiv Gills", "Lambiv", "Gills Dzenyuy"],
    "description": "Software engineer focused on custom DRM, real-time video, analytics systems, and practical product work",
    "url": "https://lambivgills.com",
    "image": "https://lambivgills.com/face.JPG",
    "sameAs": [
      "https://www.linkedin.com/in/lambiv-dzenyuy/",
      "https://github.com/d3enyuy"
    ],
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Bilin GmbH",
      "url": "https://bilin.dev"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CM"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Buea",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CM"
      }
    },
    "knowsAbout": [
      "Apache Kafka",
      "Apache Druid",
      "Digital Rights Management",
      "Real-time Video",
      "Machine Learning",
      "Telegram API",
      "Payments",
      "LLM Deployment",
      "Neo4j",
      "Meilisearch",
      "Redis",
      "Laravel",
      "Svelte",
      "Soketi",
      "React",
      "Node.js",
      "Software Engineering",
      "Full Stack Development",
      "Product Engineering",
      "Backend Systems"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "ALX-T Data Analyst",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "ALX"
        },
        "dateCreated": "2023"
      },
      {
        "@type": "EducationalOccupationalCredential", 
        "name": "Certificate of Web Dev Bootcamp Completion",
        "credentialCategory": "certification",
        "dateCreated": "2022"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Programming for Data Science with Python",
        "credentialCategory": "certification", 
        "recognizedBy": {
          "@type": "Organization",
          "name": "Udacity"
        },
        "dateCreated": "2022"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Introduction to Cybersecurity",
        "credentialCategory": "certification",
        "dateCreated": "2022"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "JavaScript Algorithms and Data Structures",
        "credentialCategory": "certification",
        "dateCreated": "2021"
      }
    ],
    "email": "gillslambiv@gmail.com",
    "nationality": "Cameroonian",
    "workLocation": {
      "@type": "Place",
      "name": "Remote"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
