import React from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";

interface Article {
  image_url: string;
  title: string;
}

const ArticlesSection: React.FC = () => {
  //DAta
  const articlesData: Article[] = [
    {
      image_url: "/Images/home.png",
      title: "7 ways to decor your home"
    },
    {
      image_url: "/Images/kitchen.png", 
      title: "Kitchen organization"
    },
    {
      image_url: "/Images/bedroom.png",
      title: "Decor your bedroom"
    }
  ];

  return (
    <section className="Article-section">
      <div className="Article-header">
        <h2>Articles</h2>
        <Link href="/article" className="view-all">
          <span>View all</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16666 10H15.8333" stroke="#141718" strokeWidth="1.25" strokeLinecap="round"/>
            <path d="M12.5 13.3333L15.8333 10" stroke="#141718" strokeWidth="1.25" strokeLinecap="round"/>
            <path d="M12.5 6.66669L15.8333 10" stroke="#141718" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
        </Link>
      </div>
      
      <div className="articles-container">
        {articlesData.map((article, index) => (
          <ArticleCard
            key={index}
            image_url={article.image_url}
            title={article.title}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;