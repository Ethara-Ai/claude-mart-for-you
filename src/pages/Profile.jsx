import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Sun, Moon, Edit2, Save, X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';

const Profile = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getCartItemCount } = useCart();
  const { user, updateUser, updateAddress, isEditing, setIsEditing } = useUser();
  const { success, error } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: { ...user.address },
  });

  const [errors, setErrors] = useState({});

  const cartItemCount = getCartItemCount();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    if (!formData.address.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.address.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.address.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.address.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code format';
    }

    if (!formData.address.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: { ...user.address },
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = () => {
    if (validateForm()) {
      updateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      updateAddress(formData.address);
      setIsEditing(false);
      success('Profile updated successfully!');
    } else {
      error('Please fix the errors in the form');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            )}
          </div>

          {!isEditing ? (
            /* View Mode */
            <div className="space-y-6">
              {/* Personal Information Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Full Name
                    </label>
                    <p className="text-lg text-gray-900 dark:text-white mt-1">
                      {user.name || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-lg text-gray-900 dark:text-white mt-1">
                      {user.email || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-lg text-gray-900 dark:text-white mt-1">
                      {user.phone || 'Not set'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Address Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  {user.address.street ? (
                    <>
                      <p className="text-lg text-gray-900 dark:text-white">{user.address.street}</p>
                      <p className="text-lg text-gray-900 dark:text-white">
                        {user.address.city}, {user.address.state} {user.address.zipCode}
                      </p>
                      <p className="text-lg text-gray-900 dark:text-white">{user.address.country}</p>
                    </>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No address set</p>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Edit Mode */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6"
            >
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Personal Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                          errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                          errors.street ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                        placeholder="123 Main St"
                      />
                      {errors.street && (
                        <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.address.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                            errors.city ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          value={formData.address.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                          className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                            errors.state ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                          placeholder="NY"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={formData.address.zipCode}
                          onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                          className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                            errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          value={formData.address.country}
                          onChange={(e) => handleAddressChange('country', e.target.value)}
                          className={`w-full px-4 py-2 bg-white dark:bg-slate-700 border ${
                            errors.country ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                          placeholder="United States"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </div>
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

export default Profile;
