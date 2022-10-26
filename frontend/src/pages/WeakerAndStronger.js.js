import { Container,Box, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function WeakerAndStronger() {
  const [weaker,setWeaker]=useState([])
  const [stronger,setStronger]=useState([])
  const {typeName}=useParams()

  useEffect(()=>{
    const fetchWeak=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/pokemons/weak/?typeName=${typeName}`)
        setWeaker(res.data.weakPokemons)
      } catch (error) {
        console.log(error.data.response)
      }
    }
    const fetchStrong=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/pokemons/strong/?typeName=${typeName}`)
        setStronger(res.data.strongPokemons)
      } catch (error) {
        console.log(error.data.response)
      }
    }
    fetchWeak()
    fetchStrong()
  },[typeName])

  return (
    <Container sx={{flexGrow:1,display:"flex",justifyContent:"space-between",marginTop:"30px"}}>
      <Box>
<Typography variant='h5'>List of pokemons weak than the type : {typeName}</Typography>
{
  weaker.map(element=><Typography variant='body2'>{element.name}</Typography>)
}
      </Box>
      <Box>
      <Typography variant='h5'>List of pokemons strong than the type : {typeName}</Typography>
      {
  stronger.map(element=>
  <Typography variant='body2' key={element.id}>
    {element.name}
  </Typography>)
}
      </Box>
    </Container>
  )
}

export default WeakerAndStronger