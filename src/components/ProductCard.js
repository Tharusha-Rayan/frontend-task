import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-badge">
        {product.stock < 10 && <span className="badge low-stock">Low Stock</span>}
        {product.rating >= 4.5 && <span className="badge best-seller">Best Seller</span>}
      </div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <div className="rating">
        {renderStars(product.rating)}
        <span className="rating-value">({product.rating})</span>
      </div>
      <div className="product-footer">
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="stock">Stock: {product.stock}</p>
      </div>
      <button onClick={handleAddToCart} disabled={product.stock === 0}>
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;