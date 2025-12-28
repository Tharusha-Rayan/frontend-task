import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { products, orders } from '../data/products';
import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  ChartBarIcon,
  CubeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const topSellingProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const lowStockProducts = products.filter(p => p.stock < 10);
  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+12.5%',
      positive: true,
      icon: CurrencyDollarIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      change: '+8.3%',
      positive: true,
      icon: ShoppingBagIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Avg Order Value',
      value: `$${averageOrderValue.toFixed(2)}`,
      change: '-2.1%',
      positive: false,
      icon: ChartBarIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Products',
      value: products.length,
      change: 'No change',
      positive: null,
      icon: CubeIcon,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your store overview</p>
          </div>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="mt-4 sm:mt-0 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none bg-white font-medium"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="card p-6 hover:scale-105 transition-transform animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                {stat.positive !== null && (
                  <span className={`flex items-center space-x-1 text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positive ? (
                      <ArrowTrendingUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4" />
                    )}
                    <span>{stat.change}</span>
                  </span>
                )}
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Selling Products */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Selling Products</h2>
            <div className="space-y-4">
              {topSellingProducts.map((product, idx) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">${product.price}</p>
                    <p className="text-sm text-gray-500">{product.sales} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Low Stock Alert</h2>
            </div>
            <div className="space-y-3">
              {lowStockProducts.length === 0 ? (
                <p className="text-gray-600 text-center py-8">All products are well stocked! 🎉</p>
              ) : (
                lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                      {product.stock} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-800">#{order.id}</td>
                    <td className="py-4 px-4 text-gray-600">{order.date}</td>
                    <td className="py-4 px-4 text-gray-600">{order.customer}</td>
                    <td className="py-4 px-4 font-semibold text-gray-800">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;