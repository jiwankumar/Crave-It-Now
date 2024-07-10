import userModel from  '../models/userModel.js';

// add item to user cart

const addToCart=async(req,res)=>{
    // console.log(req.body);

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

// chatgpt
// const addToCart = async (req, res) => {
//     try {
//       const userId = req.body.userId;
//       const itemId = req.body.itemId;
//        // Assuming you meant itemId instead of userId

//        console.log(userId, itemId);
  
//       const user = await userModel.findOneAndUpdate(
//         { _id: userId },
//         { $set: { cartData: { ...(user.cartData || {}), [itemId]: 1 } } },
//         { new: true } // Return the updated document
//       );
  
//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
  
//       res.json({ success: true, message: "Added to cart" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: "Error" });
//     }
//   };
  
/*
const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        // Fetch the user data
        let userData = await userModel.findOne({ _id: userId });
        console.log(userData);

        // Initialize cartData if it does not exist
        let cartData = userData.cartData || {};
        console.log(cartData)

        // Update the cartData
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        // Update the user document with the new cartData
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        // Respond with success
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

*/


// Other functions (removeFromCart and getCart) remain unchanged
// ...


// remove item from user cart

const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData= await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]-=1;
            await userModel.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({success:true,message:"Removed from cart"});
        }
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