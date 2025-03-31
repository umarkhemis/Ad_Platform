import React, { useState } from 'react'
import axios from 'axios'
import LoadingIndicator from './LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css'
import { Link } from 'react-router-dom';

const Login = ({ setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        setError("")
        try{
            const res = await axios.post('http://127.0.0.1:8000/ads/login/', {username, password})
            localStorage.setItem('token', res.data.access)
            setToken(res.data.access)
            // alert('Logged in Successfully!!!!!')
            navigate('/')
            setUsername('')
            setPassword('')

        } catch(err) {
            console.log(err)
            setMessage('Invalid Username and or Password!!!!!')
            setUsername('')
            setPassword('')
        } finally{
            setLoading(false)
        }
        // catch (err) {
        //     if (err.response && err.response.data.error) {
        //         setError(err.response.data.error); // Show the error from Django
        //         setPassword("")
        //         setUsername("")
        //     } else {
        //         setError("Something went wrong. Please try again.");
        //         setPassword("")
        //         setUsername("")
        //     }
        // } finally {
        //     setLoading(false)
        // }
            
    }


  return (
    <div>
        <div style={{textAlign: 'center', color: 'white', }}><h3>{message && <p style={{}}>{message}</p>}</h3></div>
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete='off'
                autoFocus
            />
            <br />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete='off'
                
            />
            <br />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">Login</button>
            <br/>
            <div>
                {/* <p className="p2">Don't have an Account?<a href="/register">Register</a></p> */}
                <p className='p2'><Link to="/reset-password">Forgot Password?</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Login
