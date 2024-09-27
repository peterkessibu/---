"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// FAQ data
const faqs = [
  {
    question: "What is Next.js?",
    answer:
      "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.",
  },
  {
    question: "How do I start a new Next.js project?",
    answer:
      "To start a new Next.js project, you can use the create-next-app command. Run 'npx create-next-app@latest' in your terminal, follow the prompts, and you'll have a new Next.js project set up and ready to go.",
  },
  {
    question: "What is server-side rendering in Next.js?",
    answer:
      "Server-side rendering (SSR) is a feature in Next.js where the initial HTML content is generated on the server for each request. This can improve performance and SEO by sending fully rendered pages to the client.",
  },
  {
    question: "How does routing work in Next.js?",
    answer:
      "Next.js has a file-system based router. When a file is added to the pages directory, it's automatically available as a route. For example, pages/about.js will be accessible at /about.",
  },
  {
    question: "What are the key features of Next.js?",
    answer:
      "Some key features of Next.js include: server-side rendering, static site generation, API routes, built-in CSS support, code splitting, and fast refresh for a great developer experience.",
  },
];

export default function FAQComponent() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
            onClick={() => toggleFAQ(index)}
            aria-expanded={expandedIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-medium">{faq.question}</span>
            {expandedIndex === index ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedIndex === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="p-4 bg-gray-50">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
