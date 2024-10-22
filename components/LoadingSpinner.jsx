import React from "react";

const LoadingSpinner = ({
  size = "h-16 w-16",
  color = "border-orange-600",
  message = "Loading...",
}) => {
  return (
    <div
      className="flex h-full items-center justify-center p-5"
      aria-live="polite"
    >
      <div
        className={`animate-spin rounded-full border-t-4 border-solid ${color} ${size}`}
      />
      <span className="sr-only">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
