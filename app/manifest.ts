import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const iconVersion = '20260310-2'

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
        src: `/icon.svg?v=${iconVersion}`,
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: `/favicon.ico?v=${iconVersion}`,
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: `/favicon-32x32.png?v=${iconVersion}`,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: `/apple-touch-icon.png?v=${iconVersion}`,
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['technology', 'portfolio', 'developer'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
