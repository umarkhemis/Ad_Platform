import React, { useState } from "react";
import axios from "axios";
import '../styles/AdDeleteUpdate.css'
import { Link } from "react-router-dom";

const AdDeleteUpdate = ({ ad, onAdUpdated, onAdDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(ad.title);
  const [updatedDescription, setUpdatedDescription] = useState(ad.description);
  const [adType, setAdType] = useState('text')
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  // const [updatedFile, setUpdatedFile] = useState(null);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("description", updatedDescription);
    formData.append('adType', adType);
    // if (updatedFile) {
    //   formData.append(ad.image ? "image" : "video", updatedFile);
    // }
    if(image) formData.append('image', image)
    if(video) formData.append('video', video)


    try {
      const token = localStorage.getItem("token"); // Get user token
      const response = await axios.put(
        `http://localhost:8000/ads/update-delete/${ad.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onAdUpdated(response.data); // Update UI
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Failed to update ad", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/ads/update-delete/${ad.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onAdDeleted(ad.id); // Remove ad from UI
    } catch (error) {
      console.error("Failed to delete ad", error);
    }
  };

  return (
    <div className="ad-card">
      {isEditing ? (
        <div className="edit-form">
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              value={updatedTitle}
              id="title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              value={updatedDescription}
              id="description"
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="ad-type">Select Ad Type</label>
            <br />
            <select id='ad-type' value={adType} onChange={(e) => setAdType(e.target.value)}>
              <option value="text">Text Ad</option>
              <option value="image">Image Ad</option>
              <option value="video">Video Ad</option>
            </select>
            {/* <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setUpdatedFile(e.target.files[0])}
            /> */}

            {adType === "image" && <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />}
            
            {adType === "video" && <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />}
            
          </div>
          {/* <div className="button"> */}
            <input onClick={handleEdit} className="save-button" type="submit" value='Save Changes' />
            <input onClick={() => setIsEditing(false)} className="cancel-button" type="submit" value='Cancel' />
          {/* </div> */}
        </div>
      ) : (
        <>
        <div className="delete-update-container">

          <Link to={`/ads-details/${ad.id}`} key={ad.id} className="ad-link">
            {/* {ad.image && <img src={ad.image} alt={ad.title} className="ad-image" />}
            {ad.video && (
                <video controls className="ad-video">
                <source src={ad.video} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            )} */}
            <h2 >{ad.title}</h2>
            <p >{ad.description}</p>
            
          </Link>
          <div className="button">
            <input onClick={() => setIsEditing(true)} className="edit-button" type="submit" value='Edit' />
            <input onClick={handleDelete} className="delete-button" type="submit" value='Delete' />
          </div>

          {/* <h2>{ad.title}</h2>
            <p className="ad-description">{ad.description}</p> */}
            {/* {ad.image && <img src={ad.image} alt={ad.title} className="ad-image"/>}
            {ad.video &&  (
              <video controls>
                <source src={ad.video} type="video/mp4"  className="ad-video"/>
              </video>
            )} */}
            {/* <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            <button onClick={handleDelete} className="delete-button">Delete</button> */}
        </div>
          
        </>
      )}
    </div>
  );
};

export default AdDeleteUpdate;
