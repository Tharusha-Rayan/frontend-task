import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceRangeChange, sortBy, onSortChange }) => {
  return (
    <div className="filter-sidebar">
      <div className="filter-section">
        <h3>Categories</h3>
        {categories.map(category => (
          <label key={category} className="filter-option">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={(e) => onCategoryChange(e.target.value)}
            />
            {category}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Sort By</h3>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;