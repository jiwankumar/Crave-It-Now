import userModel from  '../models/userModel.js';

// add item to user cart

const addToCart=async(req,res)=>{

    try{
        const userData=await userModel.findOne({_id:req.body.userId});
        // console.log(userData);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"});
        console.log(cartData);

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error"});
    }
}



// remove item from user cart

const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData= await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error"});
    }
}

// fetch user cart data

const getCart=async(req,res)=>{
    try{
        const userData=await userModel.findById(req.body.userId);
        let cartData= await userData.cartData;
        res.json({success:true,cartData});
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error while getting cart data"});
    }
  
}

export{addToCart,removeFromCart,getCart}