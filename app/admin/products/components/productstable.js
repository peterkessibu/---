import { Trash, Edit3 } from "lucide-react";
import Image from "next/image";

const ProductTab = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone X Pro",
      // image: '/images/smartphone-x-pro.png',
      price: "$999.00",
      totalSales: 150,
      createdAt: "6/22/2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Wireless Earbuds Ultra",
      // image: '/images/wireless-earbuds.png',
      price: "$199.00",
      totalSales: 300,
      createdAt: "6/22/2024",
      status: "Active",
    },
    {
      id: 3,
      name: "Smart Home Hub",
      // image: '/images/smart-home-hub.png',
      price: "$149.00",
      totalSales: 200,
      createdAt: "6/22/2024",
      status: "Active",
    },
    {
      id: 4,
      name: "4K Ultra HD Smart TV",
      // image: '/images/4k-ultra-tv.png',
      price: "$799.00",
      totalSales: 50,
      createdAt: "6/22/2024",
      status: "Active",
    },
    {
      id: 5,
      name: "Gaming Laptop Pro",
      // image: '/images/gaming-laptop-pro.png',
      price: "$1299.00",
      totalSales: 75,
      createdAt: "6/22/2024",
      status: "Active",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Products</h1>
      <p className="text-gray-600 mb-6">
        Manage your products and view their sales performance.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-600">
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b text-gray-700">
                <td className="p-4 flex items-center">
                  {/* Hide the image on mobile screens */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 mr-4 p-3 rounded hidden md:block"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs">
                    {product.status}
                  </span>
                </td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">
                  {/* Edit and Delete icons */}
                  <div className="flex items-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTab;
