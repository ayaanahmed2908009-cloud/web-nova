import { useState } from "react";
import { Button } from "@/components/ui/button";
import CrypticLoadingScreen from "@/components/CrypticLoadingScreen";

export default function LoadingDemo() {
  const [showLoading, setShowLoading] = useState(false);

  const triggerLoading = () => {
    setShowLoading(true);
    // Auto-hide after demo completes
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  };

  const handleComplete = () => {
    setShowLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Loading Screen Demo</h1>
        <Button onClick={triggerLoading} className="bg-black text-white">
          Show Cryptic Loading Screen
        </Button>
      </div>

      <CrypticLoadingScreen 
        isVisible={showLoading}
        onComplete={handleComplete}
        duration={2500}
      />
    </div>
  );
}