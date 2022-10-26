require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
const connectDB=require('./config/connectDB')


const app=express()
const PORT=process.env.PORT || 5000

connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/api/pokemons',require('./routes/pokemonsRoute'))

app.use(errorHandler)

mongoose.connection.once('open',()=>{
    console.log('db connected')
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
})
mongoose.connection.on('error',(err)=>{
console.log(err)
})
