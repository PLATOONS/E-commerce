import React from "react";

interface ProductDescriptionProps {
  name: string;
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ name, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ProductDescription;
