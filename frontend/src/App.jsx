
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Contact from './components/Contact/Contact';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path='/explore-menu' element={<ExploreMenu />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;

// import React, { useState } from 'react'
// import Navbar from './components/Navbar/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home/Home'
// import Cart from './pages/Cart/Cart'
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
// import Footer from './components/Footer/Footer'
// import Login from './components/Login/Login'
// import Verify from './pages/Verify/Verify'
// import MyOrders from './pages/MyOrders/MyOrders'
// import Contact from './components/Contact/Contact'
// function App() {
//   const [showLogin,setShowLogin]=useState(false);
//   return (
//     <>
//     {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
//     <div className='app'>
//       <Navbar setShowLogin={setShowLogin}/>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/cart' element={<Cart/>}/>
//         <Route path='/order' element={<PlaceOrder/>}/>
//         <Route path='/verify' element={<Verify/>}/>
//         <Route path='/myorders' element={<MyOrders/>}/>
//         <Route path="/contact-us" element={<Contact />} />
//       </Routes>
//     </div>
//     <Footer/>
//     </>
//   )
// }

// export default App