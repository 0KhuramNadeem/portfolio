// Portfolio constants — Khuram Nadeem (based on real CV)

export const navLinks = [
  { id: 'about',      title: 'About' },
  { id: 'skills',     title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'projects',   title: 'Projects' },
  { id: 'education',  title: 'Education' },
  { id: 'contact',    title: 'Contact' },
];

export const services = [
  {
    title: 'Full Stack Developer',
    icon: '🚀',
    description: 'React.js, Next.js, Node.js, Express.js — end-to-end web applications from concept to deployment.',
  },
  {
    title: 'AI & ML Engineer',
    icon: '🤖',
    description: 'ANN, SVM, Naive Bayes, Graph Search (A*, BFS, DFS, Minimax) — intelligent solutions built from scratch.',
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    description: 'AWS (EC2, S3, RDS, IAM), GCP, Git/GitHub workflows — scalable, production-ready infrastructure.',
  },
  {
    title: '3D Modeling',
    icon: '🎮',
    description: 'Blender 3D modeling, procedural lighting & texturing — from architectural renders to creative assets.',
  },
];

export const technologies = [
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e', level: 90 },
  { name: 'TypeScript',  icon: '🔷', color: '#3178c6', level: 78 },
  { name: 'Python',      icon: '🐍', color: '#3776ab', level: 82 },
  { name: 'React.js',   icon: '⚛️', color: '#61dafb', level: 88 },
  { name: 'Next.js',    icon: '▲',  color: '#ffffff', level: 82 },
  { name: 'Node.js',    icon: '🟢', color: '#339933', level: 84 },
  { name: 'Express.js', icon: '🛣️', color: '#aaaaaa', level: 80 },
  { name: 'Tailwind',   icon: '💨', color: '#06b6d4', level: 90 },
  { name: 'MySQL',      icon: '🗄️', color: '#f29111', level: 78 },
  { name: 'MongoDB',    icon: '🍃', color: '#47a248', level: 74 },
  { name: 'Firebase',   icon: '🔥', color: '#ffca28', level: 76 },
  { name: 'AWS',        icon: '☁️', color: '#ff9900', level: 72 },
  { name: 'C++',        icon: '⚙️', color: '#00599c', level: 70 },
  { name: 'Blender',    icon: '🎨', color: '#ea7600', level: 65 },
  { name: 'Git',        icon: '📦', color: '#f05032', level: 86 },
];

export const experiences = [
  {
    title: 'Lead Web Developer',
    company_name: 'Uriah Welfare Organization',
    date: '2025 – Present',
    location: 'Remote',
    color: '#915eff',
    points: [
      'Operating completely remotely to manage, scale, and maintain organization-wide web infrastructure and portal services.',
      'Architected and developed a comprehensive School Management Admin Panel to digitize student records and monitor daily attendance.',
      'Ensuring high availability, database integrity, and smooth operation of digital tools supporting community outreach programs.',
    ],
  },
  {
    title: 'Co-Founder & Full-Stack Lead',
    company_name: 'KaamAura — kaamaura.com',
    date: '2025 – Present',
    location: 'Lahore, Pakistan',
    color: '#00d9ff',
    points: [
      'Co-founded and engineered the complete web platform for an on-demand home repair & domestic maintenance service in Lahore.',
      'Designed scalable backend APIs, user registration modules, and customer pipelines to manage real-time booking flows.',
      'Collaborating across business and technical workflows to enhance customer conversion and optimize digital operations.',
    ],
  },
  {
    title: 'Web Development Intern',
    company_name: 'Narsun Studio',
    date: 'Summer 2025',
    location: 'Lahore, Pakistan',
    color: '#ff6b6b',
    points: [
      'Developed responsive user interfaces and full-stack modules using Next.js and the MERN stack under senior mentorship.',
      'Integrated backend RESTful endpoints with modern client state management pipelines, speeding up load times.',
      'Maintained codebase documentation through structured Git branch workflows and agile sprint sessions.',
    ],
  },
];

