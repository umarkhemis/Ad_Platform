import React, { useState } from 'react'
import axios from 'axios'
import '../styles/createAds.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './NavBar'

const CreateAds = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [adType, setAdType] = useState('text')
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    // const [contactInfo, setContactInfo] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleFileChange = (e) => {
      if (adType === "image") {
          setImage(e.target.files[0]);
      } else if (adType === "video") {
          setVideo(e.target.files[0]);
      }
  };

    const createAd = async(e) => {
        e.preventDefault()
        setMessage('')


        try{
            const token = localStorage.getItem('token')
            const formData = new FormData()

            formData.append('title', title);
            formData.append('description', description);
            formData.append('adType', adType);
            // formData.append("contact_info", contactInfo);
            if(image) formData.append('image', image)
            if(video) formData.append('video', video)

            await axios.post('http://127.0.0.1:8000/ads/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization : `Bearer ${token}`,
                }
            });
            navigate('/')
            setMessage("Ad created successfully!");

            setTitle("");
            setDescription("");
            setImage(null);
            setVideo(null);

        } catch(err) {
            setMessage('Failed to Create Ad!!!!!')
        }
    }

  return (
    <div className='ad-div'>
      <Navbar />
      <h2>Create Ad</h2>
      {message && <p>{message}</p>}
      <form onSubmit={createAd} encType='multipart/form-data'>
        <br />
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input type="text" id='title' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>     
        <br />

        <div>
          <label htmlFor="description">Description</label>
          <br />
          <textarea id='description' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        
        <br />
        <div>
          <label htmlFor="ad-type">Select Ad Type</label>
          <br />
          <select id='ad-type' value={adType} onChange={(e) => setAdType(e.target.value)}>
            <option value="text">Text Ad</option>
            <option value="image">Image Ad</option>
            <option value="video">Video Ad</option>
          </select>

          {adType === "image" && <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />}
          {/* <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} /> */}
          {adType === "video" && <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />}
          {/* <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} /> */}
        </div>
        {/* <br />
        <div>
          <label htmlFor="title">Contact_Info</label>
          <br />
          <input value={contactInfo} placeholder='Phone number or Email' id='title' autoComplete='off' autoFocus onChange={(e) => setContactInfo(e.target.value)}/>
        </div> */}
        
        <br />
        <div>
          <input type="submit" value='Create Ad'/>
        </div>
        
      </form>
    </div>
  )
}

export default CreateAds
