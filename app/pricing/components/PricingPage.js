import { Check, X, Phone } from 'lucide-react'
import { Button } from './Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Badge } from './Badge'

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$19',
      features: [
        'Up to 100 products',
        'Up to 5 categories',
        'Inventory limit: 500 items',
        '2% transaction fee',
        'Basic analytics',
      ],
      notIncluded: ['Customization options'],
    },
    {
      name: 'Pro',
      price: '$49',
      features: [
        'Unlimited products',
        'Up to 20 categories',
        'Inventory limit: 5,000 items',
        '1% transaction fee',
        'Advanced analytics',
        'Some customization options',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited products',
        'Unlimited categories',
        'Inventory limit: 50,000 items',
        '0.5% transaction fee',
        'Premium support',
        'Full customization options',
      ],
      callForPrice: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your e-commerce needs
          </p>
        </div>

        <div className="mt-12">
          <div className="grid gap-8 lg:grid-cols-3 sm:gap-6 xl:gap-10">
            {plans.map((plan) => (
              <Card key={plan.name} className={`flex flex-col justify-between ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.name !== 'Enterprise' && <span className="text-base font-medium text-gray-500">/month</span>}
                  </CardDescription>
                  {plan.popular && (
                    <Badge className="absolute top-4 right-4">
                      Most Popular
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                        <span className="ml-3 text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <X className="flex-shrink-0 w-5 h-5 text-red-500" />
                        <span className="ml-3 text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.callForPrice ? (
                    <Button className="w-full" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call for Pricing
                    </Button>
                  ) : (
                    <Button className="w-full">Get Started</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
