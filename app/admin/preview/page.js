import EcommercePreview from "./components/EcommercePreview";
import Link from "next/link";

export default function PreviewPage() {
  const initialCart = [
    { id: 1, name: "Wireless Earbuds", unitPrice: 79.99, quantity: 1 },
  ];
  const initialUser = { name: "John Doe" };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">E-commerce Website Preview</h1>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
        <p className="font-bold">Important:</p>
        <p>
          This is a preview of your e-commerce website. To publish and make it
          live, you need to select a plan first.
        </p>
        <Link
          href="/pricing"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Choose a Plan
        </Link>
      </div>
      <EcommercePreview
        storeName="My Awesome Store"
        initialCart={initialCart}
        initialUser={initialUser}
      />
    </div>
  );
}
