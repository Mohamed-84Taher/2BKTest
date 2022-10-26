import { Container, MenuItem, InputLabel, Select,FormControl,Button,Box, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"


function Fight() {
const [pokemons,setPokemons]=useState([])
const [myPokemon,setMyPokemon]=useState("")
const [enemyPokemon,setEnemyPokemon]=useState("")
const [result,setResult]=useState("")

const handleChangeMyPokemon=(e)=>{
setMyPokemon(e.target.value)
}
const handleChangeEnemyyPokemon=(e)=>{
setEnemyPokemon(e.target.value)
}
    // fetch all names when component mounted
useEffect(()=>{
  const fetchNames=async()=>{
    try {
      const res=await axios.get('http://localhost:5000/api/pokemons/allnames')
      setPokemons(res.data.pokemonsNames)
    } catch (error) {
      console.log(error.data.response)
    }
  }
    fetchNames()
},[])
// function fight
const fight=async()=>{
 try {
    const res=await axios.post('http://localhost:5000/api/pokemons/fight',{myPokemon,enemyPokemon})
    setResult(res.data.message)
 } catch (error) {
    console.log(error.data.response)
 }
}

  return (
    <Container >
        <Box sx={{flexGrow:1,paddingTop:"50px",display:"flex",justifyContent:"space-between",gap:"30px"}}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">My Pokemon</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={myPokemon}
    label="myPokemon"
    onChange={handleChangeMyPokemon}
  >
    {
        pokemons?.map((pokemon)=>
        <MenuItem key={pokemon.name} value={pokemon.name}>{pokemon.name}</MenuItem>
        )
    }
  </Select>
</FormControl>
    
        
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Enemy Pokemon</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={enemyPokemon}
    label="enemyPokemon"
    onChange={handleChangeEnemyyPokemon}
  >
     {
        pokemons?.map((pokemon)=>
        <MenuItem key={pokemon.name} value={pokemon.name}>{pokemon.name}</MenuItem>
        )
    }
  </Select>
</FormControl>
</Box>
    <Button
      variant='contained'
      sx={{margin:"50px auto",width:"30%"}}
      onClick={fight}
    >
    Fight
    </Button>
    <Typography variant='h3'>
        Result : {result}
    </Typography>
    </Container>
  )
}

export default Fight