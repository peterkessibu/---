import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToInventory } from "../../../context/actions/actions";
import { Card, CardContent } from "./card";
import ProductImageUploader from "./imageloader";
import ProductForm from "./ProductForm";

export default function ProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [profitPerUnit, setProfitPerUnit] = useState("");
  const [overallProfit, setOverallProfit] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [status, setStatus] = useState("inventory");
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=200&width=200");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("productFormData"));
    if (savedData) {
      setProductName(savedData.productName || "");
      setDescription(savedData.description || "");
      setCategory(savedData.category || "");
      setUnitPrice(savedData.unitPrice || "");
      setQuantity(savedData.quantity || "");
      setCost(savedData.cost || "");
      setProfitPerUnit(savedData.profitPerUnit || "");
      setOverallProfit(savedData.overallProfit || "");
      setTotalRevenue(savedData.totalRevenue || "");
      setStatus(savedData.status || "inventory");
      setImageUrl(savedData.imageUrl || "/placeholder.svg?height=200&width=200");
      setImageFile(savedData.imageFile || null);
    }
  }, []);

  useEffect(() => {
    const formData = {
      productName,
      description,
      category,
      unitPrice,
      quantity,
      cost,
      profitPerUnit,
      overallProfit,
      totalRevenue,
      status,
      imageUrl,
      imageFile,
    };
    localStorage.setItem("productFormData", JSON.stringify(formData));
  }, [productName, description, category, unitPrice, quantity, cost, profitPerUnit, overallProfit, totalRevenue, status, imageUrl, imageFile]);

  const handleSaveProduct = (event) => {
    event.preventDefault();
    dispatch(addToInventory({
      productName,
      description,
      category,
      unitPrice,
      quantity,
      imageUrl,
      status,
    }));
    clearForm();
  };

  const clearForm = () => {
    setProductName("");
    setDescription("");
    setCategory("");
    setUnitPrice("");
    setQuantity("");
    setCost("");
    setProfitPerUnit("");
    setOverallProfit("");
    setTotalRevenue("");
    setStatus("inventory");
    setImageUrl("/placeholder.svg?height=200&width=200");
    setImageFile(null);
    setErrorMessage("");
  };

  const handlePriceChange = () => {
    if (!quantity || !unitPrice || !cost) {
      setProfitPerUnit("");
      setOverallProfit("");
      setTotalRevenue("");
      return;
    }
    const profit = (unitPrice - cost).toFixed(2);
    const totalProfit = (quantity * profit).toFixed(2);
    const revenue = (quantity * unitPrice).toFixed(2);
    setProfitPerUnit(profit);
    setOverallProfit(totalProfit);
    setTotalRevenue(revenue);
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col md:flex-row-reverse">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
          <ProductImageUploader
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            setImageFile={setImageFile}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
        <div className="w-full md:w-1/2">
          <ProductForm
            productName={productName}
            setProductName={setProductName}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            unitPrice={unitPrice}
            setUnitPrice={setUnitPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            cost={cost}
            setCost={setCost}
            profitPerUnit={profitPerUnit}
            overallProfit={overallProfit}
            totalRevenue={totalRevenue}
            status={status}
            setStatus={setStatus}
            handlePriceChange={handlePriceChange}
            handleSaveProduct={handleSaveProduct}
          />
        </div>
      </CardContent>
    </Card>
  );
}
