import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="home_footer">
      {/* Título */}
      <div className="footer_title_container">
        <h2 className="footer_title">3legant.</h2>
        <hr className="footer_title_underline" />
        <Link href="/Store" className="footer_store">
          Gift and Decoration Store
        </Link>
      </div>

      {/* Navegación */}
      <nav className="footer_nav">
        <Link href="/Index">Home</Link>
        <Link href="/Shop">Shop</Link>
        <Link href="/Product">Product</Link>
        <Link href="/Blog">Blog</Link>
        <Link href="/Contact">Contact us</Link>
      </nav>

      <hr className="footer_divisor" />

      {/* Redes sociales */}
      <div className="footer_socials">
        <img src="/Images/instagram.svg" alt="Instagram" />
        <img src="/Images/facebook.svg" alt="Facebook" />
        <img src="/Images/youtube.svg" alt="YouTube" />
      </div>

      {/* Políticas */}
      <div className="footer_policies">
        <Link href="/Privacy">Privacy Policy</Link>
        <Link href="/TermsUse">Terms of use</Link>
      </div>

      {/* Copyright */}
      <p className="copyright">
        Copyright © {new Date().getFullYear()} 3legant. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;