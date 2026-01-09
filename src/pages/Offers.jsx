import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Sun, Moon, Tag, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Offers = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getCartItemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const saleProducts = useMemo(() => {
    let filtered = products.filter(product => product.onSale);

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const totalSavings = useMemo(() => {
    return saleProducts.reduce((total, product) => {
      return total + (product.originalPrice - product.price);
    }, 0);
  }, [saleProducts]);

  const cartItemCount = getCartItemCount();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 shadow-md">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-blue-600">Mart</span>
                <span className="text-gray-900 dark:text-white"> – For You</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/home"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Products
              </Link>
              <Link
                to="/offers"
                className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Offers
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <Link
                to="/profile"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Profile"
              >
                <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Link>

              <Link
                to="/cart"
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label={`Cart with ${cartItemCount} items`}
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-slate-700"
          >
            <nav className="container-custom py-4 space-y-2">
              <Link
                to="/home"
                className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/offers"
                className="block px-4 py-2 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Offers
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Tag className="w-5 h-5" />
              <span className="font-semibold">Limited Time Offers</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Amazing Deals!</h1>
            <p className="text-2xl text-red-50 mb-6">
              Save big on {saleProducts.length} products
            </p>
            <div className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-bold text-xl shadow-lg">
              <TrendingDown className="w-6 h-6" />
              Total Savings: ${totalSavings.toFixed(2)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="container-custom py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search sale items..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              All
            </button>
            {categories.map(category => {
              const categoryCount = saleProducts.filter(p => p.category === category.id).length;
              if (categoryCount === 0) return null;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({categoryCount})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No sale items found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search query or category filter
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-16">
        <div className="container-custom py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-2">Mart – For You</p>
            <p className="text-sm">© 2024 All rights reserved. Built with React & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Offers;
