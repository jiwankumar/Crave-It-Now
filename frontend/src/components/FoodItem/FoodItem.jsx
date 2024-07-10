import React, { useState }  from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {

  // const [itemCount,setItemCount]=useState(0);
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);


  return (
    <div>
      <div className="food-item">
        <div className="food-item-img-container">
            <img src={url+"/images/"+image} alt="" className="food-item-image" />
            {
              !cartItems[id]? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt='' />
              : <div className="food-item-counter">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }

{/* not good way so above is implement  */}
{/* <img src={image} alt="" className="food-item-image" />
            {
              !itemCount ? <img className='add' onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_white} alt='' />
              : <div className="food-item-counter">
                <img onClick={()=>setItemCount(prev=>prev-1)} src={assets.remove_icon_red} alt="" />
                <p>{itemCount}</p>
                <img onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_green} alt="" />
              </div>
            } */}




        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">Rs{price}</p>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
