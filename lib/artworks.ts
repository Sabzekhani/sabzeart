import type { Artwork, Exhibition } from '@/types'

export const artworks: Artwork[] = [
  {
    id: '1',
    slug: 'landscape-with-gold-leaf',
    title: 'Landscape with Gold Leaf',
    year: 2023,
    medium: 'Oil and gold leaf on canvas',
    dimensions: '120 × 80 cm',
    series: 'Earth Strata',
    available: true,
    description:
      'A wide, low horizon divides the canvas: a pale silver-blue sky above, a dense mineral earth below. Silhouetted oaks stand in two loose groups along the ridge. The foreground is built up in heavy impasto — dark brown and slate grey interrupted by eruptions of gold leaf that catch and scatter light like oxidised ore veins breaking through bedrock. The texture paste is applied so thickly the surface becomes topographic, the gold leaf tearing and pooling in the valleys between ridges.',
    imageUrl: '/images/artworks/landscape-gold-leaf.jpg',
    width: 1200,
    height: 800,
  },
  {
    id: '2',
    slug: 'the-veiled-figure',
    title: 'The Veiled Figure',
    year: 2023,
    medium: 'Mixed media and gold leaf on canvas',
    dimensions: '100 × 100 cm',
    series: 'Emergence',
    available: true,
    description:
      'A dark silhouette — head, shoulders and neck — rises against an iridescent ground of gold leaf, blue, lavender and sage. The figure is simultaneously present and dissolving: gold leaf fragments break across the face and chest, as though the body is emerging from, or returning to, the luminous field behind it. Two white wing shapes rest at the crown of the head. The background is dense impasto, each colour competing and bleeding, the gold leaf applied in clusters that give the surface a living, cellular quality.',
    imageUrl: '/images/artworks/veiled-figure.jpg',
    width: 1000,
    height: 1000,
  },
  {
    id: '3',
    slug: 'kinetic-study-i',
    title: 'Kinetic Study I',
    year: 2022,
    medium: 'Acrylic, enamel and resin on canvas',
    dimensions: '100 × 100 cm',
    series: 'Kinetic Studies',
    available: true,
    description:
      'The entire surface is in motion: black loops and arcs sweep across a ground of deep forest green and steel grey, while white enamel is dripped, thrown and dragged in fine filaments across the composition. Flashes of cadmium orange, crimson and yellow push through the layers. The paint is applied in multiple sessions — poured, gestured, splattered — each layer reacting with the previous. A resin coat seals the surface at peak agitation, preserving the moment of maximum kinetic charge.',
    imageUrl: '/images/artworks/kinetic-study-i.jpg',
    width: 1000,
    height: 1000,
  },
  {
    id: '4',
    slug: 'deep-blue-cosmos',
    title: 'Deep Blue Cosmos',
    year: 2022,
    medium: 'Oil, acrylic and gold leaf on canvas',
    dimensions: '100 × 100 cm',
    series: 'Kinetic Studies',
    available: false,
    description:
      'Deep cobalt and ultramarine dominate — poured, cracked and layered in a technique that recalls both geological strata and galactic nebulae. Gold leaf threads function as fault lines and constellation traces across the blue field. Black gestural arcs cut through the composition at speed. A roughly oval area of white and silver near the centre suggests both a void and a light source — the eye of a storm, or the still point around which all the surrounding energy revolves.',
    imageUrl: '/images/artworks/deep-blue-cosmos.jpg',
    width: 1000,
    height: 1000,
  },
  {
    id: '5',
    slug: 'silver-root',
    title: 'Silver Root',
    year: 2023,
    medium: 'Mixed media and silver leaf on canvas',
    dimensions: '100 × 100 cm',
    series: 'Earth Strata',
    available: true,
    description:
      'Seen as if from altitude, a river delta or root system of dark moss-green snakes across a terrain of silver leaf and pale stone. The silver leaf is laid across a textured ground marked by a regular grid — cultivated land, a city plan, a circuit board. At the convergence of the branching forms sits a teal heart-shaped pool. Two tiny figures — meditating Buddhas in red — occupy opposite corners of the composition, impossibly small against the scale of the landscape that surrounds them.',
    imageUrl: '/images/artworks/silver-root.jpg',
    width: 1000,
    height: 1000,
  },
  {
    id: '6',
    slug: 'teal-creature',
    title: 'Teal Creature',
    year: 2022,
    medium: 'Oil and resin on canvas',
    dimensions: '90 × 60 cm',
    series: 'Emergence',
    available: true,
    description:
      'A dense form of teal and viridian occupies the centre of a warm rose-copper ground. The ground itself is heavily craquelured — a network of fine red-brown fracture lines radiating across the pale field like cracked earth or old glaze. The central form is built through impasto, scraping and the pressing of mesh or fabric into wet paint, leaving an imprinted lattice texture. Dark brown gestural marks radiate from the form. The piece hovers between creature and object, between something found and something made.',
    imageUrl: '/images/artworks/teal-creature.jpg',
    width: 900,
    height: 600,
  },
  {
    id: '7',
    slug: 'quiet-harbour',
    title: 'Quiet Harbour',
    year: 2023,
    medium: 'Acrylic, texture paste and ink on canvas',
    dimensions: '80 × 100 cm',
    series: 'Minimal Fields',
    available: true,
    description:
      'A two-field composition. The upper register is pale stone-white, built up in texture paste, then scratched and scraped to suggest weathered render or salt-bleached timber. Small vertical black rectangles punctuate the upper field, suggesting distant masts or architectural forms. A band of burnt sienna divides the canvas. The lower register shifts to a soft celadon that crackles across its surface. Black ink falls in three slow vertical drips through the lower half, anchoring the composition in stillness.',
    imageUrl: '/images/artworks/quiet-harbour.jpg',
    width: 800,
    height: 1000,
  },
  {
    id: '8',
    slug: 'forest-edge',
    title: 'Forest Edge',
    year: 2022,
    medium: 'Acrylic, resin and texture paste on canvas',
    dimensions: '100 × 100 cm',
    series: 'Earth Strata',
    available: true,
    description:
      'A wall of viridian rises against a black sky — dense, textured, alive. The green is applied in multiple overlapping layers, its surface built up with texture paste to suggest moss, bark and canopy depth. White paint is allowed to run down from the top edge in thick, slow streams, creating birch-like verticals. At the base, a wide field of pale cerulean extends forward, its craquelure surface catching ghost reflections of the dark forms above. The composition is silent and monumental.',
    imageUrl: '/images/artworks/forest-edge.jpg',
    width: 1000,
    height: 1000,
  },
  {
    id: '9',
    slug: 'ochre-convergence',
    title: 'Ochre Convergence',
    year: 2023,
    medium: 'Oil, acrylic and resin on canvas',
    dimensions: '100 × 100 cm',
    series: 'Minimal Fields',
    available: true,
    description:
      'Against a warm ochre ground of exceptional smoothness, three green-bordered forms converge in an asymmetric arrangement. The forms recall architectural fragments — an open window, a tilted doorway, a clifftop terrace — but resist any single reading. Each green zone carries a different surface character: crackled, smoothly pigmented, almost translucent. White negative space breathes between and inside the forms. The composition breathes through the tension between the warm, expansive ground and the cool, contained green incidents.',
    imageUrl: '/images/artworks/ochre-convergence.jpg',
    width: 1000,
    height: 1000,
  },
  {
    id: '10',
    slug: 'copper-seam',
    title: 'Copper Seam',
    year: 2023,
    medium: 'Acrylic and texture paste on canvas',
    dimensions: '100 × 100 cm',
    series: 'Minimal Fields',
    available: true,
    description:
      'Four irregular zones of celadon and terracotta are separated by heavy dark lines — recalling stained glass, a geological cross-section, or aerial farmland. Each zone has its own surface character: the upper celadon is soft and clouded, the terracotta zones carry heavy texture paste worked with a knife. Silver leaf fragments beneath the celadon catch the light obliquely. A single thread of sage green descends through the central seam — one quiet note of organic life within the architectural structure.',
    imageUrl: '/images/artworks/copper-seam.jpg',
    width: 1000,
    height: 1000,
  },
]

