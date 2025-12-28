import React from 'react';
import { 
  FunnelIcon, 
  CurrencyDollarIcon, 
  ArrowsUpDownIcon,
  TagIcon 
} from '@heroicons/react/24/outline';

const FilterSidebar = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceRangeChange, sortBy, onSortChange }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        </div>
        
        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <TagIcon className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
          </div>
          <div className="space-y-2">
            {categories.map(category => (
              <label 
                key={category} 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-500 cursor-pointer"
                />
                <span className={`font-medium ${selectedCategory === category ? 'text-primary-600' : 'text-gray-700 group-hover:text-gray-900'}`}>
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-700">Price Range</h3>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
            />
            <span className="text-gray-500 font-medium">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-700">Sort By</h3>
          </div>
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none bg-white font-medium text-gray-700 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            onCategoryChange('All');
            onPriceRangeChange({ min: '', max: '' });
            onSortChange('default');
          }}
          className="w-full mt-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;