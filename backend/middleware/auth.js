import jwt from 'jsonwebtoken';

const authMiddleware=async (req, res, next) =>{

    const {token}=req.headers;
    // console.log(token)
    if(!token){
        return res.status(401).json({success:false,message:"No token, authorization denied!"});
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }
    catch(error){
        console.log(error)
        return res.status(403).json({success:false,message:"Token is not valid!"});
    }
}

export default authMiddleware;