import { Paintbrush, ShoppingCart, CreditCard, Smartphone } from "lucide-react";

function renderIcon(iconType) {
    const iconProps = { className: "w-10 h-10 mb-2" };
    switch (iconType) {
        case "Paintbrush":
            return <Paintbrush {...iconProps} className="text-blue-500" />;
        case "ShoppingCart":
            return <ShoppingCart {...iconProps} className="text-green-500" />;
        case "CreditCard":
            return <CreditCard {...iconProps} className="text-blue-500" />;
        case "Smartphone":
            return <Smartphone {...iconProps} className="text-green-500" />;
        default:
            return null;
    }
}

export function KeyFeatures() {
    const features = [
        {
            iconType: "Paintbrush",
            title: "Customizable Templates",
            description: "Choose from a wide range of professionally designed templates to create a stunning storefront that resonates with your brand identity. "
        },
        {
            iconType: "ShoppingCart",
            title: "Drag-and-Drop Design",
            description: "Easily design your store using our intuitive drag-and-drop interface."
        },
        {
            iconType: "CreditCard",
            title: "Integrated Payments",
            description: "Simplify your transactions with secure and integrated payment options."
        },
        {
            iconType: "Smartphone",
            title: "Mobile Responsive",
            description: "Ensure your store looks great on all devices, from desktops to smartphones."}
    ];

    return (
        <div className="flex flex-col justify-center items-center w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container p-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl md:text-5xl mb-12">
                    Key Features
                </h2>
                <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full transition-transform transform hover:scale-105">
                            <div className="mb-4 flex flex-col items-center">
                                {renderIcon(feature.iconType)}
                                <h3 className="text-xl font-semibold text-gray-800 mt-2">{feature.title}</h3>
                            </div>
                            <div className="flex-grow text-gray-600 text-center">
                                <p className="text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
