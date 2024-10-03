'use client';
import React, { useState } from 'react';
import {
  ShoppingCart,
  User,
  CreditCard,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  DollarSign,
} from 'lucide-react';

const EcommercePreview = () => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Sample e-commerce items
  const ecommerceItems = [
    { id: 1, name: 'Product 1', unitPrice: 29.99, quantity: 10 },
    { id: 2, name: 'Product 2', unitPrice: 19.99, quantity: 5 },
    { id: 3, name: 'Product 3', unitPrice: 49.99, quantity: 2 },
  ];

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleSignUp = () => {
    setUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
  };

  const handleSignIn = () => {
    setUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleCheckout = () => {
    alert('Checkout process initiated. This would typically redirect to a payment gateway.');
  };

  const handleViewWebsite = () => {
    setShowFullPreview(true);
  };

  const handlePlan = () => {
    alert('Redirecting to pricing page...');
  };

  const PreviewFrame = ({ children }) => {
    let frameClass = 'w-full h-[600px] bg-white shadow-lg rounded-lg overflow-hidden';
    if (previewMode === 'mobile') frameClass += ' max-w-[375px]';
    if (previewMode === 'tablet') frameClass += ' max-w-[768px]';

    return <div className={frameClass}>{children}</div>;
  };

  const Button = ({ onClick, children, variant = 'default' }) => {
    const baseStyle = 'px-4 py-2 rounded focus:outline-none';
    const variantStyle = variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-gray-700 text-white';
    return (
      <button className={`${baseStyle} ${variantStyle}`} onClick={onClick}>
        {children}
      </button>
    );
  };

  const Card = ({ children }) => (
    <div className="border border-gray-300 rounded-lg shadow p-4 bg-gray-100">
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="font-bold text-lg mb-2 text-black">
      {children}
    </div>
  );

  const CardContent = ({ children }) => (
    <div className="text-sm mb-4 text-black">
      {children}
    </div>
  );

  const CardFooter = ({ children }) => (
    <div className="flex justify-end">
      {children}
    </div>
  );

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">E-commerce Website Preview</h1>

      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <Button onClick={() => setPreviewMode('mobile')} variant={previewMode === 'mobile' ? 'default' : 'outline'}>
            <Smartphone className="w-5 h-5" />
          </Button>
          <Button onClick={() => setPreviewMode('tablet')} variant={previewMode === 'tablet' ? 'default' : 'outline'}>
            <Tablet className="w-5 h-5" />
          </Button>
          <Button onClick={() => setPreviewMode('desktop')} variant={previewMode === 'desktop' ? 'default' : 'outline'}>
            <Monitor className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleViewWebsite}>
            <Eye className="w-5 h-5 mr-2" /> View Website
          </Button>
          <Button onClick={handlePlan}>
            <DollarSign className="w-5 h-5 mr-2" /> Plans
          </Button>
        </div>
      </div>

      <PreviewFrame>
        {showFullPreview ? (
          <div className="p-4">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your E-commerce Store</h2>
              <nav className="flex space-x-4">
                {user ? (
                  <>
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleSignOut} className="text-blue-400">Sign Out</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleSignUp} className="text-blue-400">Sign Up</button>
                    <button onClick={handleSignIn} className="text-blue-400">Sign In</button>
                  </>
                )}
                <button className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>
              </nav>
            </header>

            <main>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ecommerceItems.map(item => (
                  <Card key={item.id}>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </CardHeader>
                    <CardContent>
                      <p>${item.unitPrice.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </main>

            {cart.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.name} - ${item.unitPrice.toFixed(2)}</span>
                    <Button onClick={() => handleRemoveFromCart(item.id)} variant="destructive">Remove</Button>
                  </div>
                ))}
                <Button onClick={handleCheckout} className="mt-4">
                  <CreditCard className="w-5 h-5 mr-2" /> Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 flex items-center justify-center h-full">
            <p className="text-xl text-gray-300">Click "View Website" to see the full preview</p>
          </div>
        )}
      </PreviewFrame>
    </div>
  );
};

export default EcommercePreview;
