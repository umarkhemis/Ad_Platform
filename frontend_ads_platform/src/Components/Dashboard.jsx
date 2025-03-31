import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import { Container, AppBar, Toolbar, Typography, Button, Grid, Box, Card, CardContent, CardMedia } from '@mui/material'
import '../styles/dashboard.css'
import AdDeleteUpdate from './AdDeleteUpdate'
// import Navbar from './NavBar'


const Dashboard = () => {
    const [ads, setAds] = useState([])
    const [chartData, setChartData] = useState([])
    // const [isEditing, setIsEditing] = useState(false);
    // const [updatedTitle, setUpdatedTitle] = useState(ad.title);
    // const [updatedDescription, setUpdatedDescription] = useState(ad.description);
    // const [updatedFile, setUpdatedFile] = useState(null);



    useEffect(() => {
        fetchAds()
    }, [])

    


    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User is not authenticated");
    
        const response = await axios.get("http://127.0.0.1:8000/ads/user-ads/", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }
    
        setAds(response.data);
        generateChartData(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error.message);
      }
    };

    
    const handleAdUpdated = (updatedAd) => {
      setAds((prevAds) =>
        prevAds.map((ad) => (ad.id === updatedAd.id ? updatedAd : ad))
      );
    };
  
    const handleAdDeleted = (adId) => {
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    };

  

    const generateChartData = (ads) => {
        if (!Array.isArray(ads)) return;
        const data = ads.map((ad) => ({
            name: ad.title || 'Unknown',
            views: ad.views ?? 0,
            clicks: ad.clicks ?? 0
        }));
        setChartData(data)
    }

    const downloadAnalytics = () => {
        if (ads.length === 0) return;
        
        const csvContent = [
          "Title,Views,Clicks",
          ...ads.map((ad) => `${ad.title || "Unknown"},${ad.views ?? 0},${ad.clicks ?? 0}`),
        ].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "ad_analytics.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dashboard-container">
          {/* <Navbar /> */}
          
          <div className="dashboard-content">
            {/* <Sidebar className="sidebar" /> */}
            
            
            <div className="main-content">
            < div className='home'><h5 style={{marginTop: '70px'}}><a className='a' href="/">⏮ Back </a></h5></div>
              <Typography variant="h2" gutterBottom>
                Ad Dashboard
              </Typography>

              {/* <Grid container spacing={3} sx={{ padding: 3 }}>
              {ads.length > 0 ? (
              ads.map((ad) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={ad.id}>
                  <Card
                    sx={{
                      maxWidth: 3455,
                      borderRadius: 3,
                      // boxShadow: 5,
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    {ad.image && (
                      <CardMedia
                        component="img"
                        height="80px"
                        image={ad.image}
                        alt={ad.title}
                        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                      />
                    )}
                    {ad.video && (
                      <CardMedia
                        component="video"
                        height="80"
                        controls
                        src={ad.video}
                        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                      />
                    )}
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {ad.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                        {ad.description.length > 50 ? `${ad.description.substring(0, 50)}...` : ad.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Views: {ad.views ?? 0} | Clicks: {ad.clicks ?? 0}
                      </Typography>
                      <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: "center" }}>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => console.log("View Ad")}
                          >
                            View
                          </Button>
                        </Grid>
                        <Grid item>
                          <AdDeleteUpdate
                            ad={ad}
                            onAdUpdated={handleAdUpdated}
                            onAdDeleted={handleAdDeleted}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                ))
                ) : (
                <Typography variant="h6" sx={{ textAlign: "center", width: "100%", marginTop: 4 }}>
                  No Ads Available
                </Typography>
              )}
              </Grid>  */}
     
              {/* Ad Cards */} 
              {/* <Box container spacing={3} sx={{ display: 'grid'}}> 
                {ads.length > 0 ? (
                ads.map((ad) => (
                  <Box >
                    <Card className="card">
                      <CardContent>
                        <Typography variant="h6"><AdDeleteUpdate
                           key={ad.id}
                           ad={ad}
                           onAdUpdated={handleAdUpdated}
                           onAdDeleted={handleAdDeleted}
                        /></Typography>
                        <Typography variant="body2" color="textSecondary">
                          Views: {ad.views ?? 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Clicks: {ad.clicks ?? 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))): (
                  <p>No Ads Available</p>
                )}
              </Box> */}


        {/* <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 3,
              padding: 3,
            }}
          >
          {ads.length > 0 ? (
            ads.map((ad) => (
              <Card
                key={ad.id}
                sx={{
                  borderRadius: 3,
                  // boxShadow: 3,
                  // transition: "transform 0.3s ease-in-out",
                  // "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">
                    <AdDeleteUpdate
                      ad={ad}
                      onAdUpdated={handleAdUpdated}
                      onAdDeleted={handleAdDeleted}
                    />
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Views: {ad.views ?? 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Clicks: {ad.clicks ?? 0}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", gridColumn: "span 3" }}>
              No Ads Available
            </Typography>
          )}
        </Box> */}

      <Box sx={{ padding: 0, backgroundColor: "transparent" }}>
      <Grid container spacing={2}>
        {ads.length > 0 ? (
          ads.map((ad) => (
            <Grid item xs={12} sm={6} md={4} key={ad.id}>
              {/* Use Box for layout but remove any visible background */}
              <Box sx={{ display: "flex", justifyContent: "center", backgroundColor: "black" }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    // boxShadow: 3,
                    // transition: "transform 0.3s ease-in-out",
                    // "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6">
                      <AdDeleteUpdate
                        ad={ad}
                        onAdUpdated={handleAdUpdated}
                        onAdDeleted={handleAdDeleted}
                      />
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Views: {ad.views ?? 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Clicks: {ad.clicks ?? 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              No Ads Available
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>


              {/* <div className='delete-'>
                <h1>Your Ads</h1>
                <div className="ads-container">
               
                  {ads.length > 0 ? (
                    ads.map((ad) => (
                      
                      <AdDeleteUpdate
                        key={ad.id}
                        ad={ad}
                        onAdUpdated={handleAdUpdated}
                        onAdDeleted={handleAdDeleted}
                      />
                      
                    ))
                  ) : (
                    <p>No ads available.</p>
                  )}
                 
                </div>
                
              </div> */}
              
    
              {/* Analytics Section */}
              <div className="analytics-container">
                <Typography variant="h3" gutterBottom>
                  Analytics
                </Typography>
                <div className="analytics-graph" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <ResponsiveContainer width="200%" height="100%">
                    <BarChart data={chartData} width={500} height={300} barGap={10} barCategoryGap={30}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      
                        <Bar dataKey="views" fill="#8884d8" name="Views" />
                        <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
                                       
                    </BarChart>
                  </ResponsiveContainer>
                </div>

            {/* <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <ResponsiveContainer width="200%" heigh'100%'>
                    <BarChart data={chartData} barGap={10} barCategoryGap={30}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#8884d8" name="Views" barSize={40} />
                    <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div> */}
                <Button className="download-btn" onClick={downloadAnalytics}>
                  Download CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
    );



        //     return (
        //         <div className="p-6">
        //             <h2 className="text-2xl font-bold mb-4">Ad Dashboard</h2>
        //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //                 {ads.map((ad) => (
        //                 <Card key={ad.id} className="shadow-lg rounded-lg p-4">
        //                     <CardContent>
        //                     <h3 className="text-lg font-semibold">{ad.title || "Unknown"}</h3>
        //                     <p className="text-sm text-gray-600">Views: {ad.views ?? 0}</p>
        //                     <p className="text-sm text-gray-600">Clicks: {ad.clicks ?? 0}</p>
        //                     </CardContent>
        //                 </Card>
        //                 ))}
        //             </div>
        //             <div className="mt-6">
        //                 <h3 className="text-xl font-bold mb-2">Analytics</h3>
        //                 <BarChart width={500} height={300} data={chartData}>
        //                 <XAxis dataKey="name" />
        //                 <YAxis />
        //                 <Tooltip />
        //                 <Legend />
        //                 <Bar dataKey="views" fill="#8884d8" name="Views" />
        //                 <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
        //                 </BarChart>
        //                 <Button className="mt-4" onClick={downloadAnalytics}>
        //                 Download CSV
        //                 </Button>
        //             </div>
        //         </div>
        //     )
};

export default Dashboard
