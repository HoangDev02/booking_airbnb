import React from "react";
import { FaSpinner } from "react-icons/fa";

/**
 * A loading spinner component that displays a spinning circle with an icon.
 * @component
 */
const LoadingSpinner = () => (
  <div className="flex justify-center items-center w-full h-full pt-10">
    <FaSpinner className="text-black animate-spin size-9" />
    <div className="ml-4 text-red-400 font-semibold animate-pulse">Không có dữ liệu</div>
  </div>
);

export default LoadingSpinner;
