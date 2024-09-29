// page.js
import PricingPage from "../components/UI/pricing/PricingPage"; 
import PricingHeader from "../components/UI/pricing/PricingHeader";  

export default function Page() {
  return (
    <div>
      <PricingHeader />  {/* Render the PricingHeader */}
      <PricingPage />    {/* Render the PricingPage */}
    </div>
  );
}
