import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();

    const [user, setuser] = useState({
        name: "", email: "", mobile: "", profession: "", password: "", cpassword: ""
    })
    const addData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setuser({ ...user, [name]: value })
    }
    const signupUser = async (e) => {
        e.preventDefault();
        const { name, email, mobile, profession, password, cpassword } = user;
        const fetchData = await fetch("http://localhost:5000/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, mobile, profession, password, cpassword }),
            headers: { "Content-Type": "application/json" }
        }
        )
        const jsonData = await fetchData.json();
        if (fetchData.status === 422 || !jsonData) {
            window.alert("Invalid log in details")
        }
        else {
            window.alert("successful log in details")
            navigate("/login")
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
                                <img src="images/Sign up-rafiki.svg" className="img-fluid home_img" alt="signup" />
                            </div>
                            {/* <!-- for left part --> */}
                            <div className="col-md-6 col-12 main_left login_container">
                                <h1>Create Account</h1>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor='name'>Name</label>
                                        <input type="text" name="name" id="name" value={user.name} onChange={addData} autoComplete='off'
                                            placeholder="please enter your name*" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='email'>Email Address</label>
                                        <input type="email" name="email" id="email" value={user.email} onChange={addData} autoComplete='off' placeholder="please enter your email*" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='mobile'>Mobile No</label>
                                        <input type="number" name="mobile" id="mobile" value={user.mobile} onChange={addData} autoComplete='off'
                                            placeholder="please enter your mobile no*" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='profession'>Profession</label>
                                        <input type="text" name="profession" id="profession" value={user.profession} onChange={addData} autoComplete='off'
                                            placeholder="please enter your profession*" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='password'>Password</label>
                                        <input type="password" name="password" id="password" value={user.password} onChange={addData} autoComplete='off'
                                            placeholder="please enter your password*" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='cpassword'>Confirm Password</label>
                                        <input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={addData} autoComplete='off'
                                            placeholder="confirm password*" />
                                    </div>
                                    <h3>Already have an account ? <Link to="/login" >Log In</Link></h3>
                                    <button type="submit" value="signup" onClick={signupUser}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
