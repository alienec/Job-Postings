import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./submit.css"; // Import the CSS for styling
import Loading from "../Components/Loading";

const SubmitJob = () => {
  const [job, setJob] = useState({
    JobTitle: "",
    JobDescription: "",
    JobLocation: "",
    CompanyName: "",
    ContactInformation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!job.JobTitle || !job.JobDescription || !job.JobLocation || !job.CompanyName || !job.ContactInformation) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 2000,
        style: {
          backgroundColor: "rgba(254, 235, 235, 1)",
          borderLeft: "5px solid rgba(145, 4, 4, 1)",
          color: "rgba(145, 4, 4, 1)",
        },
        progressStyle: {
          backgroundColor: "rgba(145, 4, 4, 1)",
        },
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post("https://sbwcj575t9.execute-api.us-east-1.amazonaws.com/job_portal/post_job", job);
      if (response.status === 200) {
        toast.success("Job Posted Successfully!", {
          position: "top-right",
          autoClose: 2000,
          style: {
            backgroundColor: "rgba(237, 254, 235, 1)",
            borderLeft: "5px solid rgba(15, 145, 4, 1)",
            color: "rgba(15, 145, 4, 1)",
          },
          progressStyle: {
            backgroundColor: "rgba(15, 145, 4, 1)",
          },
        });
      }
      setJob({ JobTitle: "", JobDescription: "", JobLocation: "", CompanyName: "", ContactInformation: "" });
    } catch (error) {
      toast.error("Error posting job", {
        position: "top-right",
        autoClose: 2000,
        style: {
          backgroundColor: "rgba(254, 235, 235, 1)",
          borderLeft: "5px solid rgba(145, 4, 4, 1)",
          color: "rgba(145, 4, 4, 1)",
        },
        progressStyle: {
          backgroundColor: "rgba(145, 4, 4, 1)",
        },
      });
      console.error(" Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      {loading ? <Loading /> : ""}
      <div className="form-box">
        <h2 className="form-title">Post Your Job Here</h2>
        <form onSubmit={handleSubmit}>
          <label>Job Title</label>
          <input type="text" name="JobTitle" value={job.JobTitle} onChange={handleChange} required />

          <label>Company Name</label>
          <input type="text" name="CompanyName" value={job.CompanyName} onChange={handleChange} required />

          <label>Job Description</label>
          <textarea name="JobDescription" value={job.JobDescription} onChange={handleChange} required></textarea>

          <label>Location</label>
          <input type="text" name="JobLocation" value={job.JobLocation} onChange={handleChange} placeholder="Enter job location" required />

          <label>Contact Information</label>
          <input type="text" name="ContactInformation" value={job.ContactInformation} onChange={handleChange} required />

          <button type="submit" className="submit-btn">Submit Job</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitJob;
