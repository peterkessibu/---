"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ProductInventoryProvider } from "./context/ProductInventoryContext";
import { Provider } from "react-redux";
import store from "./context/store"; // Adjust the path as necessary

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ProductInventoryProvider>
          <html lang="en">
            <body>{children}</body>
          </html>
        </ProductInventoryProvider>
      </SessionProvider>
    </Provider>
  );
}
