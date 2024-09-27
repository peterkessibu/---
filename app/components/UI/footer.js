// components/Footer.js
"use client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here, e.g., sending the email to your server.
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear the input after subscribing
  };

  return (
    <footer className="flex flex-col gap-4 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="flex-1">
        <p className="text-xs text-gray-500">
          © 2024 Acme Inc. All rights reserved.
        </p>
      </div>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {["Terms of Service", "Privacy", "FAQ"].map((item) => (
          <Link
            key={item}
            className="text-xs hover:underline underline-offset-4"
            href="#"
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="flex gap-4">
        <Link className="text-gray-500 hover:text-gray-700" href="#">
          <Facebook className="h-4 w-4" />
        </Link>
        <Link className="text-gray-500 hover:text-gray-700" href="#">
          <Twitter className="h-4 w-4" />
        </Link>
        <Link className="text-gray-500 hover:text-gray-700" href="#">
          <Instagram className="h-4 w-4" />
        </Link>
        <Link className="text-gray-500 hover:text-gray-700" href="#">
          <Linkedin className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-auto">
        <form onSubmit={handleSubscribe} className="flex items-center">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-l-md p-2 text-xs"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-md p-2 text-xs hover:bg-blue-600"
          >
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}
