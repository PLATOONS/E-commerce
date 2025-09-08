import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
  image_url: string;
  title: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ image_url, title }) => {
  return (
    <article className="article-card">
      <div className="article-image">
        <Image 
          src={image_url} 
          alt={title}
          width={357}
          height={268}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="article-info">
        <h3>{title}</h3>
        <Link href="#" className="read-more">
          <span>Read more</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16666 10H15.8333" stroke="#141718" strokeWidth="1.25" strokeLinecap="round"/>
            <path d="M12.5 13.3333L15.8333 10" stroke="#141718" strokeWidth="1.25" strokeLinecap="round"/>
            <path d="M12.5 6.66669L15.8333 10" stroke="#141718" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;