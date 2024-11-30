import { useState, useEffect } from "react";

interface TextAnimationProps {
  children: string | string[];
  className?: string | string[];
}

export function TextAnimation({ children, className = "" }: TextAnimationProps) {
  const [displayedText, setDisplayedText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (children !== displayedText) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayedText(children);
        setIsAnimating(false);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [children, displayedText]);

  return (
    <span
      className={`inline-block transition-opacity duration-200 ${
        isAnimating ? "opacity-0" : "opacity-100"
      } ${className}`}
    >
      {displayedText}
    </span>
  );
}
