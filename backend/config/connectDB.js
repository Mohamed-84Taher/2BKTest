const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DATABASE)
    } catch (error) {
        console.log('db not connected')
    }
}
module.exports=connectDB