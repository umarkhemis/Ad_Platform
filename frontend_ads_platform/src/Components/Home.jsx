import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from './NavBar'
import { Link } from 'react-router-dom'
import '../styles/adStyling.css'
// import { TextField } from "@mui/material";

const Home = ({ }) => {
    const [ads, setAds] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchAds()
        // fetchAds("http://127.0.0.1:8000/ads/")
        //   .then((res) => res.json())
        //   .then((data) => setAds(data))
        //   .catch((err) => console.error("Error fetching ads:", err));
    },[])

    

    // const fetchAds = async() => {
    //     try{
    //         const res = await axios.get('http://127.0.0.1:8000/ads/')
    //         setAds(res.data);
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }



  const fetchAds = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/ads/");
      // if (!response.data || !Array.isArray(response.data)) {
      //   throw new Error("Invalid response format");
      // }
      setAds(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error.message);
    }
  };

  // const filteredAds = ads.filter((ad) =>
  //   ad.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredAds =
    searchQuery === ""
      ? ads // Show all ads if search is empty
      : ads.filter((ad) =>
          ad.title.toLowerCase().includes(searchQuery.toLowerCase())
        );


        // const filteredAds =
        // searchQuery === ""
        //   ? ads // Show all ads if search is empty
        //   : ads.filter((ad) =>
        //       ad.title.toLowerCase().includes(searchQuery.toLowerCase())
        //     );
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token"); // Assuming you're using JWT
  //   setIsAuthenticated(!!token); // Converts token to a boolean value
  // }, []);


    return (
        <>
            <Navbar setSearchQuery={setSearchQuery}/>
            {/* <Navbar isAuthenticated={isAuthenticated} /> */}
            <div className="home-container">
              {/* <TextField
                label="Search Ads"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: 2 }}
              /> */}
              <h1 className="home-title">Featured Ads</h1>
              <div className="ads-grid">
                {filteredAds.length > 0 ?(
                  filteredAds.map((ad) => (
                    <div key={ad.id} className="ad-card">
                        <Link to={`/ads-details/${ad.id}`} key={ad.id} className="ad-link">
                            {ad.image && <img src={ad.image} alt={ad.title} className="ad-image" />}
                            {ad.video && (
                                <video controls className="ad-video">
                                <source src={ad.video} type="video/mp4" />
                                Your browser does not support the video tag.
                                </video>
                            )}
                            <h2 className="ad-title">{ad.title}</h2>
                            <p className="ad-description">{ad.description}</p>
                        </Link>
                    </div>
                    ))
                ): (
                  <h1>No Ads Found</h1>
                )}
                
              </div>
            </div>
        </>
    );



  // return (
  //   <div className="ad-container">
  //       <Navbar />
  //       <h2>Latest Ads</h2>
  //     {ads.map((ad) => (
  //       <Link to={`/ads-details/:${ad.id}`} key={ad.id} className="ad-card">
  //         <h3 className='ad-title'>{ad.title}</h3>
  //         {ad.image && <img src={ad.image} alt={ad.title} className="ad-image" />}
  //         {ad.video && (
  //           <video className="ad-video" controls>
  //             <source src={ad.video} type="video/mp4" />
  //             Your browser does not support the video tag.
  //           </video>
  //         )}
  //         <p className='ad-description'>{ad.description}</p>
  //         <p><strong>Date:</strong> {new Date(ad.created_at).toLocaleDateString()}</p>
  //       </Link>
  //     ))}
  //   </div>
  // );

};
export default Home;

