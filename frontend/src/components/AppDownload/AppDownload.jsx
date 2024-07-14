import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {

  const openPlayStore = () => {
    window.open("https://play.google.com/store", "_blank");
  };

  const openAppStore = () => {
    window.open("https://www.apple.com/app-store/", "_blank");
  };

  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br /> Crave-It-Now App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt=""  onClick={openPlayStore}/>
            <img src={assets.app_store} alt="" onClick={openAppStore} />
        </div>
      
    </div>
  )
}

export default AppDownload
