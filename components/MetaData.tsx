import React from "react";

interface ProductMetaDataProps {
  SKU: string;
  category: string;
}

const ProductMetaData: React.FC<ProductMetaDataProps> = ({ SKU, category }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-sm">
      <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
        <span className="text-gray-500 text-xs font-semibold uppercase">
          SKU
        </span>
        <span className="text-gray-700 text-sm">{SKU}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500 text-xs font-semibold uppercase">
          Category
        </span>
        <span className="text-gray-700 text-sm">{category}</span>
      </div>
    </div>
  );
};

export default ProductMetaData;



