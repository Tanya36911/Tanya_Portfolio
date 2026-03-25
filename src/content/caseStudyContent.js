export const CASE_STUDIES = {
  installation: {
    slug: 'installation',
    title: 'Scrap Garden',
    subtitle: 'Interactive Installation · Scrap Materials · Arduino · Srishti Manipal · 2025',
    metadata: {
      role: 'Concept, Interaction Design, Arduino Programming',
      team: ['Nibedita Behera', 'Vrisha', 'Sahana'],
      timeline: '2 weeks',
      tools: ['Arduino Uno', 'LED clusters', 'Joystick module', 'Scrap materials'],
      context: 'Art for the 99% — Srishti Manipal',
      status: 'Installed',
    },
    pullQuote: 'Art made from what was already there.',
    sections: {
      brief: {
        eyebrow: 'The Brief',
        body: [
          'Art for the 99% — a course at Srishti Manipal asking us to create public art from entirely discarded and found materials. The only condition: make something anyone could walk up to and experience without being told how.',
          'Concept and interaction design: Tanya Justin. Arduino programming and lighting system: Tanya Justin. Fabrication: collaborative with Nibedita Behera, Vrisha, and Sahana.',
        ],
      },
      origin: {
        eyebrow: 'Where it started',
        imageCaption: 'The first flower — made during a free material exercise.',
        body: [
          'Before there was a brief, there was this. A faculty session — play with metal, there is fabric around, see what happens. I made a flower. Not because I was trying to. Just because that is what the materials wanted to be.',
          'A few days later, walking through the college junkyard looking for scrap, I found a broken street lamp. The housing was the shape of a bud. The stem was already there. The idea was not designed — it was recognised.',
        ],
      },
      process: {
        eyebrow: 'The Making',
        materials: 'Scrap garment fabric · salvaged street lamp · metal wire · Arduino Uno · LED clusters · joystick module',
      },
      interaction: {
        eyebrow: 'The Interaction',
        body: [
          'A joystick sits at the centre of the installation. Each direction corresponds to a different flower. The Arduino reads the input and triggers the LED cluster inside that flower core.',
          'No instructions. No screen. No explanation needed. Pick it up, move it, something lights up. That is the entire interface.',
          'I wanted the interaction to feel like discovery, not operation. The joystick is not labelled. The flowers are not numbered. The only way to understand it is to touch it.',
        ],
      },
      installed: {
        eyebrow: 'Installed',
        title: 'Installed.',
        location: 'Srishti Manipal Institute of Art, Design and Technology · 2025',
        caption: 'Built in collaboration with Nibedita Behera, Vrisha, and Sahana.',
      },
      reflection: {
        eyebrow: 'Reflection',
        body: [
          'The junkyard stopped looking like waste. It started looking like a parts catalogue — things that already had a shape, already had a purpose they had not found yet.',
          'The hardest part was not the Arduino. It was trusting that simple was enough. A joystick. Five flowers. One lights up. I kept wanting to add more until I realised the restraint was the design.',
          'And watching someone pick up the joystick for the first time — not knowing what it does, moving it slowly, then seeing a flower glow — that is the part you cannot prototype.',
        ],
        credit: 'Scrap Garden · Srishti Manipal · 2025',
      },
    },
    nextProject: {
      title: 'Thermal Skin',
      href: '/work/thermal-skin',
    },
    closingStatements: [
      'Recognised in the discarded.',
      'Designed by restraint.',
      'Understood by touch.',
    ],
    closingLinks: [
      { label: '← All work', href: '/#work' },
    ],
  },

  thermalSkin: {
    slug: 'thermal-skin',
    title: 'Thermal Skin',
    subtitle: 'Hackathon · 2nd Place · Radical Simplicity Theme',
    metadata: {
      role: 'Research, Design, Website Development',
      team: ['Sneha Manu Jacob', 'Anusha Nair', 'Abhinav R'],
      timeline: '24 hours',
      tools: ['Figma', 'Netlify', 'Web development'],
      context: 'ENVISION 2026 — SIGCHI Designathon at MAHE',
      status: '2nd Place',
    },
    sections: {
      accomplishments: {
        title: 'What we accomplished.',
        body: [
          "ENVISION 2026 — SIGCHI's designathon at MAHE Bengaluru Campus. Teams had 24 hours to define a speculative problem, build a concept, produce a pitch deck, create a working prototype or website, and present to judges. No mentors in the final round.",
        ],
        stats: [
          { value: '24 hrs', label: 'to build everything' },
          { value: '43', label: 'competing teams' },
          { value: '8', label: 'institutions represented' },
        ],
        deliverablesLabel: 'What we built',
        deliverables: [
          {
            num: '01',
            label: 'Research deck',
            desc: 'VOC data, HVAC market analysis, Indian climate case studies',
            tag: 'Research',
          },
          {
            num: '02',
            label: 'Live website',
            desc: 'thermal-skin.netlify.app, built and deployed within 24 hrs',
            tag: 'Live',
          },
          {
            num: '03',
            label: 'Visual identity',
            desc: 'Logo from scratch, brand system applied across all outputs',
            tag: 'Branding',
          },
          {
            num: '04',
            label: 'Full pitch',
            desc: '10 min presentation + 5 min Q&A with judges',
            tag: 'Presentation',
          },
        ],
      },
      problem: {
        title: 'A moment everyone knows.',
        body: [
          'Cars heat up when parked. Air stays trapped. Returning becomes uncomfortable and unsafe. This discomfort is treated as normal.',
        ],
        stats: [
          { value: '~₹15K', label: 'cost to implement' },
          { value: 'Zero', label: 'power required' },
          { value: '70–95%', label: 'VOC reduction' },
        ],
      },
      concept: {
        eyebrow: 'The Concept',
        title: 'Not a feature. An envelope.',
        body: [
          'A passive system that slows heat entry, avoids heat absorption, and releases what does enter — all while the car is parked. No controls. No sensors. No power.',
        ],
        components: [
          {
            label: 'Glass',
            desc: 'Slows heat entry — infrared-reflective laminated automotive glass, regulation safe.',
          },
          {
            label: 'Material',
            desc: 'Avoids absorption — low-VOC replacements for dashboard, trim, and headliner.',
          },
          {
            label: 'Ventilation',
            desc: 'Releases what enters — passive stack roof vents built into roof rails and shark fin housing.',
          },
        ],
      },
      logo: {
        eyebrow: 'The thinking',
        title: 'Sun. Cooling. Escape.',
        body: [
          'The orange sun rises — hot air always finds a higher level of elevation. The blue arrow represents cooling, airflow rising up. Together the outline forms an asterisk — the symbol for a footnote, a caveat, a condition. Thermal Skin is the asterisk on every hot parked car.',
        ],
      },
      recognition: {
        eyebrow: 'Recognition',
        title: '2nd Place.',
        body: [
          'Hackathon · Radical Simplicity Theme',
          'Team: Tanya Justin, Sneha Manu Jacob, Anusha Nair, Abhinav R',
        ],
        instagramLabel: 'View on Instagram ↗',
        instagramHandle: 'envision.mahe',
      },
    },
    nextProject: {
      title: 'Morpho',
      href: '/work/morpho',
    },
    closingStatements: [
      'Comfort without anticipation.',
      'Safety without interaction.',
      'Cooling without energy.',
    ],
    closingLinks: [
      { label: '← All work', href: '/#work' },
      { label: 'Visit live site →', href: 'https://thermal-skin.netlify.app/', external: true },
    ],
  },

  morpho: {
    slug: 'morpho',
    title: 'Morpho',
    subtitle: 'Biology · Computation · Craft',
    metadata: {
      role: 'Concept, Development, Simulation Design',
      team: null,
      timeline: '10 days',
      tools: ['Python', 'NumPy', 'Streamlit'],
      context: 'Independent project',
      status: 'Live',
    },
    sections: {
      question: {
        eyebrow: 'The Idea',
        title: 'What if your personality had a texture?',
        body: [
          "Alan Turing's 1952 paper on morphogenesis described how simple chemical reactions produce complex natural patterns — leopard spots, zebra stripes, coral formations. Morpho applies those same equations to human personality. You take a short MBTI-style test. The simulation runs. The output is a pattern only your type could produce — and you can crochet it with your hands.",
        ],
        stats: [
          { value: 'MBTI', label: 'personality framework' },
          { value: 'Reaction-Diffusion', label: 'simulation method' },
          { value: '60×60', label: 'crochet grid output' },
        ],
      },
      naturePatterns: {
        eyebrow: 'Patterns in nature',
        title: 'Turing predicted these in 1952. Nature had been running them for millions of years.',
        gallery: [
          { caption: 'Leopard spots' },
          { caption: 'Zebra stripes' },
          { caption: 'Coral formation' },
          { caption: 'Seashell pattern' },
        ],
      },
      science: {
        eyebrow: "Turing's Morphogenesis",
        title: 'Two chemicals. Infinite patterns.',
        body: [
          'An activator chemical self-amplifies and spreads. An inhibitor spreads faster and suppresses it. Their competition, repeated across thousands of iterations, produces stable non-uniform patterns — the same mathematics behind every spot and stripe in nature. Morpho uses these equations as a translation layer between who you are and what you make.',
        ],
        mapping: [
          { label: 'Openness →', value: 'Feed rate F' },
          { label: 'Stability →', value: 'Kill rate k' },
          { label: 'Empathy →', value: 'Diffusion A' },
          { label: 'Spontaneity →', value: 'Noise amplitude' },
        ],
        callout: {
          title: 'Same type. Different pattern. Every time.',
          body: "The simulation uses Perlin noise as its initial seed — a randomness layer that means even two people with identical MBTI types will never produce the same pattern. Your Openness might be the same as someone else's, but your pattern will never be. The noise ensures it.",
        },
      },
      app: {
        eyebrow: 'The Interface',
        title: 'Take the test. Tune the field.',
        body: [
          'Five sliders, each corresponding to an MBTI axis. Move the Extraversion slider and the feed rate shifts — the pattern branches more aggressively. Move Stability and the kill rate changes — forms become denser or dissolve. The simulation runs 4000 steps and yields a final field that belongs to your type and no other.',
        ],
        sliderMap: [
          { axis: 'E — I', fill: '34%', param: 'Feed rate F' },
          { axis: 'S — N', fill: '68%', param: 'Kill rate k' },
          { axis: 'T — F', fill: '55%', param: 'Diffusion A' },
          { axis: 'J — P', fill: '42%', param: 'Noise amp' },
        ],
        sliderNote: 'The sliders in the app mirror these axes directly.',
        tags: ['Python', 'NumPy', 'Streamlit'],
      },
      output: {
        eyebrow: 'What it produces',
        title: 'A pattern. A grid. A palette.',
        gallery: [
          { caption: 'Reaction-diffusion field' },
          { caption: '60×60 crochet grid' },
          { caption: 'Generated yarn palette' },
        ],
        body: [
          'The continuous morphogen field is quantized into a finite pixel grid. Each pixel becomes a stitch. Each value maps to a yarn colour from a curated palette. The output is a CSV you can follow row by row to make something real.',
        ],
        outputs: [
          { label: 'Pattern PNG', desc: 'Full resolution smooth surface, downloadable.' },
          { label: 'Crochet Grid', desc: '60×60 pixel grid, one cell per stitch, colour-coded.' },
          { label: 'Stitch CSV', desc: 'Hex colour per stitch exported row by row for easy following.' },
        ],
      },
      liveExperiment: {
        eyebrow: 'Live experiment',
        title: 'Your personality. Your pattern.',
        body: [
          'Answer five questions mapped to MBTI axes. Choose a yarn palette. Generate a pattern that belongs only to your type. The simulation takes about 30 seconds to run and outputs a pattern you can actually make.',
        ],
        footer: 'Python · NumPy · Streamlit · Reaction-Diffusion Simulation · MBTI Framework',
        cta: 'Try it at morpho.streamlit.app →',
      },
      futureScope: {
        eyebrow: 'What comes next',
        title: 'Wear your personality.',
        body: [
          'The stitch CSV Morpho outputs is a real crochet pattern. The next step is wearable — beanies, tote bags, sweater panels where the surface texture is generated from your MBTI type rather than designed by a human. Every piece would be unrepeatable. Your type has never been crocheted the same way twice.',
        ],
        possibilities: [
          { num: '01', value: 'Personalised beanies and tote bags' },
          { num: '02', value: 'Sweater panels from personality data' },
          { num: '03', value: 'Unrepeatable textiles from psychological profiles' },
        ],
        gallery: [
          { caption: 'Personalised beanie' },
          { caption: 'Crochet tote bag' },
        ],
        note: "Whether or not MBTI is scientifically valid, the pattern it generates through Turing's equations is mathematically unique. The pseudoscience becomes the seed. The simulation makes it real.",
      },
    },
    nextProject: {
      title: 'Urushya',
      href: '/work/urushya',
    },
    closingStatements: [
      'Identity as emergence.',
      'Data as texture.',
      'Code as craft.',
    ],
    closingLinks: [
      { label: '← All work', href: '/#work' },
      { label: 'Try the experiment →', href: 'https://morpho.streamlit.app', external: true },
    ],
  },

  urushya: {
    slug: 'urushya',
    title: 'Urushya',
    subtitle: 'Product Design · Financial Literacy · Mobile App',
    metadata: {
      role: 'UX Research, UI Design, Prototyping',
      team: null,
      timeline: '2 weeks',
      tools: ['Figma', 'Maze', 'User interviews'],
      context: 'Interaction Design course — Srishti Manipal',
      status: 'Prototype',
    },
    sections: {
      problem: {
        eyebrow: 'The Gap',
        title: "Young adults don't know money.",
        body: [
          "Only 27% of Indian adolescents possess basic financial knowledge. 53% take personal loans before turning 30. The resources that exist are either too complex, too boring, or too generic — built for people who already understand finance, not for the ones who need it most. Young adults aren't financially illiterate because they're careless. They're underserved. They want to learn but don't know where to start, feel overwhelmed by jargon, and associate finance with confusion rather than control.",
        ],
        stats: [
          { value: '27%', label: 'possess basic financial knowledge' },
          { value: '53%', label: 'take loans before age 30' },
          { value: '62.9%', label: 'learn finance from family only' },
        ],
      },
      research: {
        eyebrow: 'What We Found',
        title: '8 interviews. 61 surveys. One pattern.',
        body: [
          "We conducted qualitative thematic analysis through 8 in-depth interviews with young adults aged 18–27, and a quantitative ranking analysis through a 61-respondent survey. The findings converged on a clear gap: young adults seek confidence in their financial knowledge, associate finance with confusion, don't know where to start, and prefer short personalized lessons over long theoretical content. Existing tools like NCFE, Money Masters, and ET Money each solve a fragment — gamified lessons, government backing, investment tools — but none address the full journey from zero knowledge to applied confidence.",
        ],
        findings: [
          { label: 'Pain Point', value: "Don’t know where to start" },
          { label: 'Emotion', value: 'Confusion and intimidation' },
          { label: 'Preference', value: 'Short lessons, personalized advice' },
          { label: 'Biggest Barrier', value: 'Insufficient knowledge to invest' },
        ],
      },
      persona: {
        eyebrow: 'Who We Design For',
        title: 'Ana Kumar, 20.',
        body: [
          "Structural engineering student. Wants to invest but doesn't know where to start. Finds finance content too complex or boring. Struggles with impulse tech purchases. Her goal: build a savings account, reduce dependence on her father for strategic financial management, and feel confident making her own money decisions. Ana represents the core user — motivated but unsupported, curious but overwhelmed.",
        ],
        tags: ['Age 18–27', 'Young Professional', 'First-time Investor'],
      },
      solution: {
        eyebrow: 'What We Built',
        title: 'Learn. Apply. Secure.',
        body: [
          "Urushya is a financial literacy app for young adults in India. The name comes from Sanskrit — meaning prosperity, growth. It doesn't assume you know anything. A pre-test tailors your journey. Courses teach through real scenarios. Simulations let you practice. Mentors guide you. An expense tracker makes it daily.",
        ],
        pillars: [
          {
            title: 'Learn',
            desc: 'Build your financial foundation through bite-sized, interactive lessons that make complex concepts simple and engaging.',
          },
          {
            title: 'Apply',
            desc: 'Turn knowledge into action with real-world simulations, budgeting tools, and guided challenges that strengthen confidence.',
          },
          {
            title: 'Secure',
            desc: 'Achieve lasting financial stability by tracking progress, setting goals, and making informed money decisions with clarity and control.',
          },
        ],
      },
      features: {
        eyebrow: 'Key Features',
        title: 'Everything in one place.',
        cards: [
          {
            title: 'Personalised Learning',
            desc: 'Users begin with a quick pre-test and interest setup to create a personalized learning path. They then explore bite-sized, interactive lessons across key financial topics, earning coins as they progress.',
          },
          {
            title: 'U Coins',
            desc: 'Users earn coins by completing lessons, quizzes, and challenges. These coins can be redeemed for mentorship sessions.',
          },
          {
            title: 'Mentors & Community',
            desc: 'Use your earned coins to connect with expert mentors and book one-on-one guidance sessions. Get personalized advice to build confidence and make smarter financial decisions.',
          },
          {
            title: 'Smart Financial Tools',
            desc: 'Track expenses, set savings goals, and monitor your progress with simple budgeting tools and visual dashboards.',
          },
          {
            title: 'Rewards',
            desc: 'Get coupons and perks with your coins.',
          },
          {
            title: 'Gamified Simulations',
            desc: 'Engage with quizzes, challenges, and real-world finance scenarios that turn learning into active, hands-on experience.',
          },
        ],
      },
      screens: {
        eyebrow: 'The Product',
        title: 'Every screen earns your trust.',
        rows: [
          ['Login', 'Pre-test', 'Home'],
          ['Learn', 'Apply', 'Experts'],
          ['Cash Compass', 'Summary', 'Profile'],
        ],
      },
      cashCompass: {
        eyebrow: 'The Financial Tool',
        title: 'Theory into practice.',
        body: [
          'Cash Compass is the built-in budgeting and savings tracker. It integrates with fold.money for real transaction data, or lets users input estimates manually. Weekly and monthly summaries, average spending breakdowns, and progress visualization turn abstract financial concepts into tangible daily habits. Users set savings goals with images and deadlines — a gift for mom, a new car, an SIP investment — and watch their money jar fill up stitch by stitch. Market insights curated to their risk appetite and skill level sit alongside the tracker, connecting what they learn in courses to what they see in the real world.',
        ],
      },
      validation: {
        eyebrow: 'Did It Work',
        title: '4 users. Honest answers.',
        quotes: [
          {
            text: "The screens don’t look intimidating, which is a surprise because finance itself is.",
            attribution: 'Participant 4 · Female, 24',
          },
          {
            text: 'Personally, a tool like this would be very helpful to me — I would use it.',
            attribution: 'Participant 2 · Male, 22',
          },
          {
            text: "I don’t think I would feel dumb using it — the language used looks very deliberate. Asking me if I’m a beginner and redirecting me to the homepage would make me feel comfortable.",
            attribution: 'Participant 1 · Male, 19',
          },
          {
            text: 'I think the navigations put in the app are very intuitive.',
            attribution: 'Participant 1 · Male, 19',
          },
        ],
        stats: [
          { value: '4', label: 'usability test participants' },
          { value: '18–24', label: 'age range tested' },
        ],
      },
      learnings: {
        eyebrow: 'What We Learned',
        title: 'Four tests. Clear patterns.',
        body: [
          'Participants completed core tasks without guidance — onboarding, finding a lesson, checking goals, navigating the dashboard. The navigation was intuitive. The language registered as friendly rather than intimidating. The main friction point was the pre-test flow — users wanted to skip it and explore freely before committing to an assessment.',
        ],
        findings: [
          { label: 'Navigation', value: 'Completed without guidance' },
          { label: 'Language', value: 'Friendly, not intimidating' },
          { label: 'Friction point', value: 'Pre-test felt like a barrier' },
        ],
      },
      futureScope: {
        eyebrow: 'What Comes Next',
        title: 'From prototype to product.',
        body: [
          "The current prototype validates the concept — users feel comfortable, the navigation is intuitive, and the language doesn't intimidate. The next phase is building a production-ready version with a mature design system like Able or Material, running structured usability tests at scale, and bringing in expert perspectives from financial advisors. The goal: a one-stop platform where any young adult in India can go from financially anxious to financially confident.",
        ],
        items: [
          { num: '01', value: 'Production design system and refined UI' },
          { num: '02', value: 'Structured usability testing at scale' },
          { num: '03', value: 'Expert financial advisor consultations' },
        ],
        note: "Financial literacy isn't a feature. It's a fundamental right. The gap exists not because young adults don't care — but because no one built the bridge between curiosity and confidence. Urushya is that bridge.",
      },
    },
    nextProject: {
      title: 'Biometric Particles',
      href: '/work/biometric-particles',
    },
    closingStatements: [
      'Curiosity is not the problem.',
      'The bridge was missing.',
      'Urushya is that bridge.',
    ],
    closingLinks: [
      { label: '← All work', href: '/#work' },
      { label: 'Get in touch →', href: '#contact' },
    ],
  },

  biometricParticles: {
    slug: 'biometric-particles',
    title: 'Biometric Particle Field',
    subtitle: 'TouchDesigner · GSR Sensor · Particle System · 2025',
    metadata: {
      role: 'Creative Coding, Sensor Integration',
      team: null,
      timeline: '2 days',
      tools: ['TouchDesigner', 'Arduino', 'GSR Sensor'],
      context: 'Physical Computing project',
      status: 'Completed',
    },
    pullQuote: 'The body as instrument. The screen as score.',
    sections: {
      system: {
        eyebrow: 'The System',
        body: [
          'A GSR sensor on the skin feeds live conductance values into an Arduino. The Arduino smooths and normalises the signal into a single float — 0.0 to 1.0. TouchDesigner reads that number over serial and drives the particle system directly. No intermediary. Just numbers off skin.',
        ],
        pipeline: [
          { label: 'GSR Sensor', sub: 'skin conductance' },
          { label: 'Oversample', sub: 'averaged per read' },
          { label: 'Smooth', sub: 'rolling buffer' },
          { label: 'Stress Float', sub: 'normalised 0–1' },
          { label: 'TouchDesigner', sub: 'live visual output' },
        ],
      },
      visual: {
        eyebrow: 'The Visual',
        body: [
          "We thought the colours were a glitch. When the same person wore the sensor again, the same colours came back. The system was not random — it was reading something specific to that person's body.",
          'We never designed for that. It just turned out that way.',
        ],
      },
      mapping: {
        eyebrow: 'Parameter Mapping',
        body: [
          'Every visual decision is driven by a single number. Calm reads as slow, wide particles in cool blue tones. Stress compresses the field — particles tighten, speed increases, color temperature shifts to warm. The mapping is not metaphorical. It is direct.',
        ],
        rows: [
          { label: 'Calm (0.0)', value: 'Slow velocity, wide spread, cool hue' },
          { label: 'Neutral (0.5)', value: 'Medium velocity, balanced spread, white' },
          { label: 'Stress (1.0)', value: 'Fast velocity, tight spread, warm hue' },
        ],
      },
      discovery: {
        eyebrow: 'Discovery',
        title: 'Biometric fingerprints.',
        body: [
          'We expected noise. Instead we found consistency. The same person wearing the sensor on different days produced recognisably similar color signatures. Different people produced distinctly different ones. The system was not just visualising arousal levels — it was surfacing something individual.',
        ],
        stats: [
          { value: '3', label: 'participants tested' },
          { value: '5', label: 'sessions each' },
          { value: 'Consistent', label: 'signatures across sessions' },
        ],
      },
      reflection: {
        eyebrow: 'Reflection',
        body: [
          'Mapping a number to a visual is easy. Mapping a feeling to a visual is a design problem. We had to decide what calm looks like and what stress looks like — not metaphorically, but in particle velocity and colour temperature.',
          'This was the first time I built something where the input was a human body in real time. Everything else I have made, the user chooses when to interact. Here, the body is always already interacting.',
        ],
        credit: 'Biometric Particle Field · 2025',
      },
    },
    nextProject: {
      title: 'Installation',
      href: '/work/installation',
    },
    closingStatements: [
      'The body as input.',
      'The screen as mirror.',
      'The data as art.',
    ],
    closingLinks: [
      { label: '← All work', href: '/#work' },
    ],
  },
}

