import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { useProduct } from '../../context/ProductContext';
import './Products.css';

const ProductList: React.FC = () => {
  const { products, setProducts, addProductToList } = useProduct();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const filterParams: any = {};
      
      if (filters.category) filterParams.category = filters.category;
      if (filters.minPrice) filterParams.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice) filterParams.maxPrice = parseFloat(filters.maxPrice);
      if (filters.minRating) filterParams.minRating = parseFloat(filters.minRating);
      
      const data = await productService.filterProducts(filterParams);
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }
    
    try {
      setLoading(true);
      const data = await productService.searchProducts(searchQuery);
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="form-title">Products</h1>
        <Link
          to="/products/new"
          className="btn btn-primary"
        >
          Add New Product
        </Link>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="filters-section">
        <div className="filters-grid">
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="minPrice" className="form-label">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="form-input"
              placeholder="Min Price"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="maxPrice" className="form-label">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="form-input"
              placeholder="Max Price"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="minRating" className="form-label">
              Min Rating
            </label>
            <input
              type="number"
              id="minRating"
              name="minRating"
              value={filters.minRating}
              onChange={handleFilterChange}
              className="form-input"
              placeholder="Min Rating"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleFilter}
            className="btn btn-primary"
          >
            Apply Filters
          </button>
          <button
            onClick={fetchProducts}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="product-image-placeholder">
                  No image available
                </div>
              )}
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              <span>★</span>
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Link
                to={`/products/edit/${product.id}`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 