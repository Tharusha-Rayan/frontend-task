import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { products, orders, salesData } from '../data/products';
import './Dashboard.css';

const Dashboard = () => {
  const { getCartCount, getCartTotal } = useCart();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const topSellingProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const lowStockProducts = products.filter(p => p.stock < 10);

  const recentOrders = orders.slice(0, 5);

  const getStatusClass = (status) => {
    switch(status) {
      case 'Delivered': return 'status-delivered';
      case 'Shipped': return 'status-shipped';
      case 'Processing': return 'status-processing';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card primary">
            <div className="card-icon">$</div>
            <div className="card-content">
              <h3>Total Revenue</h3>
              <p className="card-value">${totalRevenue.toFixed(2)}</p>
              <span className="card-change positive">+12.5% from last month</span>
            </div>
          </div>

          <div className="dashboard-card success">
            <div className="card-icon">📦</div>
            <div className="card-content">
              <h3>Total Orders</h3>
              <p className="card-value">{totalOrders}</p>
              <span className="card-change positive">+8.3% from last month</span>
            </div>
          </div>

          <div className="dashboard-card info">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Average Order Value</h3>
              <p className="card-value">${averageOrderValue.toFixed(2)}</p>
              <span className="card-change negative">-2.1% from last month</span>
            </div>
          </div>

          <div className="dashboard-card warning">
            <div className="card-icon">📈</div>
            <div className="card-content">
              <h3>Total Products</h3>
              <p className="card-value">{products.length}</p>
              <span className="card-change neutral">No change</span>
            </div>
          </div>

          <div className="dashboard-card secondary">
            <div className="card-icon">🛒</div>
            <div className="card-content">
              <h3>Cart Items</h3>
              <p className="card-value">{getCartCount()}</p>
              <span className="card-change neutral">Current session</span>
            </div>
          </div>

          <div className="dashboard-card danger">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <h3>Cart Total</h3>
              <p className="card-value">${getCartTotal().toFixed(2)}</p>
              <span className="card-change neutral">Current session</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-panel sales-chart">
            <h2>Sales Overview</h2>
            <div className="chart-container">
              {salesData.map((data, index) => (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar" 
                    style={{ height: `${(data.sales / 100)}px` }}
                  ></div>
                  <span className="bar-label">{data.month}</span>
                  <span className="bar-value">${data.sales}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel">
            <h2>Top Selling Products</h2>
            <div className="top-products-list">
              {topSellingProducts.map((product, index) => (
                <div key={product.id} className="top-product-item">
                  <span className="product-rank">#{index + 1}</span>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.sales} sales</p>
                  </div>
                  <span className="product-price">${product.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel">
            <h2>Recent Orders</h2>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-panel">
            <h2>Low Stock Alert</h2>
            <div className="low-stock-list">
              {lowStockProducts.length === 0 ? (
                <p className="no-alerts">All products are well stocked</p>
              ) : (
                lowStockProducts.map(product => (
                  <div key={product.id} className="low-stock-item">
                    <img src={product.image} alt={product.name} />
                    <div className="stock-info">
                      <h4>{product.name}</h4>
                      <p className="stock-warning">Only {product.stock} left in stock</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;