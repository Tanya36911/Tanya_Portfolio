export const ABOUT_MARQUEE_TITLES = [
  'Creative Technologist',
  'Interactive Experience Designer',
]

export const ABOUT_LEFT_STORY_LINES = [
  'Creating thoughtful',
  'interactive experiences',
  'at the intersection of art,',
  'design, and technology',
]

export const ABOUT_RIGHT_STORY_LINES = [
  'I collaborate, adapt, and execute — working across mediums to build systems that are both expressive and intentional.',
  'My process is fluid, shifting between code, design, and prototyping depending on what each idea demands.',
  'I\'m interested in how people interact with systems, and I use that as a starting point to shape thoughtful, engaging experiences.',
]

export const CONTACT_DETAILS = {
  eyebrow: 'Get in touch',
  titleTop: 'TANYA',
  titleAccent: 'MICHELLE JUSTIN',
  email: 'tanyajustin123@gmail.com',
  links: [
    { label: 'tanyajustin123@gmail.com', href: 'mailto:tanyajustin123@gmail.com', type: 'email' },
    { label: '+91 861 851 7903',          href: 'tel:+918618517903',               type: 'phone' },
    { label: 'linkedin.com/in/tanya-justin', href: 'https://www.linkedin.com/in/tanya-justin', type: 'linkedin' },
    { label: 'github.com/Tanya36911',     href: 'https://github.com/Tanya36911',   type: 'github' },
    { label: '@t.artttttt',               href: 'https://instagram.com/t.artttttt', type: 'instagram' },
  ],
}

const INSTALLATION_MEDIA_FALLBACK = '/images/image1.jpg'

export const THERMAL_SKIN_CASE_STUDY = {
  slug: '/work/thermal-skin',
  title: 'Thermal Skin',
  meta: 'Hackathon · 2nd Place · Radical Simplicity Theme',
}

export const MORPHO_CASE_STUDY = {
  slug: '/work/morpho',
  title: 'Morpho',
  meta: 'Biology · Computation · Craft',
}

export const URUSHYA_CASE_STUDY = {
  slug: '/work/urushya',
  title: 'Urushya',
  meta: 'Product Design · Financial Literacy · Mobile App',
}

export const INSTALLATION_CASE_STUDY = {
  slug: '/work/installation',
  title: 'Bloom',
  meta: 'Scrap Fabric · Scrap Metal · Arduino · Interactive Installation · 2024',
  brief:
    'Art for the 99% — a course brief to create public art from entirely discarded and found materials. The only condition: make something anyone could experience without explanation.',
  role:
    'I conceived the installation, designed the petal forms, built and programmed the Arduino interaction system, and designed the lighting response. Fabrication was collaborative with two teammates.',
  origin:
    'I found a broken street lamp in the college junkyard. The housing looked exactly like a flower bud. That was the entire idea — the scrap already knew what it wanted to be.',
  interactionLead:
    'The interaction is simple by design. A joystick. Each direction triggers a different flower. The Arduino reads the input and fires the corresponding LED cluster.',
  interactionDetail:
    'I wanted anyone — including someone who had never touched a circuit board — to understand it within three seconds of picking up the joystick. No instructions. No screen. Just move, and something lights up.',
  installationCaption:
    "Installed at Srishti Manipal Institute of Art, Design and Technology · Interim 2024 · Built in collaboration with Nibedita Behera and [third teammate's name]",
  learning:
    'I learned to read materials differently — the junkyard stopped looking like waste and started looking like a parts catalogue. I also learned that the interaction design matters as much as the object itself. The flowers were beautiful but what made people stay was having something to do.',
  materialsLine:
    'Scrap garment fabric · salvaged street lamp · metal wire · Arduino Uno · LED clusters',
  labels: {
    sketch: 'First sketch — Notes app',
  },
  media: {
    heroVideo: INSTALLATION_MEDIA_FALLBACK,
    heroPoster: INSTALLATION_MEDIA_FALLBACK,
    originSketch: INSTALLATION_MEDIA_FALLBACK,
    originReference: INSTALLATION_MEDIA_FALLBACK,
    timeline: [
      { label: 'Sourcing', src: INSTALLATION_MEDIA_FALLBACK, alt: 'Scrap fabric sourcing still' },
      { label: 'Forming', src: INSTALLATION_MEDIA_FALLBACK, alt: 'Petal forming still' },
      { label: 'Wiring', src: INSTALLATION_MEDIA_FALLBACK, alt: 'Arduino wiring still' },
      { label: 'Assembling', src: INSTALLATION_MEDIA_FALLBACK, alt: 'Assembly still' },
    ],
    interactionVideo: INSTALLATION_MEDIA_FALLBACK,
    interactionPoster: INSTALLATION_MEDIA_FALLBACK,
    installedImage: INSTALLATION_MEDIA_FALLBACK,
  },
}

