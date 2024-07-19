
import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import { useThemeProvider } from "../../context/ThemeContext";


function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("menu");
  

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();


  const { theme, toggleTheme } = useThemeProvider();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  }

  const handleMobileAppClick = () => {
    setMenu("mobile-app");
    navigate('/');
    setTimeout(() => {
      document.getElementById('app-download').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <div className="navbar">
      <Link to='/'><b className="logo"> Crave-It-Now </b></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a onClick={handleMobileAppClick} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <Link to='/contact-us' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-Us</Link>
      </ul>
      <div className="navbar-right">
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /> <p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  );
}


export default Navbar;
