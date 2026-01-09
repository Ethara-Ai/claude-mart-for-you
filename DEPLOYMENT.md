# 🚀 Deployment Guide

Complete guide to deploying **Mart – For You** to various hosting platforms.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Custom Server Deployment](#custom-server-deployment)
- [Environment Configuration](#environment-configuration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

Before deploying, ensure:

- ✅ All dependencies are installed: `npm install`
- ✅ Build succeeds locally: `npm run build`
- ✅ Preview works correctly: `npm run preview`
- ✅ No console errors in production build
- ✅ All images load properly
- ✅ Dark mode works correctly
- ✅ localStorage persists data
- ✅ All routes are accessible

## Vercel Deployment

### Option 1: Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Deploy to Production**
```bash
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite configuration
6. Click "Deploy"

### Configuration

Vercel automatically uses `vercel.json` for configuration:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite (auto-detected)

### Custom Domain

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Netlify Deployment

### Option 1: Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

### Option 2: Drag and Drop

1. Build locally: `npm run build`
2. Visit [app.netlify.com](https://app.netlify.com)
3. Drag the `dist` folder to the deploy area

### Option 3: GitHub Integration

1. Push code to GitHub
2. Visit [app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Configuration

The `netlify.toml` file is included with:
- Build settings
- Redirect rules
- Security headers
- Cache configuration

### Environment Variables

1. Go to Site settings > Build & deploy > Environment
2. Add any required environment variables
3. Redeploy the site

## GitHub Pages Deployment

### Automatic Deployment with GitHub Actions

1. **Create deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

2. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - Save

3. **Push to trigger deployment**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

### Manual Deployment

1. **Build**
```bash
npm run build
```

2. **Deploy with gh-pages**
```bash
npm install -g gh-pages
gh-pages -d dist
```

3. **Enable GitHub Pages**
   - Go to Settings > Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`

### Important Note

The app uses HashRouter (`#/`) which works perfectly with GitHub Pages without additional configuration.

## Custom Server Deployment

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/mart-for-you/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

### Apache Configuration

Create `.htaccess` in the `dist` folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

### Deployment Steps

1. **Build**
```bash
npm run build
```

2. **Upload to server**
```bash
scp -r dist/* user@server:/var/www/mart-for-you/
```

3. **Set permissions**
```bash
ssh user@server "chmod -R 755 /var/www/mart-for-you"
```

4. **Restart web server**
```bash
ssh user@server "sudo systemctl restart nginx"
```

## Environment Configuration

### Production Build Settings

In `vite.config.js`:

```javascript
export default defineConfig({
  base: '/', // Change if deploying to subdirectory
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true for debugging
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
});
```

### Routing Configuration

The app uses **HashRouter** by default for compatibility:
- Works on all platforms without server configuration
- URLs have `#` (e.g., `example.com/#/products`)

To use **BrowserRouter** (clean URLs):
1. Change `HashRouter` to `BrowserRouter` in `src/App.jsx`
2. Configure server redirects (see platform-specific sections)

## Performance Optimization

### Pre-Deployment Checklist

1. **Analyze Bundle Size**
```bash
npm run build
# Check the size report in terminal
```

2. **Test Lighthouse Score**
- Open DevTools
- Run Lighthouse audit
- Aim for 90+ in all categories

3. **Verify Image Loading**
- All product images should load
- Check fallbacks for broken images

4. **Test Dark Mode**
- Ensure smooth transitions
- Check localStorage persistence

### Optimization Tips

- ✅ Images are lazy-loaded
- ✅ Code is split by route
- ✅ React and Framer Motion are separate chunks
- ✅ CSS is minified and purged
- ✅ Gzip compression enabled

### CDN Configuration

For better performance, serve static assets via CDN:

1. Upload `dist/assets/*` to CDN
2. Update `base` in `vite.config.js`
3. Rebuild and deploy

## Troubleshooting

### Build Fails

**Error: Cannot find module**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: Out of memory**
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Routing Issues

**404 on refresh**
- Ensure server redirects to `index.html`
- Or use HashRouter (already configured)

**Assets not loading**
- Check `base` path in `vite.config.js`
- Verify asset paths in build output

### Dark Mode Not Working

- Clear localStorage
- Check system preferences
- Verify Tailwind's dark mode configuration

### Images Not Loading

- Ensure internet connection (Unsplash URLs)
- Check browser console for errors
- Verify image URLs in `products.js`

### Performance Issues

**Slow initial load**
- Enable code splitting (already done)
- Use route-based lazy loading (already implemented)
- Consider preloading critical routes

**Animations stuttering**
- Check for heavy re-renders
- Verify Framer Motion configuration
- Test on different devices

## Post-Deployment

### Monitoring

1. **Analytics** - Add Google Analytics or similar
2. **Error Tracking** - Consider Sentry or LogRocket
3. **Performance** - Monitor with Lighthouse CI

### Testing

Test on:
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Different screen sizes (320px to 2560px)
- ✅ Dark and light modes
- ✅ Slow network connections

### Maintenance

Regular tasks:
- Update dependencies: `npm update`
- Security audit: `npm audit`
- Build verification: `npm run build`
- Performance testing: Lighthouse

## SSL/HTTPS

### Free SSL with Vercel/Netlify
- Automatic HTTPS
- SSL certificates auto-renewed

### Let's Encrypt (Custom Server)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Rollback Strategy

### Vercel
- Go to Deployments tab
- Click on previous deployment
- Click "Promote to Production"

### Netlify
- Go to Deploys tab
- Click on previous deploy
- Click "Publish deploy"

### Custom Server
- Keep previous builds: `dist-backup-YYYY-MM-DD/`
- Symlink current: `ln -s dist-backup-YYYY-MM-DD dist`

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally first with `npm run preview`
- Verify all prerequisites are met

---

**Ready to deploy? Choose your platform and follow the guide above!** 🚀