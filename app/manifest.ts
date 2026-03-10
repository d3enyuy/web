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
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['technology', 'portfolio', 'developer'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
