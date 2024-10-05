'use client'
import { useState } from 'react'
import { Check, X, Phone } from 'lucide-react'

// Tailwind Components: Button, Input, Card, Badge
const Button = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClass = 'px-4 py-2 rounded text-white font-medium'
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
  }
  return (
    <button
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className = '', ...props }) => (
  <input
    className={`border border-gray-300 px-4 py-2 rounded w-full ${className}`}
    {...props}
  />
)

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white shadow-lg rounded-lg ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">{children}</div>
)

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold ${className}`}>{children}</h3>
)

const CardDescription = ({ children }) => (
  <p className="mt-2 text-gray-600">{children}</p>
)

const CardContent = ({ children }) => (
  <div className="p-6 flex-grow">{children}</div>
)

const CardFooter = ({ children }) => (
  <div className="p-6 border-t border-gray-200">{children}</div>
)

const Badge = ({ children, className = '' }) => (
  <span className={`bg-yellow-400 text-yellow-900 font-medium px-2 py-1 rounded ${className}`}>
    {children}
  </span>
)

export default function PricingPage() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    console.log(`Subscribed with email: ${email}`)
    setEmail('')
  }

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

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Subscribe for Email Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
