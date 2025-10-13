export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lambiv Gills Dzenyuy",
    "alternateName": ["Lambiv Dzenyuy", "Lambiv Gills", "Lambiv", "Gills", "Dzenyuy", "Gills Dzenyuy", "Dzenyuy Gills", "Dzenyuy", "Gills Dzenyuy", "Dzenyuy Gills", "Dzenyuy", "Gills Dzenyuy", "Dzenyuy Gills", "Dzenyuy", "Lambiv Gills Dzenyuy", "Lambiv Dzenyuy Gills", "Lambiv Gills Dzenyuy", "Lambiv Dzenyuy Gills"],
    "description": "Software Engineer specializing in Neo4j graph databases, Apache Kafka, PostgreSQL, and Spring Boot",
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
      "addressCountry": "DE",
      "addressRegion": "Germany"
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
      "Neo4j",
      "Apache Kafka", 
      "PostgreSQL",
      "Spring Boot",
      "Java",
      "React",
      "Node.js",
      "Python",
      "Data Science",
      "Graph Databases",
      "Software Engineering",
      "Full Stack Development"
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
    "birthPlace": {
      "@type": "Place",
      "name": "Cameroon"
    },
    "workLocation": {
      "@type": "Place", 
      "name": "Germany"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
