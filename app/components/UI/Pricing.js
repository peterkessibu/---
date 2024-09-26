import { Check } from "lucide-react";
import { Button } from "../UI/Button";

export function Pricing() {
    const plans = [
        {
            title: "Basic",
            description: "For small businesses",
            price: "$19/mo",
            features: [
                "Up to 100 products",
                "Up to 5 categories",
                "Inventory limit: 500 items",
                "2% transaction fee",
                "Basic analytics"
            ]
        },
        {
            title: "Pro",
            description: "For growing businesses",
            price: "$49/mo",
            features: [
                "Unlimited products",
                "Up to 20 categories",
                "Inventory limit: 5,000 items",
                "1% transaction fee",
                "Advanced analytics"
            ]
        },
        {
            title: "Enterprise",
            description: "For large businesses",
            price: "$99/mo",
            features: [
                "Unlimited products",
                "Unlimited categories",
                "Inventory limit: 50,000 items",
                "0.5% transaction fee",
                "Premium support"
            ]
        }
    ];

    return (
        <section id="pricing" className="flex flex-col h-3/4 justify-center items-center w-full">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Choose Your Plan</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div key={plan.title} className="bg-white shadow-lg rounded-lg p-6 flex flex-col h-full justify-between">
                            <div className="mb-4 text-center">
                                <h3 className="text-lg font-bold">{plan.title}</h3>
                                <p className="text-sm text-gray-500">{plan.description}</p>
                            </div>
                            <div className="text-gray-700 text-center">
                                <p className="text-4xl font-bold">{plan.price}</p>
                                <ul className="mt-4 space-y-2">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center">
                                            <Check className="text-green-500 mr-2 w-12" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4 text-center">
                                <Button className="w-full">Choose {plan.title}</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
