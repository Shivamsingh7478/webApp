import React from 'react';
import ImageGallery from '../components/ImageGallery';

const websiteImages = [
  {
    src: '/assets/images/homepage.png',
    alt: 'Homepage',
    title: 'Website Homepage',
  },
  {
    src: '/assets/images/products.png',
    alt: 'Products Page',
    title: 'Products Listing',
  },
  {
    src: '/assets/images/product-detail.png',
    alt: 'Product Detail',
    title: 'Product Details',
  },
  {
    src: '/assets/images/cart.png',
    alt: 'Shopping Cart',
    title: 'Shopping Cart',
  },
  {
    src: '/assets/images/checkout.png',
    alt: 'Checkout',
    title: 'Checkout Process',
  },
  {
    src: '/assets/images/profile.png',
    alt: 'User Profile',
    title: 'User Profile',
  },
];

const ImageShowcase: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Website Screenshots</h1>
      <ImageGallery images={websiteImages} />
    </div>
  );
};

export default ImageShowcase; 