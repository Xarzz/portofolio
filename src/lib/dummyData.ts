export const projects = [
  {
    id: '1',
    title: 'NitroQuiz',
    slug: 'nitro-quiz',
    description: 'A real-time multiplayer quiz game with live host dashboard.',
    tech_stack: ['Next.js', 'Socket.io', 'Supabase', 'Framer Motion'],
    live_url: 'https://nitro-quiz.vercel.app',
    github_url: 'https://github.com/muhammaduhib/nitro-quiz',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: '2',
    title: 'Crypto Dashboard',
    slug: 'crypto-dashboard',
    description: 'Real-time cryptocurrency tracking dashboard with interactive charts.',
    tech_stack: ['React', 'Chart.js', 'TailwindCSS', 'CoinGecko API'],
    live_url: 'https://crypto-dash.example.com',
    github_url: 'https://github.com/muhammaduhib/crypto-dash',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: '3',
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'Modern fashion shop with cart, checkout, and admin dashboard.',
    tech_stack: ['Next.js', 'Stripe', 'Sanity CMS', 'Zustand'],
    live_url: 'https://fashion-shop.example.com',
    github_url: 'https://github.com/muhammaduhib/fashion-shop',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
];

export const skills = [
  { name: 'JavaScript', category: 'Frontend', proficiency: 90, icon: 'code' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 85, icon: 'shield' },
  { name: 'React', category: 'Frontend', proficiency: 92, icon: 'atom' },
  { name: 'Next.js', category: 'Frontend', proficiency: 88, icon: 'cpu' },
  { name: 'Node.js', category: 'Backend', proficiency: 80, icon: 'server' },
  { name: 'Express', category: 'Backend', proficiency: 78, icon: 'activity' },
  { name: 'Supabase', category: 'Backend', proficiency: 85, icon: 'database' },
  { name: 'CSS / SCSS', category: 'Styling', proficiency: 95, icon: 'palette' },
  { name: 'Git', category: 'Tools', proficiency: 85, icon: 'git-branch' },
  { name: 'Figma', category: 'Design', proficiency: 75, icon: 'figma' },
];

export const experience = [
  {
    id: '1',
    company: 'DevStudio',
    role: 'Junior Web Developer',
    description: 'Building and maintaining client websites using React and Next.js. Improved performance and SEO scores across major projects.',
    start_date: '2023-08-01',
    end_date: null,
  },
  {
    id: '2',
    company: 'Upwork',
    role: 'Freelance Frontend Developer',
    description: 'Designed and developed custom UI components and landing pages for international clients.',
    start_date: '2022-04-01',
    end_date: '2023-07-31',
  },
];

export const personalInfo = {
  name: 'Muhammad Uhib Ibadatarrahman',
  title: 'Junior Web Developer',
  bio: 'A passionate developer from Indonesia specialized in crafting immersive web experiences. I love bridging the gap between design and code, turning complex problems into elegant solutions.',
  avatar: '/avatar.jpg',
};
