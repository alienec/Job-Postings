import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import Landing from "./LandingPage/Landing";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ApplyJob from "./Apply/Apply";
import SubmitJob from "./Submit/submit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Postings from "./Postings/postings";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <ToastContainer />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/submit" element={<SubmitJob />} />
            <Route path="/apply/:id" element={<ApplyJob />} />
            <Route path="/postings" element={<Postings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;