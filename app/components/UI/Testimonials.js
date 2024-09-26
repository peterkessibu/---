// components/Testimonials.js
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../UI/Card";

export function Testimonials() {
    const testimonials = [
        { name: "Alice Johnson", role: "Fashion Boutique Owner", feedback: "This platform made it so easy to set up my online store. I was able to launch within a week!", avatar: "/placeholder.svg?height=40&width=40" },
        { name: "John Smith", role: "Artisan Craftsman", feedback: "The customization options are fantastic. My store truly reflects my brand's unique style.", avatar: "/placeholder.svg?height=40&width=40" },
        { name: "Emily Davis", role: "Tech Startup Founder", feedback: "The integrated payment options and mobile responsiveness have significantly boosted our sales.", avatar: "/placeholder.svg?height=40&width=40" }
    ];

    return (
        <section className="flex flex-col justify-center items-center w-full py-24">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">What Our Customers Say</h2>
                <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name}>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <CardTitle>{testimonial.name}</CardTitle>
                                        <CardDescription>{testimonial.role}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {testimonial.feedback}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
