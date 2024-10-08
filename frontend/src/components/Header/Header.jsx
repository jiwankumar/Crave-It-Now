import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleViewMenuClick = () => {
    navigate('/explore-menu');
  }
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order Your Favourite Food here</h2>
        <p>Choose a diverse menu featuring a delectable array of dishes crafted with the finest ingredients</p>
        <button onClick={handleViewMenuClick}>View Menu</button>
      </div>
    </div>
  )
}

export default Header;

// import React from 'react'
// import './Header.css'
// function Header() {
//   return (
//     <div className='header'>
//         <div className="header-contents">
//             <h2>Order Your Favourite Food here</h2>
//             <p>Choose a diverse menu featuring delectable array of dishes creafted with finest ingredients</p>
//             <button>View Menu</button>
//         </div>
      
//     </div>
//   )
// }

// export default Header