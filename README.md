# Kei - Portfolio

A modern, responsive developer portfolio built with Next.js 15, TypeScript, and
Tailwind CSS 4. This portfolio showcases my journey as a software engineer.

## 🚀 Live Demo

Visit my portfolio: [WIP]

## 🛠️ Built With

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

## ✨ Features

- **Modern Design** - Clean, professional layout with dark/light mode support
- **Responsive** - Mobile-first design that works on all devices
- **Interactive** - Smooth animations and hover effects
- **SEO Optimized** - Proper meta tags and structured data
- **Accessible** - WCAG compliant with keyboard navigation support
- **Fast** - Optimized performance with static generation

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with font configuration
│   ├── page.tsx         # Home page component
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer)
│   └── sections/        # Page sections (Hero, About, Projects, etc.)
├── data/
│   └── portfolio.ts     # Portfolio content data
└── lib/
    └── utils.ts         # Utility functions
```

## 🎯 Sections

- **Hero** - Introduction with animated background
- **About** - Personal story and approach to development
- **Skills** - Interactive tech stack with filtering
- **Projects** - Featured work with live demos
- **Experience** - Professional timeline
- **Contact** - Contact form and social links

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/zkwokleung/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Customization

### Content

Edit `src/data/portfolio.ts` to customize:

- Personal information
- Work experience
- Projects
- Skills
- Social links

### Styling

- Global styles: `src/app/globals.css`
- Component styles: Tailwind classes in components
- Theme: CSS custom properties for colors

### Adding Your Resume

Place your resume as `public/resume.pdf` (or update the path in `portfolio.ts`)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Deployment

### Quick Start

**Option 1: Vercel (Recommended - Easiest)** ⭐

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click "Add New Project" and import your repository
4. Click "Deploy" - your site will be live in ~2 minutes!

**Option 2: GitHub Pages**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to GitHub Pages.

For more detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🤝 About Me

Hi, I'm

**Kei**  
*Bridging software and hardware in control*

Software engineer at MTR, developing universal station computers for Automatic Fare Collection (AFC) systems. Formerly configured SCADA and Human Machine Interface (HMI) systems at Hitachi Rail for railway control. Passionate about integrating software, electronics, and real-time control systems that power critical infrastructure.

This portfolio showcases my experience and projects. The site itself is a hands-on exercise in building a responsive web application with Cursor, built on top of a Next.js framework originally developed by my friend, Andrew SZE-TO.

## 📫 Contact

- **Email**: hungkeiyau@gmail.com
- **GitHub**: [@yorkei04](https://github.com/yorkei04)
- **LinkedIn**:
  [kei-yau](https://www.linkedin.com/in/kei-yau/)
- **Instagram**: [@yorkei04](https://www.instagram.com/yorkei04/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
