import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from the frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://crave-it-now-frontend.onrender.com";

  try {
    // Create new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare line items for Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a line item
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 30 * 100,
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while placing order" });
  }
};

  const verifyOrder=async(req,res)=>{

    const {orderId,success}=req.body;
    try{
      if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true})
        res.json({ success: true,message:" Payment Paid"})
      }
      else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({ success: false,message:"Payment failed"})
      }
    }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
  }

  // user order for frontend 

  const userOrders=async(req,res)=>{
    try{
      const orders=await orderModel.find({userId:req.body.userId});
      res.json({ success: true,data:orders});
    }
    catch(error){
      console.log(error)
      res.status(500).json({ success: false,message:"Error while getting user orders"});
    }

  }

  // listing order for Admin panel
  const listOrders=async(req,res)=>{
    try{
      const orders=await orderModel.find({});
      res.json({ success: true,data:orders});
    }
    catch(error){
      console.log(error)
      res.status(500).json({ success: false,message:"Error while getting orders"});
    }
  }

  // api for updating order status
  const updateOrderStatus=async(req,res)=>{
    try{
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({ success: true,message:"Order status updated"})
    }
    catch(error){
      console.log(error)
      res.status(500).json({ success: false,message:"Error while updating order status"});
    }
  }
  
export { placeOrder ,verifyOrder,userOrders,listOrders,updateOrderStatus};
