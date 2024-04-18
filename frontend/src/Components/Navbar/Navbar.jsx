import React, { useState, useEffect } from 'react'
import Styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.jpg"



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const IsName = localStorage.getItem("userName")
    setIsLoggedIn(IsName) 
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("token")
    setIsLoggedIn(false) 
  }

  return (
    <div className={Styles.navbar}>
    
              
      {isLoggedIn ? 
      <>
        <div className={Styles.dashboard}>
        <img className={Styles.logo} src={logo} alt='logo' />

<div className={Styles.div}>
          <div className={Styles.left}>
           
            <Link className={Styles.link} to="/home">Home</Link>
            <Link className={Styles.link} to="/emp">Employee List</Link>

          </div>

          <div className={Styles.right}>

            <p>{localStorage.getItem("userName")}</p>
            <Link to="/">
            <button onClick={handleLogout} className={Styles.btn}>Logout</button>
            </Link>

          </div>
          </div>

        </div>
        </>
        : 
        <div className={Styles.loginDiv}>
        <img style={{width:"35px", margin:"10px 0px 10px 20px"}} src={logo} alt='logo'/>
        <Link to="/" className={Styles.LoginLink}><h3>Login</h3></Link>
        </div>
      }
    </div>
    
  )
}

export default Navbar
