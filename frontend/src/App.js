import {Routes,Route} from 'react-router-dom'
import './App.css';
import Layout from './components/Layout';
import PokemonsNames from './pages/PokemonsNames';
import CssBaseline from '@mui/material/CssBaseline'
import PokemonDetails from './pages/PokemonDetails';
import WeakerAndStronger from './pages/WeakerAndStronger.js';

function App() {
  return (
<>
<CssBaseline />
 <Routes>
    <Route path='/*' element={<Layout />}>
        <Route index element={<PokemonsNames />} />
        <Route path='pokemondetails/:pokemonName' element={<PokemonDetails />} />
        <Route path='weakerandstronger/:typeName' element={<WeakerAndStronger />} />
    </Route>
 </Routes>
 </>
  );
}

export default App;
