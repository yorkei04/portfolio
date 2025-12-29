// Portfolio data - Edit this file to customize your content
export const portfolioData = {
  // Personal Information
  name: 'Kei',
  title: 'Software Engineer',
  location: 'Hong Kong',
  availability: 'Open to coffee chats',
  email: 'hungkeiyau@gmail.com',
  phone: '+852 5313 6347',

  // Hero Section
  hero: {
    greeting: "Welcome to my portfolio, I'm",
    tagline: 'Bridging software & hardware in control',
    description:
      'Software engineer at MTR, developing station computers for Automatic Fare Collection (AFC) systems. Formerly configured SCADA control systems at Hitachi Rail for railway. Passionate about integrating software, electronics, and real-time control systems that power critical infrastructure.\n\nThis portfolio showcases my experience and projects. The site itself is a hands-on exercise in building a responsive web application with Cursor, built on top of a React and Next.js framework originally developed by my friend, Andrew SZE-TO.',
  },

  // Navigation
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],

  // Skills & Technologies
  skills: {
    // Featured professional skills - most relevant and high proficiency
    featured: [
      // Core Languages
      { name: 'JavaScript', level: 95, category: 'Languages', featured: true },
      { name: 'TypeScript', level: 95, category: 'Languages', featured: true },
      { name: 'C#', level: 95, category: 'Languages', featured: true },
      { name: 'Python', level: 85, category: 'Languages', featured: true },
      { name: 'PHP', level: 85, category: 'Languages', featured: true },

      // Frontend
      { name: 'React', level: 95, category: 'Frontend', featured: true },
      { name: 'Next.js', level: 95, category: 'Frontend', featured: true },
      { name: 'Tailwind CSS', level: 90, category: 'Frontend', featured: true },
      { name: 'Flutter', level: 85, category: 'Frontend', featured: true },

      // Backend
      { name: 'Laravel', level: 85, category: 'Backend', featured: true },
      { name: 'Node.js', level: 85, category: 'Backend', featured: true },

      // Specializations (Game Dev + AI)
      { name: 'Unity', level: 95, category: 'Specialization', featured: true },
      {
        name: 'Computer Vision',
        level: 85,
        category: 'Specialization',
        featured: true,
      },

      // DevOps
      { name: 'Docker', level: 80, category: 'DevOps', featured: true },
      { name: 'AWS', level: 75, category: 'DevOps', featured: true },
    ],

    // Complete skills list
    languages: [
      { name: 'Python', level: 90, category: 'Languages' },
      { name: 'C++', level: 85, category: 'Languages' },
      { name: 'C#', level: 90, category: 'Languages' },
      { name: 'JavaScript', level: 85, category: 'Languages' },
      { name: 'TypeScript', level: 85, category: 'Languages' },
      { name: 'PHP', level: 75, category: 'Languages' },
      { name: 'Kotlin', level: 75, category: 'Languages' },
      { name: 'Dart', level: 80, category: 'Languages' },
      { name: 'Java', level: 75, category: 'Languages' },
    ],
    frontend: [
      { name: 'React', level: 95, category: 'Frontend' },
      { name: 'Next.js', level: 90, category: 'Frontend' },
      { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
      { name: 'HTML/CSS', level: 90, category: 'Frontend' },
      { name: 'Flutter', level: 90, category: 'Frontend' },
    ],
    backend: [
      { name: 'SQL', level: 90, category: 'Backend' },
      { name: 'PostgreSQL', level: 85, category: 'Backend' },
      { name: 'MySQL', level: 85, category: 'Backend' },
      { name: 'MS SQL', level: 85, category: 'Backend' },
      { name: 'Laravel', level: 75, category: 'Backend' },
      { name: 'Node.js', level: 75, category: 'Backend' },
      { name: 'MongoDB', level: 70, category: 'Backend' },
      { name: 'Supabase', level: 75, category: 'Backend' },
    ],
    specialization: [
      // AI/ML
      { name: 'Computer Vision', level: 90, category: 'Specialization' },
      { name: 'AI Agent', level: 85, category: 'Specialization' },
      { name: 'Machine Learning', level: 80, category: 'Specialization' },
      // Game Development
      { name: 'Unity', level: 80, category: 'Specialization' },
      { name: 'Photon API', level: 70, category: 'Specialization' },
      { name: 'VR Development', level: 65, category: 'Specialization' },
    ],
    devops: [
      { name: 'Docker', level: 90, category: 'DevOps' },
      { name: 'Linux', level: 90, category: 'DevOps' },
      { name: 'Shell Script', level: 85, category: 'DevOps' },
      { name: 'Git', level: 90, category: 'DevOps' },
      { name: 'Kubernetes', level: 60, category: 'DevOps' },
      { name: 'AWS', level: 60, category: 'DevOps' },
    ],
    tools: [
      { name: 'VS Code', level: 95, category: 'Tools' },
      { name: 'NeoVim', level: 95, category: 'Tools' },
      { name: 'Android Studio', level: 75, category: 'Tools' },
    ],
  },

  // Featured Projects
  projects: [
    {
      id: '1',
      title: 'Revamp Station Computer to Light Rail',
      description:
        'Revamped the legacy station computer system from Unix SunOS to Debian Linux with a modern UI for station operators. Ensured secure, reliable communication and transaction data flow between entry/exit processors, contactless smart card processor terminals, ticket machines, IT backend, and financial clearing house, while improved user experience for light rail operations.',
      image: '/image/mtr_light_rail.png',
      technologies: [
        'Debian Linux',
        'Unix SunOS Migration',
        'Real-time Data Processing',
        'NFC',
      ],
      liveUrl: '#',
      referenceUrl: '#',
      featured: true,
    },
    {
      id: '2',
      title: 'SCADA HMI & Real-time Database Configuration',
      description:
        'Configured the MTR main control system under M1218-20E for rail tunnel ventilation, building services, signaling, power equipment, etc. Automated the configuration via Shell script, Jenkins and Git. Prepared the software specification, I/O mapping and logic.',
      image: '/image/mcs.png',
      technologies: [
        'MySQL',
        'Web',
        'Red Hat Linux',
        'Bitbucket/Stash',
        'Jenkins',
        'Git',
        'Shell Script',
        'Modbus',
      ],
      liveUrl: '#',
      referenceUrl: 'https://www.mtr.com.hk/en/corporate/tenders/M1218-20E.html',
      featured: true,
    },
    {
      id: '3',
      title: 'Surgical Counting Computer Vision System',
      description:
        'Work with my friend Andrew, collaborated with Blueinno Technology HK to train a surgical counting computer vision model achieving over 99% accuracy. Successfully deployed the model to a cross-platform mobile application built using Flutter for real-world medical applications.',
      image: '/image/surgical.png',
      technologies: [
        'Computer Vision',
        'Machine Learning',
        'CUDA',
        'YOLO',
        'Flutter',
        'Python',
        'Mobile Development',
      ],
      githubUrl: 'https://github.com/zkwokleung/surgical-counting-frontend',
      liveUrl: '#',
      featured: true,
    },
    {
      id: '4',
      title: 'Mechanical Design in CU Robocon Team 2021',
      description:
        'Design and built pick-and-place mechanism for the arrow-shoot with Solidwork, CNC machine, 3D printer, Arduino finite state machine. Won the championship and represent Hong Kong to participate Asia-Pacific Robocon Contest.',
      image: '/image/robocon2.jpg',
      technologies: [
        'SolidWorks',
        'CNC Machining',
        '3D Printing',
        'Arduino',
        'Finite State Machine',
        'Mechanical Design',
        'Robotics',
      ],
      githubUrl: '#',
      liveUrl: '#',
      referenceUrl: 'https://www.cpr.cuhk.edu.hk/en/press/cuhk-robotics-team-wins-again-in-robocon-hong-kong-contest/',
      featured: true,
    },
    {
      id: '5',
      title: 'Personal Portfolio Website',
      description:
        "The site you're looking at is a responsive web application that showcases my experience, featured projects, and background. Built with React and Next.js, it serves as both a living CV and a technical playground where I experiment with modern frontend development and the clear presentation of engineering work. In the future, I plan to extend it with a backend to support more interactive features.",
      image: '/image/kei_portfolio.png',
      technologies: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Responsive Design',
      ],
      githubUrl: '#',
      liveUrl: '#',
      featured: true,
    },
  ],

  // Education
  education: [
    {
      id: '1',
      institution: 'University of Hong Kong (HKU)',
      degree: 'MSc in Electrical and Electronic Engineering',
      duration: 'Sept. 2025 - May 2027',
      location: 'Hong Kong',
      logo: '/image/hku_logo.jpg',
      description:
        'Emphasis on identifying software-driven improvements in power and communication systems.',
      achievements: ['Update Soon...'],
      coursework: [
        'Image Processing and Computer Vision',
        'Smart Grid',
        'Power System',
        'E-commerce',
        'AI in Finance',
      ],
      projects: ['Update Soon...'],
      gpa: 'Update Soon...',
    },
    {
      id: '2',
      institution: 'Chinese University of Hong Kong (CUHK)',
      degree: 'BEng in Computer Engineering',
      duration: 'Sept. 2020 - May 2024',
      location: 'Hong Kong',
      logo: '/image/cuhk_logo.jpg',
      description:
        'Comprehensive engineering program focusing on computer systems, software development, and advanced computing technologies.',
      achievements: [
        'During this program, I joined robotics competition, worked as 3 interns in different companies, summer exchange in Japan, and held Japanese Culture Society',
      ],
      coursework: [
        'C/C++',
        'Data Structure',
        'Software Engineering',
        'Database',
        'Cloud',
        'Operating System',
        'Embedded System',
      ],
      projects: [
        'Applied computer vision and machine learning techniques to medical instrument recognition',
        'Built responsive web application with React similar to this portfolio',
      ],
      gpa: '3.2/4.0',
      image: '/image/robocon.jpeg',
    },
    {
      id: '3',
      institution: 'Institute of Vocational Education (IVE), Tsing Yi',
      degree: 'Higher Diploma in Automotive Engineering',
      duration: '2020',
      location: 'Hong Kong',
      description:
        'Specialized diploma program focusing on automotive engineering principles, vehicle systems, and mechanical engineering fundamentals.',
      achievements: [
        'Achieved Distinction graduation',
        'Gained hands-on experience in automotive systems and mechanical engineering',
      ],
      coursework: [
        'Internal Combustion Engine',
        'Chassis Design',
        'Suspension system',
        'Brake System',
        'Steering System',
        'Transmission System',
        'Electric Vehicle Technology',
      ],
      projects: [
        'Autonomous parking with edge detection via Arduino, Raspberry Pi and OpenCV',
      ],
      gpa: '3.6/4.0',
    },
  ],

  // Work Experience
  experience: [
    {
      id: '1',
      company: 'MTR',
      position: 'Operations Engineering Associate',
      duration: 'Aug 2025 - Present',
      location: 'Hong Kong',
      logo: '/image/mtr_logo.jpg',
      description:
        'Develop Universal Station Computer for Automatic Fare Collection (AFC) System. Ensure the data transaction between smart card processing terminal, entry/exit gates, ticket machines, to the IT backend, Clearing House and Octopus Cards Ltd',
      achievements: [
        'Revamped legacy station computer system from Unix SunOS to Debian Linux for Light Rail',
        'Developed innovative ways to real-time monitor the transaction data',
      ],
      technologies: [
        'Debian Linux',
        'Unix SunOS Migration',
        'Real-time Data Processing',
        'NFC',
      ],
    },
    {
      id: '2',
      company: 'Hitachi Rail',
      position: 'Associate Software Engineer',
      duration: 'May 2024 - Aug 2025',
      location: 'Hong Kong',
      logo: '/image/hitachirail_logo.jpg',
      description:
        'Configured control system for rail tunnel ventilation, building services, signaling, and power lines',
      achievements: [
        'Designed and built Human Machine Interface (HMI) Real-time Database and SCADA control system',
        'Automated configuration processes via Shell script, Jenkins, and Git',
        'Prepared software specification, I/O mapping and logic',
      ],
      technologies: [
        'SCADA',
        'HMI',
        'Real-time Database',
        'MySQL',
        'Shell Script',
        'Jenkins',
        'Git',
        'Bitbucket/Stash',
        'Red Hat Linux',
      ],
    },
    {
      id: '3',
      company: 'MTR',
      position: 'Summer Intern',
      duration: 'June - July 2023',
      location: 'Hong Kong',
      logo: '/image/mtr_logo.jpg',
      description:
        '',
      achievements: [
        'Developed solutions to locate trains from signaling data',
      ],
      technologies: [
        'Python',
        'Data Extraction',
        'Railway Signal Control',
      ],
    },
    {
      id: '4',
      company: 'AECOM',
      position: 'Programmer Trainee (Part-time)',
      duration: 'Sept. 2022 - May 2023',
      location: 'Hong Kong',
      logo: '/image/aecom_logo.jpg',
      description:
        '',
      achievements: [
        'Converted ArcGIS and AutoCAD data into MS SQL database',
      ],
      technologies: [
        'C#',
        '.NET',
        'MS SQL',
        'ArcGIS',
        'AutoCAD',
        'Database Design',
        'Data Migration',
      ],
    },
    {
      id: '5',
      company: 'HKT',
      position: 'IT Intern',
      duration: 'June - Aug. 2022',
      location: 'Hong Kong',
      logo: '/image/hkt_logo.jpg',
      description:
        '',
      achievements: [
        'Experimented with Kafka message queue system on Docker on Linux',
        'Deployed Confluent Kafka, Schema-Registry, Control-Centre, Rest-Proxy, and Connect',
        'Validated the functionality with configurations and Python',
        'Extracted data via Rest-Proxy and Debezium Connector from Google Finance and MySQL',
        'Gained experience in distributed systems and message queuing',
      ],
      technologies: [
        'Kafka',
        'Confluent Kafka',
        'Schema-Registry',
        'Control-Centre',
        'Rest-Proxy',
        'Debezium Connector',
        'Docker',
        'Linux',
        'Python',
        'MySQL',
        'Message Queue',
        'Distributed Systems',
      ],
    },
    {
      id: '6',
      company: 'Kong Kee Motor (光記汽車工程)',
      position: 'Vehicle Mechanic',
      duration: 'Jan. 2017 - Aug. 2020',
      location: 'Hong Kong',
      description:
        '',
      achievements: [
        'Performed vehicle maintenance and repair operations',
        'Diagnosed and resolved automotive system issues',
      ],
      technologies: [
        'Automotive Systems',
        'Vehicle Diagnostics',
        'Mechanical Engineering',
      ],
    },
  ],

  // Social Links
  social: [
    { name: 'GitHub', url: 'https://github.com/yorkei04', icon: 'github' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kei-yau/',
      icon: 'linkedin',
    },
    { name: 'Instagram', url: 'https://www.instagram.com/yorkei04/', icon: 'instagram' },
    { name: 'Email', url: 'mailto:hungkeiyau@gmail.com', icon: 'email' },
  ],

  // About Section
  about: {
    section: {
      title: 'About Me',
      subtitle:
        'A journey across mechanical, electrical, and software engineering.',
      whatIDoTitle: 'What I Do',
      coreTechnologiesTitle: 'Core Technologies',
    },
    paragraphs: [
      'My journey began at the auto repair shop, where I worked as a vehicle mechanic. Through hands-on experience, I observed a fundamental shift: modern vehicles, whether mechanical or electrical, were increasingly controlled by software and electronics. This realization sparked my transition to computer engineering.',
      'I pursued Computer Engineering at the Chinese University of Hong Kong. Initially, I focused on mechatronics, participating in robotics competitions and winning the Robocon Hong Kong Contest 2021. However, I soon discovered that software held far greater potential for improving and controlling complex systems.',
      'Today, I work as a software engineer across various companies, integrating software and hardware in control systems. From developing SCADA and HMI systems for railway control at Hitachi Rail to building universal station computers for AFC systems at MTR, I specialize in bridging the gap between physical infrastructure and software solutions.',
    ],
    skills: [
      'AFC (Automatic Fare Collection) systems',
      'SCADA and HMI system configuration',
      'Real-time database design and implementation',
      'Web application development',
      'Hardware & Software system integration',
    ],
    currentFocus: {
      title: 'Currently Exploring',
      description:
        'Distributed control system design, real-time data processing, and integration of AI in critical infrastructure systems.',
    },
    coreTechnologies: [
      { name: 'Cursor', level: 85 },
      { name: 'Linux', level: 90 },
      { name: 'Python', level: 90 },
      { name: 'Computer Vision', level: 90 },
      { name: 'SQL', level: 90 },
      { name: 'Shell Script', level: 85 },
      { name: 'C++', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Git', level: 90 },
      { name: 'Jenkins', level: 90 },
      { name: 'React', level: 90 },
    ],
    stats: [
      { key: 'experience', value: '2+', label: 'Years Experience' },
      { key: 'projects', label: 'Projects Involved' },
    ],
  },
};

export type PortfolioData = typeof portfolioData;
