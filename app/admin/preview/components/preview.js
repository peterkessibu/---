import React, { useState, useRef } from "react";
import Header from "./header";
import Nav from "./nav";
import FeaturedProducts from "./featuredproducts";
import Footer from "./footer";

export default function EcommercePreview({
  initialCart = [],
  initialUser = null,
}) {
  const [cart, setCart] = useState(initialCart);
  const [user, setUser] = useState(initialUser);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <Header
        user={user}
        setUser={setUser}
        cart={cart}
        toggleCart={toggleCart}
        cartOpen={cartOpen}
        cartRef={cartRef}
        totalItems={totalItems}
      />
      <Nav />
      <FeaturedProducts handleAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}
