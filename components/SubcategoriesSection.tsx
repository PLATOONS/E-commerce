import React from "react";
import Link from "next/link";

const SubcategoriesSection: React.FC = () => {
    return(
        <section className="subcategories">
            <div className="subcategories__item--living">
                <div className="subcategories_overlay">
                    <h3 className="subcategories_title">Living Room</h3>
                    <Link href = {"/shop"} className= "subcategories_link">Shop Now →</Link>
                </div>
            </div>
            
            <div className="subcategories_item--bedroom">
                <div className="subcategories_overlay">
                    <h3 className="subcategories_title">Bedroom</h3>
                    <Link href = {"/shop"}className="subcategories_link">Shop Now →</Link>
                </div>
            </div>

            <div className="subcategories_item--kitchen">
                <div className="subcategories_overlay">
                    <h3 className="subcategories_title">Kitchen</h3>
                    <Link href = {"/shop"}className="subcategories_link">Shop Now →</Link>
                </div>
            </div>
        </section>
    );
};

export default SubcategoriesSection;