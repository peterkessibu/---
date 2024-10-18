import React, { useState, useEffect } from "react";

const Nav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    fetch("/api/inventory/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-2">
        <ul className="flex space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <li key={category}>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
