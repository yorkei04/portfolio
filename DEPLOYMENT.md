# Deployment Guide

This guide will help you deploy your portfolio to GitHub and make it live on the web.

## Option 1: Vercel (Recommended - Easiest) ⭐

Vercel is the easiest way to deploy Next.js applications. It's made by the creators of Next.js and offers:
- Free hosting
- Automatic deployments on every push
- Custom domains
- HTTPS by default
- Zero configuration needed

### Steps:

1. **Push your code to GitHub**
   ```bash
   # If you haven't initialized git yet
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Custom Domain (Recommended for Professional Look)**
   
   The default Vercel URL (`portfolio-omega-peach-37.vercel.app`) is auto-generated and not very personal. You have two options:
   
   **Option A: Use Your Own Domain (Best)**
   - Purchase a domain from providers like:
     - [Namecheap](https://www.namecheap.com/) (~$10-15/year)
     - [Google Domains](https://domains.google/) (~$12/year)
     - [Cloudflare](https://www.cloudflare.com/products/registrar/) (~$8-10/year)
   - In Vercel: Go to **Settings** → **Domains** → **Add Domain**
   - Enter your domain (e.g., `keiyau.dev` or `www.keiyau.dev`)
   - Follow Vercel's DNS configuration instructions
   - Vercel automatically sets up HTTPS (free SSL certificate)
   
   **Option B: Use GitHub Pages (Free Alternative)**
   - Deploy to GitHub Pages instead
   - Your site will be at: `https://yorkei04.github.io/portfolio/`
   - Or rename repo to `yorkei04.github.io` for root domain
   - See Option 2 below for detailed instructions

Your site will automatically redeploy whenever you push to the main branch!

---

## Option 2: GitHub Pages (Static Export)

GitHub Pages requires a static export of your Next.js app. This means some Next.js features won't work (like API routes, server components, etc.), but it's free and works well for static portfolios.

### Steps:

1. **Configure Next.js for static export**
   - The `next.config.ts` has been updated to support static export
   - Run `npm run build` to generate the static files

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. **Set up GitHub Actions for automatic deployment**
   - A workflow file has been created at `.github/workflows/deploy.yml`
   - This will automatically build and deploy your site on every push

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "GitHub Actions"
   - Your site will be available at: `https://YOUR_USERNAME.github.io/portfolio/`

### Important Notes for GitHub Pages:
- Your site will be at `https://YOUR_USERNAME.github.io/portfolio/` (note the `/portfolio/` path)
- If you want it at the root (`https://YOUR_USERNAME.github.io/`), you need to:
  - Rename your repository to `YOUR_USERNAME.github.io`
  - Update the `basePath` in `next.config.ts` to `""` or remove it

---

## Quick Comparison

| Feature | Vercel | GitHub Pages |
|---------|--------|--------------|
| Setup Difficulty | ⭐ Easy | ⭐⭐ Medium |
| Next.js Features | ✅ Full support | ⚠️ Static only |
| Custom Domain | ✅ Free | ✅ Free |
| Auto Deploy | ✅ Yes | ✅ Yes (with Actions) |
| Build Time | ~2 min | ~5-10 min |
| Recommended | ✅ Yes | For static sites |

---

## Troubleshooting

### Vercel Issues
- If build fails, check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Check that `next.config.ts` is valid

### GitHub Pages Issues
- Make sure the GitHub Actions workflow ran successfully
- Check that the `out` folder is being generated correctly
- Verify the base path matches your repository name

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- GitHub Pages Docs: https://docs.github.com/en/pages
- Next.js Deployment: https://nextjs.org/docs/deployment

