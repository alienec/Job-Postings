import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./postings.css";
import Loading from "../Components/Loading";

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://sbwcj575t9.execute-api.us-east-1.amazonaws.com/job_portal/jobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  const handleApplyClick = (id) => {
    navigate(`/apply/${id}`);
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="job-container" style={{width:"100%"}}>
        {jobs.length === 0 && !loading ? (
          <div className="content-box">
          <p className="no-jobs">No jobs available right now.</p>
          </div>
        ) : (
          <>
            <h2 className="job-heading">Available Jobs</h2>
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job.JobId} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Title:</strong> {job.JobTitle}</p>
                <p><strong>Description:</strong> {job.JobDescription}</p>
                <p><strong>Company:</strong> {job.companyName}</p>
                <p><strong>Location:</strong> {job.JobLocation}</p>
                <p><strong>Contact:</strong> {job.ContactInformation}</p>
                <button className="apply-btn" onClick={() => handleApplyClick(job.JobId)}>Apply Now</button>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobPostings;