import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { products, categories } from '../data/products';
import { 
  MagnifyingGlassIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  SparklesIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  const filterAndSortProducts = () => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }

    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = filterAndSortProducts();

  const features = [
    { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: ShieldCheckIcon, title: 'Secure Payment', desc: '100% protected' },
    { icon: CreditCardIcon, title: 'Easy Returns', desc: '30-day guarantee' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <SparklesIcon className="h-8 w-8 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                Discover Amazing Products
              </h1>
              <SparklesIcon className="h-8 w-8 animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Shop the latest tech, furniture, and accessories with unbeatable prices
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mt-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-2xl text-gray-800 text-lg focus:ring-4 focus:ring-white focus:ring-opacity-50 outline-none shadow-2xl"
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              {features.map(({ icon: Icon, title, desc }, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                  <Icon className="h-8 w-8 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-primary-100">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              All Products
              <span className="ml-3 text-lg font-normal text-gray-500">
                ({filteredProducts.length} items)
              </span>
            </h2>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-white rounded-xl shadow-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Squares2X2Icon className="h-5 w-5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ListBulletIcon className="h-5 w-5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="card p-12 text-center animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;