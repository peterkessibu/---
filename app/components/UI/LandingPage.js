"use client";
import { Header } from "./Header";
import { KeyFeatures } from "./KeyFeatures";
import { Testimonials } from "./Testimonials";
import FAQComponent from "./faqs"; // Ensure it's a default import
import { Footer } from "./Footer";
import { Button } from "../UI/Button";
import { useRouter } from "next/navigation"; // Import the Next.js router

export default function LandingPage() {
  const router = useRouter(); // Initialize the router

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="flex items-center justify-center w-full py-12 h-screen bg-gradient-to-r from-blue-500 to-green-500">
          <div className="container px-4 text-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                  Start Your Own Online Store in Minutes
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Create a professional e-commerce website with our easy-to-use
                  platform. No coding required.
                </p>
              </div>
              <div className="flex space-x-4 justify-center">
                <Button
                  className="bg-white text-green-500 hover:bg-green-50"
                  size="lg"
                  onClick={() => router.push("/UserValidation")}
                >
                  Get a Shop
                </Button>
              </div>
            </div>
          </div>
        </section>
        <KeyFeatures />
        <Testimonials />
        <FAQComponent />
      </main>
      <Footer />
    </div>
  );
}
