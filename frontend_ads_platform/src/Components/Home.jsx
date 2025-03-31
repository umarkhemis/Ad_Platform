import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from './NavBar'
import { Link } from 'react-router-dom'
import '../styles/adStyling.css'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Settings from './Settings'
// import logo from "../assets/logo.jpeg.webp";
// import { useSearchContext } from './SearchContext'
// import { TextField } from "@mui/material";

const Home = ({ }) => {
    const [ads, setAds] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [index, setIndex] = useState(0)
    // const [fade, setFade] = useState(true);
    const adsPerPage = 6;

    useEffect(() => {
        fetchAds()
        
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

  // useEffect(() => {
  //   // if (filteredAds.length < 3) return;
  //   const interval = setTimeout(() => {
  //     setIndex((prevIndex) => (prevIndex + 3) % filteredAds.length);
  //   }, 5000)
  //   return () => clearTimeout(interval)
  // }, [filteredAds])


  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setFade(false); // Start fade-out effect
  //     setTimeout(() => {
  //       setIndex((prevIndex) => (prevIndex + 4) % ads.length);
  //       setFade(true); // Fade in the new ads
  //     },900); // Wait for fade-out before changing
  //   }, 5000); // Change ads every 5 seconds

  //   return () => clearTimeout(timeout);
  // }, [index, ads]);

  const handleNext = () => {
    if (index + adsPerPage < filteredAds.length) {
      setIndex(index + adsPerPage);
    } else {
      setIndex(0); // Loop back to the start
    }
  };

  // Function to handle Previous button
  const handlePrev = () => {
    if (index - adsPerPage >= 0) {
      setIndex(index - adsPerPage);
    } else {
      setIndex(Math.max(filteredAds.length - adsPerPage, 0)); // Go to last set
    }
  };



  


  return (
    <>
      <Navbar setSearchQuery={setSearchQuery}/>
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}
      <div className="home-container" >
        {/* <TextField
          label="Search Ads"
          variant="outlined"~
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2 }}
        /> */}
        <h1 className="home-title">Featured Ads</h1>
        {/* <div className={`ads-grid ${fade ? "fade-in" : "fade-out"}`}> */}
        <div className="ads-grid">
          {filteredAds.length > 0 ?(
            filteredAds.slice(index, index + adsPerPage).map((ad) => (
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
            <h1 style={{color: 'red'}}>No Ads Found</h1>
          )}
        </div> 
        {/* </div> */}
        <div className='prev-next-button'>
          <button className="nav-button prev" onClick={handlePrev}>&lt; Prev</button>
          <button className="nav-button next" onClick={handleNext}>Next &gt;</button>
        </div>
        <hr style={{color: 'black', fontSize: '24px', maxWidth: '2000px'}}/>
        <div className="faq-section">
          <Container maxWidth="lg" >
          <h2 className="faq-title">FAQs</h2>
          
          <Accordion style={{backgroundColor: '#343a40', color: 'white'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography >How do I create an ad?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>To create an ad, go to the "Create Ad" page and fill out the form with your ad details.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#343a40', color: 'white'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Is posting an ad free?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Yes! Posting ads is completely free for now. We may introduce premium features later.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#343a40', color: 'white'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I delete my ad?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>You can delete your ad from your dashboard using the "Delete" button.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#343a40', color: 'white'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Can I edit my ad after posting?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Yes, you can edit your ad from your dashboard by clicking the "Edit" button.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#343a40', color: 'white'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What types of ads are allowed?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>All legal advertisements are allowed. However, we do not permit ads related to illegal activities, drugs, or offensive content.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#343a40', color: 'white'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How long do ads stay active?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Ads remain active for 30 days by default. You can renew them if needed.</Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </div>
      

      </div>

    </>
  );

  

  

};
export default Home;

// const Home = () => {
//   const [ads, setAds] = useState([]); // Store all ads
//   const [index, setIndex] = useState(0); // Track current set of ads
//   const { searchQuery } = useSearchContext(); // Get search query

//   useEffect(() => {
//     fetchAds
//   }, []);

//     const fetchAds = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/ads/");
//       // if (!response.data || !Array.isArray(response.data)) {
//       //   throw new Error("Invalid response format");
//       // }
//       setAds(response.data);
//     } catch (error) {
//       console.error("Error fetching ads:", error.message);
//     }
//   };

//   // Filter ads based on search query
//   const filteredAds =
//     searchQuery === ""
//       ? ads
//       : ads.filter((ad) =>
//           ad.title.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//   // Rotate ads every 5 seconds
//   useEffect(() => {
//     if (filteredAds.length < 3) return; // Prevent errors when less than 3 ads exist

//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 3) % filteredAds.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [filteredAds]);

//   return (
//     <>
//       <Navbar />
//       <div className="home-container">
//         <h1 className="home-title">Featured Ads</h1>
//         <div className="ads-grid">
//           {filteredAds.length > 0 ? (
//             filteredAds.slice(index, index + 3).map((ad) => (
//               <div key={ad.id} className="ad-card">
//                 <Link to={`/ads-details/${ad.id}`} className="ad-link">
//                   {ad.image && <img src={ad.image} alt={ad.title} className="ad-image" />}
//                   {ad.video && (
//                     <video controls className="ad-video">
//                       <source src={ad.video} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   )}
//                   <h2 className="ad-title">{ad.title}</h2>
//                   <p className="ad-description">{ad.description}</p>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <h1>No Ads Found</h1>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

