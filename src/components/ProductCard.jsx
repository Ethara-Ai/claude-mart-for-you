import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Package, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity, incrementQuantity, decrementQuantity } = useCart();
  const { success, warning } = useToast();

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);
  const canAddMore = quantity < product.stock;

  const handleAddToCart = () => {
    addToCart(product.id);
    success(`${product.name} added to cart!`);
  };

  const handleIncrement = () => {
    if (canAddMore) {
      incrementQuantity(product.id);
      success('Quantity updated');
    } else {
      warning(`Only ${product.stock} items available in stock`);
    }
  };

  const handleDecrement = () => {
    decrementQuantity(product.id);
    if (quantity === 1) {
      success('Item removed from cart');
    } else {
      success('Quantity updated');
    }
  };

  const discount = product.onSale
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-slate-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Sale Badge */}
        {product.onSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {discount}% OFF
          </div>
        )}

        {/* Stock Badge */}
        {product.stock < 10 && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Package className="w-3 h-3" />
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Specs */}
        <div className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
          {product.specs}
        </div>

        {/* Shipping Info */}
        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <Truck className="w-3 h-3" />
          <span>{product.shipping}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.onSale && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({product.rating})
          </span>
        </div>

        {/* Add to Cart / Quantity Controls */}
        <div className="pt-2">
          {!inCart ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                product.stock === 0
                  ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </motion.button>
          ) : (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDecrement}
                className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </motion.button>

              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {quantity}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">in cart</div>
              </div>

              <motion.button
                whileHover={{ scale: canAddMore ? 1.05 : 1 }}
                whileTap={{ scale: canAddMore ? 0.95 : 1 }}
                onClick={handleIncrement}
                disabled={!canAddMore}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${
                  canAddMore
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
