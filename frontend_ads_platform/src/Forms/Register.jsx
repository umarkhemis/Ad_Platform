import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import LoadingIndicator from "./LoadingIndicator";

const Register = ({setToken}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        setLoading(true)
        setError("")
        e.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/ads/register/', {username, email, password})
            // localStorage.setItem('token', res.data.access)
            // setToken(res.data.access)
            // alert('User Registered Successfully!!!!!')
            navigate('/login')
           
        } catch(err){
            console.log(err)
            setMessage('Username and or Password already exist!!!!!')
            setUsername("")
            setEmail("")
            setPassword("")
        } finally {
            setLoading(false)
        }
        // catch (err) {
        //     if (err.response && err.response.data) {
        //         setError("Registration failed: " + JSON.stringify(err.response.data));
        //         setUsername("")
        //         setEmail("")
        //         setPassword("")
        //     } else {
        //         setError("Something went wrong. Please try again.");
        //         setUsername("")
        //         setEmail("")
        //         setPassword("")
        //     }
        // } finally{
        //     setLoading(false)
        // }
    }

  return (
    <div>
        
        <div style={{textAlign: 'center', color: 'white', }}><h3>{message && <p style={{}}>{message}</p>}</h3></div>
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <br />
            <input 
                type="email" 
                value={email}
                placeholder='Email'
                autoComplete='off'
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                className='form-input'
            />
            <br />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">Register</button>
            <br/>
            <div>
                <p className="p1">Already have an Account?<a href="/login">Login</a></p>
            </div>
            
        </form>

    </div>
  )
}

export default Register
