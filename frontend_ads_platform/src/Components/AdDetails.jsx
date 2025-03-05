

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/adDetails.css'
import Navbar from "./NavBar";

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    fetchAdDetails();
  }, []);

  const fetchAdDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/ads/ad-details/${id}/`);
      if (!response.data) throw new Error("Ad not found");
      setAd(response.data);
    } catch (error) {
      console.error("Error fetching ad details:", error.message);
    }
  };

  if (!ad) return <p>Loading...</p>;

  return (
    <div className="ad-details-container">
      <div>
        {/* <Navbar /> */}
        < div className='home'><h5 style={{marginTop: '70px'}}><a className='a' href="/">⏮ Back </a></h5></div>
      </div>
      <h2>{ad.title}</h2>
      {ad.image && <img src={ad.image} alt={ad.title} className="ad-image" />}
      {ad.video && (
        <video className="ad-video" controls>
          <source src={ad.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <p>{ad.description}</p>
      <p><strong>Created by:</strong> {ad.owner_name}</p>
      <p><strong>Date:</strong> {new Date(ad.created_at).toLocaleDateString()}</p>
      <p><strong>Contact:</strong> {ad.contact_info}</p>
    </div>
  );
};

export default AdDetails;