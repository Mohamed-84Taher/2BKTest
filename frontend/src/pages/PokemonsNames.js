import  {useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  '&:hover':{
    cursor:"pointer"
  }
}));

function PokemonsNames() {
const [pokemons,setPokemons]=useState([])
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

  return (
    <Container sx={{ flexGrow: 1 ,marginTop:"50px"}}>
    <Grid container spacing={2}>
 {
  pokemons.map(pokemon=>
    <Grid item lg={4} md={6} xs={12} key={pokemon.name}>
    <Item elevation={3}>
      <Typography variant='h6' sx={{fontWeight:'900'}}>{pokemon.name}</Typography>
      <Box sx={{marginTop:"20px",width:"100%",display:"flex",justifyContent:"space-evenly"}}>
        <Button variant="contained" size="small">
          <Link to={`/pokemondetails/${pokemon.name}`} style={{color:"white",textDecoration:"none"}} >
            More Details
            </Link>
            </Button>
      </Box>
    </Item>
  </Grid>
    )
 }
    
  </Grid>
  </Container>
  )
}

export default PokemonsNames