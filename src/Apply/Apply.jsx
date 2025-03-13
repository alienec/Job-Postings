import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Apply.css";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";
const ApplyJob = () => {
  const { id } = useParams(); // Capture job_id from URL
  console.log("Applying for Job ID:", id);
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const navigate=useNavigate()
  const [application, setApplication] = useState({
    JobTitle: "",
    YourName: "",
    Email: "",
    job_id: id, // Pre-fill job_id from URL
    CoverLetter: "",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`https://sbwcj575t9.execute-api.us-east-1.amazonaws.com/job_portal/job_title?job_id=${id}`)
        .then((response) => {
          setJobTitle(response.data.JobTitle || "");
          setApplication((prevApp) => ({ ...prevApp, JobTitle: response.data.JobTitle || "" }));
          setLoading(false);
        })
        .catch((error) => {
          console.error("❌ Error fetching job title:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!application.JobTitle || !application.YourName || !application.Email || !application.CoverLetter) {
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
      const response = await axios.post("https://sbwcj575t9.execute-api.us-east-1.amazonaws.com/job_portal/apply", application);
      if (response.status === 200) {
        toast.success("Job Applied Successfully", {
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

        navigate("/postings"); // Navigate to postings page on success
      }
      setApplication({ JobTitle: jobTitle, YourName: "", Email: "", job_id: id, CoverLetter: "" });
      setLoading(false);
    } catch (error) {
      toast.error("Error applying.Try again after some time", {
        position: "top-right",
        autoClose: 2000,
        style: {
          backgroundColor: "rgba(254, 235, 235, 1)",
          borderLeft: "5px solid rgba(145, 4, 4, 1)",
          color: "background: rgba(145, 4, 4, 1)",
        },
        progressStyle: {
          backgroundColor: "rgba(145, 4, 4, 1)",
        },
      });
      console.error("Error deleting user:", error);
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <div className="form-box">
        <h2 className="form-title">Apply for Job</h2>
        {loading && <Loading />}
        <form onSubmit={handleSubmit}>
          <label>Job Title</label>
          <input type="text" name="JobTitle" value={application.JobTitle} readOnly placeholder="Fetching job title..." required />

          <label>Your Name</label>
          <input type="text" name="YourName" value={application.YourName} onChange={handleChange} placeholder="Enter your name" required />
          
          <label>Email</label>
          <input type="email" name="Email" value={application.Email} onChange={handleChange} placeholder="Enter your email" required />

          <label>Cover Letter</label>
          <textarea name="CoverLetter" value={application.CoverLetter} onChange={handleChange} placeholder="Enter cover letter" required></textarea>

          <button type="submit" className="submit-btn">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;