export const projects = [
  {
    name: 'Smart CA — AI Financial Platform',
    description:
      'Automated financial intelligence platform streamlining corporate accounting, billing & tax computations. Built OCR pipeline to extract key metrics from physical receipts/invoices. Firebase backend for auth & real-time sync.',
    tags: ['React.js', 'Next.js', 'Node.js', 'Firebase', 'OCR', 'ML'],
    gradient: 'from-purple-600 to-cyan-500',
    icon: '🧾',
    source_code_link: 'https://github.com/0KhuramNadeem',
    live_link: '#',
    badge: 'Final Year Project',
  },
  {
    name: 'AI Optimization & Graph Search Suite',
    description:
      'Implemented A*, BFS, DFS, and Genetic Algorithms. Developed Adversarial Game Search with Minimax + Alpha-Beta Pruning for strategic computational decision-making.',
    tags: ['Python', 'JavaScript', 'AI', 'Algorithms'],
    gradient: 'from-pink-600 to-purple-600',
    icon: '🧠',
    source_code_link: 'https://github.com/0KhuramNadeem',
    live_link: '#',
    badge: 'Academic Project',
  },
  {
    name: 'Event Management Database System',
    description:
      'Relational database schema supporting scheduling, ticket booking & user management. Complex SQL queries, triggers, stored procedures ensuring ACID transaction safety.',
    tags: ['MySQL', 'SQL', 'Database Design'],
    gradient: 'from-cyan-500 to-blue-600',
    icon: '📅',
    source_code_link: 'https://github.com/0KhuramNadeem',
    live_link: '#',
    badge: 'Database Project',
  },
  {
    name: 'Advanced Data Structures (Trie & Red-Black Trees)',
    description:
      'In-memory prefix search engine using custom Trie structures. Balanced self-sorting Red-Black Trees with guaranteed O(log n) worst-case complexities.',
    tags: ['C++', 'DSA', 'Algorithms'],
    gradient: 'from-yellow-500 to-orange-600',
    icon: '🌲',
    source_code_link: 'https://github.com/0KhuramNadeem',
    live_link: '#',
    badge: 'Core DSA Project',
  },
  {
    name: 'KaamAura — Home Services Platform',
    description:
      'On-demand home repair & maintenance platform with real-time booking flows, scalable APIs, user registration, and customer pipelines. Live production website.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    gradient: 'from-green-500 to-teal-600',
    icon: '🔧',
    source_code_link: 'https://github.com/0KhuramNadeem',
    live_link: 'https://kaamaura.com',
    badge: 'Live Product',
  },
  {
    name: 'Darbar Mahal Baradari — 3D Architecture',
    description:
      'High-fidelity 3D structural recreation of the historical Baradari architectural layout using Blender. Procedural lighting, custom textures, photorealistic renders.',
    tags: ['Blender', '3D Modeling', 'Architecture', 'Rendering'],
    gradient: 'from-red-500 to-pink-600',
    icon: '🏛️',
    source_code_link: 'https://github.com/0KhuramNadeem',
    live_link: '#',
    badge: '3D Modeling',
  },
];

export const education = [
  {
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    institution: 'University of Central Punjab',
    location: 'Lahore, Pakistan',
    period: '8th Semester — Graduating 2027',
    grade: 'CGPA: 3.31 / 4.00',
    icon: '🎓',
    color: '#915eff',
    description: 'ML, AI, Cloud Computing, DSA, Compiler Construction, Database Systems, Information Security, OOP',
  },
  {
    degree: 'Intermediate in Computer Science (ICS Physics)',
    institution: 'Govt College Gulberg',
    location: 'Lahore, Pakistan',
    period: '2020 – 2022',
    grade: 'ICS',
    icon: '📚',
    color: '#00d9ff',
    description: 'Computer Science, Physics, Mathematics',
  },
  {
    degree: 'Matriculation in Biology',
    institution: 'Cathedral School, Church Road',
    location: 'Lahore, Pakistan',
    period: '2018 – 2020',
    grade: 'Matriculation',
    icon: '🏫',
    color: '#ff6b6b',
    description: 'Biology, Mathematics, General Science',
  },
];

export const certifications = [
  {
    name: 'AWS Academy Graduate — Cloud Infrastructure Foundations',
    org: 'Amazon Web Services',
    year: '2025',
    icon: '☁️',
    description: 'EC2, VPC, S3, RDS, IAM, Cloud Security Models',
  },
];

export const socialLinks = [
  { name: 'GitHub',   url: 'https://github.com/0KhuramNadeem',            icon: '🐙' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/khuram-nadeem',        icon: '💼' },
  { name: 'Email',    url: 'mailto:nkhuram897@gmail.com',                   icon: '✉️' },
  { name: 'Phone',    url: 'tel:+923004380050',                             icon: '📱' },
];
