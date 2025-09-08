import React from "react";
import Link from "next/link";

const DiscountSection: React.FC = () => {
    return (
        <section className="discount_section">
            <div className="img_dis">
                <img src="/Images/discount.jpg" alt="Discount" />
            </div>
            <div className="info_dis">
                <h3>SALE UP TO 35% OFF</h3>
                <h4>HUNDREDS of <br /> New Lower Prices</h4>
                <p>
                    It’s more affordable than ever to give every room in your home a stylish makeover
                </p>
                <div className="link_desc">
                    <Link href={"/shop"}>Shop now</Link>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.16666 10H15.8333"
                            stroke="#141718"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12.5 13.3333L15.8333 10"
                            stroke="#141718"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12.5 6.66669L15.8333 10"
                            stroke="#141718"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default DiscountSection;
