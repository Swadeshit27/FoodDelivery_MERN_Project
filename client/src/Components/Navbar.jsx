import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Badge from 'react-bootstrap/Badge';
import { useCart,useDispatch } from './ContextReducer';
// import Modal from '../Model';
// import Cart from '../screen/Cart';


const Navbar = () => {
    const navigate = useNavigate();
    const data = useCart();
    // const [CartView, setCartView] = useState(false)
    const logout = () => {
        localStorage.removeItem("token");
        window.alert("log out successfully")
        navigate("/login")
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary " style={{ "listStyle": "none" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 fw-semibold text-white" to="/">PalFoodie</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-4 fw-semibold active text-warning" aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token") ?
                            <div className='d-flex pe-4'>
                                <li className="nav-item ">
                                    <Link className="btn bg-white text-success mx-2 fw-semibold" to="/login">LogIn/SignUp</Link>
                                </li>
                            </div>
                            :
                            <div className='d-flex pe-4'>
                                <Link className="btn bg-white text-success mx-2 fw-semibold" to={"/myorder"} >My Order</Link>
                                <Link className="btn bg-white text-success mx-2 fw-semibold" to={"/cart"}>Cart { }
                                    {data.length!=0?<Badge pill bg="danger" text="white">{data.length}</Badge>:""}
                                    
                                    {/* {CartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null} */}
                                </Link>
                                <div className="btn bg-white text-success mx-2 fw-semibold" onClick={logout}>Log Out</div>

                            </div>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
