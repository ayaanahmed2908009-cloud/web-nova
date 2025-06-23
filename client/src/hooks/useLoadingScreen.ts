import { useState, useEffect } from "react";

interface LoadingScreenOptions {
  minDuration?: number;
  trigger?: boolean;
}

export function useLoadingScreen({ 
  minDuration = 2000, 
  trigger = true 
}: LoadingScreenOptions = {}) {
  const [isLoading, setIsLoading] = useState(trigger);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setHasCompleted(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [trigger, minDuration]);

  const handleComplete = () => {
    setIsLoading(false);
  };

  return {
    isLoading: isLoading && trigger,
    handleComplete,
    canComplete: hasCompleted
  };
}