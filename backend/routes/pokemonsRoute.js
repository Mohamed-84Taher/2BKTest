const express=require('express')
const router=express.Router()
const pokemonsControllers=require('../controllers/pokemonsController')


router.get('/allnames',pokemonsControllers.getAllPokemonsNames)

router.get('/pokemon',pokemonsControllers.getPokemonByName)

router.get('/weak',pokemonsControllers.getWeekPokemons)

router.get('/strong',pokemonsControllers.getStrongPokemons)

router.post('/fight',pokemonsControllers.fightPokemons)

module.exports=router