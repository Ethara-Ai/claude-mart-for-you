# Mart – For You 🛍️

A modern, fully-functional e-commerce website built with React, Tailwind CSS, and Vite. This is a complete frontend demonstration of a polished shopping experience with 100 products across 8 categories, featuring dark mode, cart management, user profiles, and smooth animations.

![Mart – For You](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 Modern UI/UX
- **Stunning Landing Page** with animated hero section and theme toggle
- **Responsive Design** optimized for mobile (320px+), tablet, and desktop
- **Dark Mode Support** with automatic system preference detection
- **Smooth Animations** powered by Framer Motion
- **Accessible** with ARIA labels, keyboard navigation, and skip links

### 🛒 Shopping Experience
- **100+ Products** across 8 categories (Electronics, Fashion, Home & Living, Beauty, Fitness, Food & Beverages, Books, Toys)
- **Real-time Search** with instant filtering
- **Category Filtering** with product count badges
- **Sale Items** with discount percentages and savings calculations
- **Product Cards** with images from Unsplash, ratings, specs, and shipping info
- **Stock Management** with low stock warnings

### 🛍️ Smart Cart System
- **Inline Quantity Controls** directly on product cards
- **Stock Validation** prevents exceeding available inventory
- **Three Shipping Options** (Standard Free, Express $15, Overnight $30)
- **Tax Calculation** at 8%
- **Price Breakdown** with subtotal, shipping, tax, and total
- **Persistent Storage** using localStorage
- **Cart Badge** showing item count in header

### 👤 User Profile
- **View/Edit Modes** for profile management
- **Form Validation** for all fields (email format, ZIP code, required fields)
- **Personal Information** (name, email, phone)
- **Shipping Address** with full address management
- **localStorage Persistence** across sessions

### 🎯 Additional Features
- **Toast Notifications** for user feedback (success, error, warning, info)
- **Simulated Checkout** with order number generation
- **Mobile-Friendly Navigation** with hamburger menu
- **404 Page** with helpful navigation
- **Error Boundary** for graceful error handling
- **Loading States** with animated spinners

## 📦 Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server
- **localStorage API** - Data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd claude-mart-for-you
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
claude-mart-for-you/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Loading.jsx
│   │   ├── ProductCard.jsx
│   │   └── Toast.jsx
│   ├── contexts/            # React Context providers
│   │   ├── CartContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── UserContext.jsx
│   ├── data/                # Static data
│   │   └── products.js      # 100 product catalog
│   ├── pages/               # Route pages
│   │   ├── Landing.jsx      # Welcome screen
│   │   ├── Home.jsx         # Main shop page
│   │   ├── Products.jsx     # Full catalog
│   │   ├── Offers.jsx       # Sale items
│   │   ├── Cart.jsx         # Shopping cart
│   │   ├── Profile.jsx      # User profile
│   │   └── NotFound.jsx     # 404 page
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎨 Product Categories

1. **Electronics** (15 items) - Headphones, TVs, keyboards, cameras, etc.
2. **Fashion** (15 items) - Clothing, accessories, shoes, bags
3. **Home & Living** (12 items) - Furniture, décor, kitchenware
4. **Beauty & Personal Care** (13 items) - Skincare, makeup, grooming
5. **Fitness & Sports** (12 items) - Yoga mats, dumbbells, trackers
6. **Food & Beverages** (11 items) - Coffee, tea, gourmet items
7. **Books & Media** (10 items) - Books, journals, art supplies
8. **Toys & Games** (12 items) - Educational toys, puzzles, games

## 🎯 Key Pages

### Landing Page (`/`)
- Animated welcome screen (shown once per session)
- Theme toggle
- Call-to-action button
- Feature highlights

### Home Page (`/home`)
- Hero section with video background area
- Search bar with real-time filtering
- Category filters
- Product grid (1-4 columns responsive)
- Sale toggle

### Products Page (`/products`)
- Full product catalog
- Advanced filtering and sorting
- Search functionality
- Product count display

### Offers Page (`/offers`)
- Sale items only
- Total savings calculator
- Category-specific sale counts
- Promotional styling

### Cart Page (`/cart`)
- Item list with images
- Quantity controls
- Remove item functionality
- Shipping method selection
- Price breakdown
- Checkout simulation

### Profile Page (`/profile`)
- View mode with information cards
- Edit mode with validated forms
- Personal information management
- Shipping address management

## 🔧 Configuration

### Theme Customization
Edit `tailwind.config.js` to customize colors, fonts, and animations.

### Product Data
Modify `src/data/products.js` to add, remove, or update products.

### Routing
The app uses HashRouter for GitHub Pages compatibility. Change to BrowserRouter in `src/App.jsx` for standard routing.

## 📱 Responsive Breakpoints

- **XS**: 320px+ (small phones)
- **SM**: 640px+ (large phones)
- **MD**: 768px+ (tablets)
- **LG**: 1024px+ (laptops)
- **XL**: 1280px+ (desktops)
- **2XL**: 1536px+ (large screens)

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Skip to main content link
- Color contrast compliance
- Screen reader friendly
- Reduced motion support

## 💾 Data Persistence

All user data is stored in localStorage:
- **Cart items** - Products and quantities
- **User profile** - Personal and shipping information
- **Theme preference** - Light/dark mode choice
- **Session flag** - Landing page visit status

## 🎭 Animations

Powered by Framer Motion:
- Page transitions
- Product card hover effects
- Modal slide-ins
- Toast notifications
- Button interactions
- Loading spinners
- Checkout celebration

## 🌐 Deployment

### Vercel
```bash
npm run build
# Connect to Vercel and deploy
```

### Netlify
```bash
npm run build
# Deploy the dist folder
```

### GitHub Pages
```bash
npm run build
# Deploy the dist folder to gh-pages branch
```

The app uses hash-based routing, making it compatible with static hosting services.

## 🔮 Future Enhancements

- Product detail pages
- Wishlist functionality
- Product comparison
- Review system
- Multiple images per product
- Color/size variants
- Order history
- Backend integration
- Payment processing
- Real authentication

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ as a demonstration of modern e-commerce UI/UX principles.

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Design inspiration from modern e-commerce platforms

---

**Note**: This is a frontend-only demonstration. No actual purchases are processed, and no backend services are connected. All data is stored locally in the browser.