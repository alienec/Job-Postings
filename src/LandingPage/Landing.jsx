import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Landing.css";
import Header from "../Components/Header.jsx"
import Footer from "../Components/Footer.jsx";
import { Link } from "react-router-dom";



const HomePage = () => {
  return (
    <div className="container">
      <main className="main-content">
        <div className="content-box">
          <h2>Your Future Starts Here</h2>
          <p>
            Find the perfect job or post your job opening with ease. Let's connect students with opportunities!
          </p>
          <div className="button-group">
            <button className="btn"><Link to="/postings">View Job Postings</Link></button>
            <button className="btn"><Link to="/submit">Submit a Job</Link></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;