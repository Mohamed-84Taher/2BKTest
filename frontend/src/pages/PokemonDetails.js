import { 
    Card,
    CardContent,
    CardMedia,
    Container,
    Typography,
    Button }
from '@mui/material'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function PokemonDetails() {
    const [pokemon,setPokemon]=useState(null)
    const {pokemonName}=useParams()
      // fetch pokemon with name pokemonName
  useEffect(()=>{
    const fetchPokemon=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/pokemons/pokemon/?pokemonName=${pokemonName}`)
        setPokemon(res.data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchPokemon()
      },[pokemonName])

  return (
    <Container sx={{ flexGrow: 1 ,display:"flex",justifyContent:"center",marginTop:"50px"}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={pokemon?.img}
        alt="green iguana"
        sx={{objectFit: "cover"}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemonName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
       Spawn chance : {pokemon?.spawn_chance}
        </Typography>
      </CardContent>
      <CardContent>
      <Typography variant="h6" color="text.secondary">
        Types :
        </Typography>
        {
            pokemon?.type?.map(typeName=>
            <Button key={typeName} size="small">
              <Link to={`/weakerandstronger/${typeName}`}>{typeName} </Link>
            </Button>)
        }
        
      </CardContent>
    </Card>
    </Container>
  )
}

export default PokemonDetails