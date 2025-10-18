import React from 'react';

interface PriceComponentProps {
  price?: number;
  discounted_amount?: number;
}

const PriceComponent: React.FC<PriceComponentProps> = ({ price = 0, discounted_amount = 0 }) => {
  const discountedPrice = price - discounted_amount;
  const formatAsCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="flex items-center gap-x-3">
      <span className="text-2xl font-bold text-gray-900">
        {formatAsCurrency(discountedPrice)}
      </span>
      {!discounted_amount || <span className="text-lg text-gray-400 line-through">
        {formatAsCurrency(price)}
      </span>}
    </div>
  );
};

export default PriceComponent;