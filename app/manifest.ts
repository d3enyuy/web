import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lambiv Gills Dzenyuy Portfolio',
    short_name: 'Lambiv Portfolio',
    description: 'Software engineer focused on backend systems, integrations, and practical product work.',
    start_url: '/',
    display: 'browser',
    background_color: '#0a192f',
    theme_color: '#64ffda',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    categories: ['technology', 'portfolio', 'developer'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
