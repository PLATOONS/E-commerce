import React from 'react';

 type BenefitItemProps = {
    image_url: string;
    title: string;
    description: string;
};

 const BenefitItem: React.FC<BenefitItemProps> = ({ image_url, title, description }) => (
    <div className="feature-card">
        <img src={image_url} alt={`${title} icon`} width={48} height={48} />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

type BenefitSectionProps = {
    data?: BenefitItemProps[ ];
};

const defaultData: BenefitItemProps[] = [
      { image_url: "/Images/free_shipping.png", title: "Free Shipping", description: "Order above $200" },
  { image_url: "/Images/money_back.webp",  title: "Money-back",    description: "30 days guarantee" },
  { image_url: "/Images/secure.png",       title: "Secure Payments", description: "Secured by Stripe" },
  { image_url: "/Images/call.png",         title: "24/7 Support",    description: "Phone and Email support" },
];

const BenefitSection: React.FC<BenefitSectionProps> = ({ data = defaultData }) => (
  <section className="features">
    {data.map((item) => ( //for each item in data, render a BenefitItem component
      <BenefitItem
        key={item.title}
        image_url={item.image_url}
        title={item.title}
        description={item.description}
      />
    ))}
  </section>
);
export default BenefitSection; // use default to export just one component per file