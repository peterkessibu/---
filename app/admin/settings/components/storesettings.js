'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Import ShadCN UI components
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Define the form schema
const storeFormSchema = z.object({
    timezone: z.string(),
    storeName: z.string().min(2, 'Store name must be at least 2 characters'),
    currency: z.string(),
    paymentMethods: z.array(z.string()).min(1, 'Select at least one payment method'),
    deliveryServices: z.array(z.string()).min(1, 'Select at least one delivery service'),
})

type StoreFormValues = z.infer<typeof storeFormSchema>

// Define payment methods and delivery services options
const paymentMethods = [
    { id: 'momo', label: 'Mobile Money' },
    { id: 'telecel', label: 'Telecel Cash' },
    { id: 'at', label: 'AT Cash' },
]

const deliveryServices = [
    { id: 'speedaf', label: 'Speedaf' },
    { id: 'other', label: 'Other' },
]

export function OnlineStoreSettingsForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm < StoreFormValues > ({
        resolver: zodResolver(storeFormSchema),
        defaultValues: {
            timezone: 'UTC',
            storeName: '',
            currency: '',
            paymentMethods: [],
            deliveryServices: [],
        },
    })

    async function onSubmit(data: StoreFormValues) {
        setIsLoading(true)
        // TODO: Implement store settings update logic here
        console.log(data)
        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a timezone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="UTC">UTC (GMT)</SelectItem>
                                    {/* Add more timezone options as needed */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="storeName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Store Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a currency" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                    {/* Add more currency options as needed */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="paymentMethods"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Payment Methods</FormLabel>
                                <FormDescription>
                                    Select the payment methods you want to offer.
                                </FormDescription>
                            </div>
                            {paymentMethods.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="paymentMethods"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deliveryServices"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Delivery Services</FormLabel>
                                <FormDescription>
                                    Select the delivery services you want to offer.
                                </FormDescription>
                            </div>
                            {deliveryServices.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="deliveryServices"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Store Settings"}
                </Button>
            </form>
        </Form>
    )
}
