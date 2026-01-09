# 🚀 Quick Start Guide

Get **Mart – For You** up and running in under 2 minutes!

## Prerequisites

- Node.js 16 or higher
- npm (comes with Node.js)

## Installation

```bash
# 1. Navigate to the project directory
cd claude-mart-for-you

# 2. Install dependencies (if not already done)
npm install

# 3. Start the development server
npm run dev
```

The app will open automatically at `http://localhost:3000`

## 🎯 Quick Tour

### First Visit
1. You'll see the **Landing Page** with an animated welcome
2. Click "Start Shopping" to enter the store
3. The landing page only shows once per browser session

### Shopping Flow
1. **Browse Products** - Scroll through 100+ products
2. **Search** - Use the search bar to find specific items
3. **Filter** - Click category buttons or toggle "Sale Items Only"
4. **Add to Cart** - Click "Add to Cart" on any product
5. **Adjust Quantity** - Use +/- buttons directly on the product card
6. **View Cart** - Click the cart icon in the header
7. **Checkout** - Select shipping, review order, click "Proceed to Checkout"

### Features to Try

✨ **Dark Mode**
- Click the sun/moon icon in the header
- Your preference is saved automatically

🛒 **Smart Cart**
- Add items and see the cart badge update
- Adjust quantities without leaving the shop page
- Stock limits are enforced automatically

👤 **Profile Management**
- Click the user icon
- Add your information (saved to browser)
- Edit anytime with the "Edit Profile" button

🏷️ **Sale Items**
- Visit `/offers` to see discounted products
- Toggle "Show only sale items" on other pages
- See total savings calculated

## 🎨 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | Animated welcome screen |
| Home | `/home` | Main shopping page with hero |
| Products | `/products` | Full catalog with sorting |
| Offers | `/offers` | Sale items only |
| Cart | `/cart` | Review and checkout |
| Profile | `/profile` | User information |

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist` folder, ready to deploy!

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
1. Build: `npm run build`
2. Deploy the `dist` folder to `gh-pages` branch

## 💡 Tips

- **Data Persistence**: Your cart and profile are saved in localStorage
- **Theme**: Automatically detects your system preference on first visit
- **Stock**: Products show "Only X left" when stock is low
- **Responsive**: Try resizing your browser or opening on mobile
- **Animations**: Smooth transitions throughout (respects reduced-motion)

## 🔧 Customization

### Change Products
Edit `src/data/products.js`

### Modify Theme Colors
Edit `tailwind.config.js`

### Adjust Tax Rate
In `src/pages/Cart.jsx`, find: `const tax = subtotal * 0.08`

### Change Shipping Options
In `src/pages/Cart.jsx`, modify the `shippingOptions` object

## ❓ Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3001
```

**Build errors?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styles not loading?**
Make sure Tailwind CSS processed correctly:
```bash
npm run build
```

**Images not loading?**
- Product images use Unsplash URLs
- Ensure you have an internet connection

## 📱 Test on Mobile

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from your phone: `http://YOUR_IP:3000`
3. Make sure your phone is on the same network

## 🎓 Learning Resources

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Vite**: https://vitejs.dev

## 🆘 Need Help?

Check the full `README.md` for detailed documentation on:
- Project structure
- Component architecture
- State management
- Accessibility features
- Advanced customization

---

**Happy Shopping! 🛍️**