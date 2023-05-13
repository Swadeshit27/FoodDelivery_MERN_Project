import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault();
    const fetchData = await fetch("http://localhost:5000/login"
      , {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      }
    )
    const jsonData = await fetchData.json();
    if (fetchData.status === 400 || !jsonData) {
      window.alert("Invalid log in details")
    }
    else {
      window.alert("successful log in details")
      // console.log(jsonData);
      localStorage.setItem("userEmail", email);
      console.log(localStorage.getItem("userEmail"))
      localStorage.setItem("token", jsonData.token);
      // console.log(localStorage.getItem("token"));
      navigate("/")
    }

  }
  return (
    <>
      <div className="container-fluid main">
        <div className="row">
          <div className="col-md-10 col-12 mx-auto">
            <div className="row">
              {/* <!-- for right part --> */}
              <div className="col-md-6 col-12 main_right">
                <img src="/images/log-in.svg" className="img-fluid home_img" alt="..." />
              </div>
              {/* <!-- for left part --> */}
              <div className="col-md-6 col-12 main_left login_container">
                <h1>welcome back</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="">Email Address</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" placeholder="please enter your email*" autoComplete='off' />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} id="password" placeholder="please enter your password*" autoComplete='off' />
                  </div>
                  <button type="submit" onClick={loginUser}>Submit</button>
                  <button><Link to="/signup" style={{ "color": "#fff" }}>Create Account</Link></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
