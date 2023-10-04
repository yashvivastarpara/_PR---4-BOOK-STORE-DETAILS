const check=(req,res,next)=>{
    let {title,author,category,publicationYear,price,quantity,imageUrl,description}=req.body
    if(title&&author&&category&&publicationYear&&price&&quantity&&imageUrl&&description){
        next()
    }
    else{
        res.status(400).json({message: 'All fields are required'})
    }

}
module.exports={check}