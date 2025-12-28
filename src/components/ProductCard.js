import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-4 w-4 ${
              star <= Math.floor(rating)
                ? 'text-yellow-400'
                : star - 0.5 <= rating
                ? 'text-yellow-200'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group card hover:scale-105 transition-all duration-300 animate-fade-in">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.stock < 10 && product.stock > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Only {product.stock} left!
            </span>
          )}
          {product.rating >= 4.5 && (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ⭐ Best Seller
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <HeartIcon 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
            {product.category}
          </span>
          {renderStars(product.rating)}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Rating & Sales */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <span className="font-semibold text-gray-700">{product.rating}</span>
            <span>({product.sales} sold)</span>
          </span>
          <span className="text-xs">
            Stock: <span className={`font-bold ${product.stock < 10 ? 'text-orange-500' : 'text-green-600'}`}>
              {product.stock}
            </span>
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdded}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isAdded
                ? 'bg-green-500 text-white scale-95'
                : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircleIcon className="h-5 w-5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCartIcon className="h-5 w-5" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;