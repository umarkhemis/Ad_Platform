import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import { Container, AppBar, Toolbar, Typography, Button, Grid, Box, Card, CardContent } from '@mui/material'
import '../styles/dashboard.css'
// import Navbar from './NavBar'


const Dashboard = () => {
    const [ads, setAds] = useState([])
    const [chartData, setChartData] = useState([])

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
    
              {/* Ad Cards */}
              <Grid container spacing={3}>
                {ads.map((ad) => (
                  <Grid item xs={12} sm={6} md={4} key={ad.id}>
                    <Card className="card">
                      <CardContent>
                        <Typography variant="h6">{ad.title || "Unknown"}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Views: {ad.views ?? 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Clicks: {ad.clicks ?? 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
    
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
