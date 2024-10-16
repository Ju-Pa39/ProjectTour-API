const jwt = require('jsonwebtoken')

exports.authCheck = (req,res,next)=>{
    const jwt = require('jsonwebtoken')
    try{

        const headerToken = req.headers.authorization
        if(!headerToken){
            return res.status(401).json({message:"No Token"})
        }
        const token = headerToken.split(' ')[1]

        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded 
        console.log(decoded)
        console.log('Hello Check middleware')
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Token invalid"})
    }
}

exports.ownerCheck = (req,res,next)=>{
    try{
        if(req.user.role !== 'OWNER'){
            return res.status(401).json({message:"Role not Owner"})
        }
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Error Owner Check"})
    }
}


