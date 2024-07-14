import React, { useContext, useEffect, useState} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  
  const onChangehandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder=async(e)=>{
    e.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems)
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+30,

    }
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success)
    {
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else
    {
      alert("Error");
    }
  }
  // useEffect(()=>{
  //   console.log(data)
  // },[data])

  const navigate=useNavigate();
  useEffect(()=>{
    if(!token)
    {
      navigate('/')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/')
    }
  },[token])


  return (
   <form  onSubmit={placeOrder} className="place-order">
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input required type="text" name='firstName' onChange={onChangehandler} value={data.firstName} placeholder='First name'/>
        <input required type="text" name='lastName' onChange={onChangehandler} value={data.lastName} placeholder='Last name' />
      </div>
      <input required name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Email Address'/>
      <input required name='street' onChange={onChangehandler} value={data.street} type="text" placeholder='Street' />
      <div className="multi-fields">
        <input required name='city' onChange={onChangehandler} value={data.city} type="text" placeholder='City' />
        <input required name='state' onChange={onChangehandler} value={data.state} type="text" placeholder='State' />
      </div>
      <div className="multi-fields">
        <input required name='zipcode' onChange={onChangehandler} value={data.zipcode} type="text" placeholder='Zip Code' />
        <input required name='country' onChange={onChangehandler} value={data.country} type="text" placeholder='Country'/>
      </div>
      <input required name='phone' onChange={onChangehandler} value={data.phone} type="text" placeholder='Phone'/>
    </div>

    <div className="place-order-right">
    <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs{getTotalCartAmount()===0?0:30}</p>
            </div>
            <div className="cart-total-details">
              <b>Total : </b>
              <b>Rs{getTotalCartAmount()===0?0:getTotalCartAmount()+30}</b>
            </div>
            <button type='submit' >Proceed to Payment</button>
          </div>
          </div>
    </div>
   </form>
  )
}

export default PlaceOrder
