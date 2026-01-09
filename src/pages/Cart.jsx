import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Sun, Moon, Trash2, Plus, Minus, CreditCard, Package, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { products } from '../data/products';

const Cart = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const {
    getCartItems,
    getCartSubtotal,
    getCartItemCount,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { success, warning } = useToast();

  const [shippingOption, setShippingOption] = useState('standard');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = getCartItems();
  const subtotal = getCartSubtotal();
  const cartItemCount = getCartItemCount();

  const shippingOptions = {
    standard: { name: 'Standard Shipping', price: 0, days: '5-7 business days' },
    express: { name: 'Express Shipping', price: 15, days: '2-3 business days' },
    overnight: { name: 'Overnight Shipping', price: 30, days: 'Next business day' },
  };

  const shippingCost = shippingOptions[shippingOption].price;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    clearCart();
    setIsCheckingOut(false);
    success(`Order ${orderNumber} placed successfully!`);

    // Navigate to home after a moment
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  const handleIncrement = (productId) => {
    const product = products.find(p => p.id === productId);
    const item = cartItems.find(i => i.id === productId);

    if (item.quantity >= product.stock) {
      warning(`Only ${product.stock} items available in stock`);
    } else {
      incrementQuantity(productId);
      success('Quantity updated');
    }
  };

  const handleDecrement = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    decrementQuantity(productId);

    if (item.quantity === 1) {
      success('Item removed from cart');
    } else {
      success('Quantity updated');
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    success('Item removed from cart');
  };

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
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Offers
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="container-custom py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add some products to get started!
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        ${item.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 bg-gray-100 dark:bg-slate-700 rounded font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                {/* Shipping Options */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Shipping Method
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(shippingOptions).map(([key, option]) => (
                      <label
                        key={key}
                        className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={shippingOption === key}
                          onChange={e => setShippingOption(e.target.value)}
                          className="text-blue-600"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {option.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {option.days}
                          </div>
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({cartItemCount} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-slate-700 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                <Link
                  to="/products"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
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

export default Cart;
