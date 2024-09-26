// components/Header.js
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <header className="p-4 flex items-center">
            <Link className="flex items-center justify-center" href="#">
                <ShoppingCart className="h-6 w-6" />
                <span className="">Acme Inc</span>
            </Link>
            <div className="ml-auto">
                <Link
                    className="text-sm font-medium bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                    href="#"
                >
                    Sign In
                </Link>
            </div>
        </header>
    );
}
