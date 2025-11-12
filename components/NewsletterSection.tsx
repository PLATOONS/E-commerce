import React from "react";
import Link from "next/link";

const NewsletterSection: React.FC = () =>{
    return(
        <section className="Newsletter mt-3">
            <form action="" className="NL">
                <h2 className="nl_title">Join Our Newsletter</h2>
                <h4 className="nl_subtitle">Sign up for deals, new products and promotions</h4>
                <div className="input_group">
                    <span className="icon"><i className="fa-regular fa-evelope"></i></span>
                    <input type="email" className="email_nl" placeholder="Enter your mail" required/>
                    <button className="submit">Signup</button>
                </div>
            </form>
        </section>
    );
};

export default NewsletterSection;