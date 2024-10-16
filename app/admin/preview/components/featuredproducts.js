import React, { useState, useEffect } from 'react';

const FeaturedProducts = ({ handleAddToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch featured products from API
        fetch('/api/inventory/featured')
            .then(response => response.json())
            .then(data => setProducts(data.products));
    }, []);

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`/placeholder.svg?height=200&width=300&text=${item.name}`}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                            <p className="text-gray-600 mb-2">${item.unitPrice.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 mb-4">In stock: {item.quantity}</p>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default FeaturedProducts;