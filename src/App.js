import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Typography from '@mui/material/Typography';
import GameStartup from './pages/GameStartup';
import Game from './pages/Game';

function App() {
  return (
    <>
      <Typography sx={{ fontWeight: "600" }} align='center' marginY={5} variant="h4" component="div">Juego de Cartas!!</Typography>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameStartup />} />
          <Route path="/game" element={<Game />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
