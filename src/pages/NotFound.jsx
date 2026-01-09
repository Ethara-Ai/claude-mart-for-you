import { motion } from 'framer-motion';
import { Home, ShoppingBag, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <motion.h1
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              404
            </motion.h1>
          </div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Search className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/home"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-slate-700"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-sm text-gray-500 dark:text-gray-400"
          >
            <p>Need help? Contact our support team.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
