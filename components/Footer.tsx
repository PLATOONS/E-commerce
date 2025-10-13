import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="home_footer">
      <div className="footer_title_container">
        <h2 className="footer_title">3legant.</h2>
        <hr className="footer_title_underline" />
        <Link href="/shop" className="footer_store">
          Gift and Decoration Store
        </Link>
      </div>

      <nav className="footer_nav">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/product">Product</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact us</Link>
      </nav>

      <hr className="footer_divisor" />

      <div className="footer_socials">
        <img src="/Images/instagram.svg" alt="Instagram" />
        <img src="/Images/facebook.svg" alt="Facebook" />
        <img src="/Images/youtube.svg" alt="YouTube" />
      </div>

      <div className="footer_policies">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms_use">Terms of use</Link>
      </div>

      <p className="copyright">
        Copyright © {new Date().getFullYear()} 3legant. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;