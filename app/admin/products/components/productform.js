import Input from "./input";
import Textarea from "./textarea";
import Select from "./select";
import SelectItem from "./selectItem";
import Label from "./label";
import Button from "./button";

export default function ProductForm({
    productName, setProductName,
    description, setDescription,
    category, setCategory,
    unitPrice, setUnitPrice,
    quantity, setQuantity,
    cost, setCost,
    profitPerUnit, overallProfit, totalRevenue,
    status, setStatus,
    handlePriceChange, handleSaveProduct
}) {
    return (
        <form onSubmit={handleSaveProduct}>
            <div className="mb-4">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" />
            </div>
            <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" rows={5} />
            </div>
            <div className="mb-4">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                    <SelectItem value="">Select a category</SelectItem>
                    <SelectItem value="1">Electronics</SelectItem>
                    <SelectItem value="2">Clothing</SelectItem>
                    <SelectItem value="3">Fashion</SelectItem>
                    <SelectItem value="4">Dresses</SelectItem>
                    <SelectItem value="5">Books</SelectItem>
                    <SelectItem value="6">Home & Garden</SelectItem>
                    <SelectItem value="7">Toys & Games</SelectItem>
                </Select>
            </div>
            <div className="mb-4">
                <Label>Pricing</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="unitPrice">Unit Price</Label>
                        <Input id="unitPrice" type="number" value={unitPrice} onChange={(e) => { setUnitPrice(e.target.value); handlePriceChange(); }} placeholder="0.00" />
                    </div>
                    <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" value={quantity} onChange={(e) => { setQuantity(e.target.value); handlePriceChange(); }} placeholder="0" />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <Label>Profit and Revenue</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="profitPerUnit">Profit Per Unit</Label>
                        <Input id="profitPerUnit" type="number" value={profitPerUnit} placeholder="0.00" readOnly />
                    </div>
                    <div>
                        <Label htmlFor="overallProfit">Overall Profit</Label>
                        <Input id="overallProfit" type="number" value={overallProfit} placeholder="0.00" readOnly />
                    </div>
                    <div>
                        <Label htmlFor="totalRevenue">Total Revenue</Label>
                        <Input id="totalRevenue" type="number" value={totalRevenue} placeholder="0.00" readOnly />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <Label htmlFor="cost">Cost Price</Label>
                <Input id="cost" type="number" value={cost} onChange={(e) => { setCost(e.target.value); handlePriceChange(); }} placeholder="Enter cost price" />
            </div>
            <div className="mb-4">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                    <SelectItem value="inventory">Inventory</SelectItem>
                </Select>
            </div>
            <div className="flex justify-end mb-8">
                <Button type="submit">Save Product</Button>
            </div>
        </form>
    );
}
