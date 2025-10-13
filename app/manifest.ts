import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lambiv Gills Dzenyuy Portfolio',
    short_name: 'Lambiv Portfolio',
    description: 'Software Engineer specializing in laravel, nodejs, neo4j, apache kafka, postgresql, and spring boot',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a192f',
    theme_color: '#64ffda',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['technology', 'portfolio', 'developer'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
