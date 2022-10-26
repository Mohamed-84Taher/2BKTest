const Pokemon=require('../models/Pokemon')
const asyncHandler=require('express-async-handler')


//@ desc get all pokemons names
//@ route GET /pokemons/allnames
//@ access Public
const getAllPokemonsNames=asyncHandler(async(req,res)=>{
const pokemonsNames=await Pokemon.find(null,{name:1,_id:0})

if(pokemonsNames.length===0){
    return res.status(400).json({message:'no pokemons found'})
}
res.status(200).json({msg:"all names",pokemonsNames})
})
//@ desc get Pokemon by name
//@ route GET /pokemons/pokemon/?pokemonName
//@access Public
const getPokemonByName=asyncHandler(async(req,res)=>{
    const {pokemonName}=req.query
    const pokemon=await Pokemon.findOne({name:pokemonName}).lean().exec()
    // if no pokemon found
    if(!pokemon){
        return res.status(400).json({message:'no pokemon found has this name'})
    }
    const {img,spawn_chance,type,...rest}=pokemon
    
    res.status(200).json({img,spawn_chance,type})
})
//@ desc get all pokemons that are weak to those element type
//@ route GET /pokemons/weak/?typeName
//@access Public
const getWeekPokemons=asyncHandler(async(req,res)=>{
    const {typeName}=req.query

    const weakPokemons=await Pokemon.find({weaknesses:{$in:[typeName]}})
    res.status(200).json({message:`List of pokemons weaker than the type ${typeName}`,weakPokemons})
})
//@ desc get all pokemons that are strong to those element type
//@ route GET /pokemons/strong/?typeName
//@access Public
const getStrongPokemons=asyncHandler(async(req,res)=>{
    const {typeName}=req.query

    const strongPokemons=await Pokemon.find({weaknesses:{$nin:[typeName]}})
    res.status(200).json({message:`List of pokemons stronger than the type ${typeName}`,strongPokemons})
})

//@ desc compare to pokemons and return who win
//@ route POST /pokemons/fight
//@ access Public
const fightPokemons=asyncHandler(async(req,res)=>{
    const {myPokemon,enemyPokemon}=req.body
    
    if(!myPokemon || !enemyPokemon){
        return res.status(400).json({message:"myPokemon and enenmyPokemon are Requird"})
    }
    const myPokemonObject=await Pokemon.findOne({name:myPokemon}).lean().exec()
    const enemyPokemonObject=await Pokemon.findOne({name:enemyPokemon}).lean().exec()
    
    if(!myPokemonObject || !enemyPokemonObject){
        return res.status(400).json({message:"Please enter a valid pokemon name"})
    }
    let iWin=myPokemonObject.type
                        .some((typeName)=>enemyPokemonObject.weaknesses.includes(typeName))
    let enemyWin=enemyPokemonObject.type
                        .some((typeName)=>myPokemonObject.weaknesses.includes(typeName))

    res.status(200).json({message:(iWin && !enemyWin) ? "Win":(!iWin && enemyWin) ? "Lose":"Draw"})
})
module.exports={
    getAllPokemonsNames,
    getPokemonByName,
    getWeekPokemons,
    getStrongPokemons,
    fightPokemons
}

