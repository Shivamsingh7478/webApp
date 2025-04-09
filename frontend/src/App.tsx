import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProductList from './pages/products/ProductList';
import ProductForm from './pages/products/ProductForm';
import ImageShowcase from './pages/ImageShowcase';
import Navbar from './components/Navbar';
import { authService } from './services/authService';
import { ProductProvider } from './context/ProductContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return authService.isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="py-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <ProductList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/new"
                element={
                  <PrivateRoute>
                    <ProductForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/edit/:id"
                element={
                  <PrivateRoute>
                    <ProductForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/images"
                element={
                  <PrivateRoute>
                    <ImageShowcase />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <ProductList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
