// components/KeyFeatures.js
import { Card, CardHeader, CardContent, CardTitle } from "../UI/Card";
import { Paintbrush, ShoppingCart, CreditCard, Smartphone } from "lucide-react";

export function KeyFeatures() {
    const features = [
        {
            icon: <Paintbrush className="w-10 h-10 text-blue-500 mb-2" />,
            title: "Customizable Templates",
            description: "Choose from a wide range of professionally designed templates to create a stunning storefront that resonates with your brand identity. Tailor every aspect to suit your unique style and target audience."
        },
        {
            icon: <ShoppingCart className="w-10 h-10 text-green-500 mb-2" />,
            title: "Drag-and-Drop Design",
            description: "Easily design your store using our intuitive drag-and-drop interface. No coding skills required—just pick and place elements to create a professional-looking site in minutes."
        },
        {
            icon: <CreditCard className="w-10 h-10 text-blue-500 mb-2" />,
            title: "Integrated Payments",
            description: "Simplify your transactions with secure and integrated payment options. Accept payments from multiple providers, ensuring a smooth checkout experience for your customers."
        },
        {
            icon: <Smartphone className="w-10 h-10 text-green-500 mb-2" />,
            title: "Mobile Responsive",
            description: "Ensure your store looks great on all devices, from desktops to smartphones. Capture more sales by providing an excellent shopping experience wherever your customers are."
        }
    ];

    return (
        <section className="flex flex-col justify-center items-center w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Key Features</h2>
                <div className="grid gap-10 grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.title}>
                            <CardHeader>
                                {feature.icon}
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>{feature.description}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