export const exhibitions: Exhibition[] = [
  { id: '1',  title: 'The Passion to Perform — Permanent Exhibition', venue: 'Gallery, Toronto', city: 'Toronto', country: 'CA', year: 2024, type: 'group' },
  { id: '2',  title: 'Satin Annual Visual Arts Exhibition', venue: 'Farhangestane Saba', city: 'Tehran', country: 'IR', year: 2021, type: 'group' },
  { id: '3',  title: 'War and Peace — Solo Painting Exhibition', venue: 'Farhangestane Saba', city: 'Tehran', country: 'IR', year: 2021, type: 'solo' },
  { id: '4',  title: 'Satin Annual Visual Arts Exhibition', venue: 'Kish Cultural Centre', city: 'Kish', country: 'IR', year: 2021, type: 'group' },
  { id: '5',  title: 'Solo Painting Exhibition', venue: 'Gorveh Gallery', city: 'Tehran', country: 'IR', year: 2018, type: 'solo' },
  { id: '6',  title: 'Selected Oil Painting Gallery', venue: 'Barcelona Art Space', city: 'Barcelona', country: 'ES', year: 2018, type: 'group' },
  { id: '7',  title: 'Light and Architecture Photography Award', venue: 'UPC Barcelona', city: 'Barcelona', country: 'ES', year: 2018, type: 'fair' },
]

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug)
}

export function getRelatedArtworks(current: Artwork, count = 3): Artwork[] {
  const sameSeries = artworks.filter((a) => a.id !== current.id && a.series === current.series)
  const otherSeries = artworks.filter((a) => a.id !== current.id && a.series !== current.series)
  return [...sameSeries, ...otherSeries].slice(0, count)
}