export const PROJECTS = [
  {
    id: 0,
    num: '01',
    title: 'Scrap Garden',
    category: 'Interactive Installation',
    year: '2025',
    description:
      'Interactive floor installation. Scrap fabric, salvaged metal, Arduino-responsive lighting.',
    tags: ['Physical Computing', 'Interaction Design', 'Arduino', 'Craft'],
    accent: '#111111',
    image: INSTALLATION_CASE_STUDY.media.installedImage,
    video: '/videos/cardVid.mp4',
    href: INSTALLATION_CASE_STUDY.slug,
    cta: 'View Details',
  },
  {
    id: 1,
    num: '02',
    title: THERMAL_SKIN_CASE_STUDY.title,
    category: 'Hackathon · Product Design',
    year: '2025',
    description:
      'A passive car cooling system — IR-reflective glass, low-VOC materials, stack ventilation. Zero power. 2nd place at the Radical Simplicity hackathon.',
    tags: ['Product Design', 'Systems Thinking', 'Sustainability'],
    accent: '#E8632A',
    image: '/images/thermal/thermal_hero.jpg',
    video: '/videos/cardVid2.mp4',
    videoFit: 'contain',
    videoBg: '#07090f',
    href: THERMAL_SKIN_CASE_STUDY.slug,
    cta: 'View Case Study',
  },
  {
    id: 2,
    num: '03',
    title: URUSHYA_CASE_STUDY.title,
    category: 'Product Design · UX',
    year: '2024',
    description:
      'A financial literacy app for young adults in India. Pre-test, bite-sized courses, coin-based mentorship, and a built-in budgeting tool — from zero knowledge to applied confidence.',
    tags: ['Product Design', 'UX Research', 'Mobile App', 'Financial Literacy'],
    accent: '#4FA3E0',
    image: '/videos/Urushya/hero.png',
    href: URUSHYA_CASE_STUDY.slug,
    cta: 'View Case Study',
  },
  {
    id: 4,
    num: '05',
    title: MORPHO_CASE_STUDY.title,
    category: 'Generative Art · Craft',
    year: '2025',
    description:
      "Turing's reaction-diffusion equations applied to MBTI personality types. A simulation that outputs a pattern only your type could produce — and a crochet grid you can make by hand.",
    tags: ['Python', 'NumPy', 'Streamlit', 'Reaction-Diffusion'],
    accent: '#7CFC9A',
    image: '/images/morpho/app_hero.jpg',
    video: '/videos/cardVid3.mp4',
    href: MORPHO_CASE_STUDY.slug,
    liveHref: 'https://morpho.streamlit.app',
    cta: 'View Case Study',
  },
  {
    id: 5,
    num: '06',
    title: 'Biometric Particles',
    category: 'Creative Coding · Interaction',
    year: '2026',
    description:
      'A real-time particle system driven by live GSR sensor data — stress made visible. Each spike in skin conductance sends the field into turbulence.',
    tags: ['TouchDesigner', 'Arduino', 'Generative Art', 'Physical Computing'],
    accent: '#5FC8FF',
    image: '/videos/biometric/heroImage.jpg',
    video: '/videos/cardVid4.mp4',
    href: '/work/biometric-particles',
    cta: 'View Case Study',
  },
]
