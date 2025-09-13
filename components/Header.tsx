"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(3); // Example count
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
      <header className="desktop_header">
        <p id="name_brand">3legant.</p>
        <div className="options">
          <Link href="#">Home</Link>
          <Link href="#">Shop</Link>
          <Link href="#">Product</Link>
          <Link href="#">Contact Us</Link>
        </div>
        <div className="user_icons">
          <Image src="/Images/search.svg" alt="Search" width={24} height={24} />
          <Image src="/Images/user.svg" alt="User" width={24} height={24} />
          <div className="icon_with_badge">
            <Image src="/Images/cart.svg" alt="Cart" width={24} height={24} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header*/}
      <header className="mobile_header">
        <div className="principal_header">
          <div className="main_title">
            <button 
              id="menu_toggle_on" 
              onClick={() => setIsMenuOpen(true)}
            ></button>
            <p id="first_title">3legant.</p>
          </div>
          <div className="user_icons_mobile">
            <Image src="/Images/search.svg" alt="Search" width={24} height={24} />
            <div className="icon_with_badge">
              <Image src="/Images/cart.svg" alt="Cart" width={24} height={24} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* Flyout Menu */}
        {isMenuOpen && (
          <div className="fly_menu_overlay">
            <div className="fly_menu" ref={menuRef}>
              <div className="first_menu">
                <div className="second_title">
                  <p id="sec_title">3legant.</p>
                  <button 
                    id="menu_toggle_off"
                    onClick={() => setIsMenuOpen(false)}
                  ></button>
                </div>
                <div className="search_bar">
                  <div id="search_icon"></div>
                  <input type="text" name="search" id="search" placeholder="Search" />
                </div>
                <nav className="nav">
                  <div className="option">Home</div>
                  <select name="shop" id="cmb_shop">
                    <option value="" selected disabled>Shop</option>
                  </select>
                  <select name="product" id="cmb_product">
                    <option value="" selected disabled>Product</option>
                  </select>
                  <div className="option">Contact Us</div>
                </nav>
              </div>

              <div className="second_menu">
                <div className="option_2">
                  <a href="#">Cart</a>
                  <div className="icon_with_badge">
                    <Image src="/Images/cart.svg" alt="Cart" width={24} height={24} />
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </div>
                </div>
                <div className="option_2">
                  <a href="#">Wishlist</a>
                  <Image src="/Images/Heart.svg" alt="Wishlist" width={24} height={24} />
                </div>
                <button id="fly_menu_btn">Sign In</button>
                <div className="social_media">
                  <Image src="/Images/social icon.svg" alt="Social Media" width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;