const mongoose=require('mongoose')

const evolutionSchema=new mongoose.Schema({
    num:String,
    name:String
})


const pokemonSchema=new mongoose.Schema({
id:Number,
num:String,
name:String,
img:String,
type:[String],
height:String,
weight:String,
candy:String,
egg:String,
spawn_chance:Number,
avg_spawns:Number,
spawn_time:String,
multipliers:[Number] | null,
weaknesses:[String],
next_evolution:[evolutionSchema],
prev_evolution:[evolutionSchema]
}
,{
timestamps:true
})
module.exports=mongoose.model("Pokemon",pokemonSchema)
