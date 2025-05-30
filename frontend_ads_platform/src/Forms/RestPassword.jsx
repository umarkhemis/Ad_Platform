import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";
import '../styles/form.css'

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/ads/reset_password/", {
        username,
        new_password: newPassword,
      });
      setMessage(response.data.message);
      setUsername("")
      setNewPassword("")
      window.location.href = '/login'
      // navigate('/login')
    } catch (error) {
      setMessage(error.response?.data?.error || "The provided username doesn't exist!!");
      setUsername("")
      setNewPassword("")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Reset Password</h2>
      <form onSubmit={handleSubmit} className="form-container">
      {message && <p style={{color: 'black', fontSize: "24px", textAlign: 'center'}}>{message}</p>}
        <input
          type="text"
          className="form-input"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          className="form-input"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">Reset Password</button>
      </form>
      
    </div>
  );
};

export default ResetPassword;