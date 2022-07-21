import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Typography from '@mui/material/Typography';
import GameStartup from './pages/GameStartup';
import Game from './pages/Game';
import GameProvider from './contexts/GameProvider';

function App() {
  return (
    <>
      <GameProvider>
        <Typography sx={{ fontWeight: "600" }} padding={3} align='center' variant="h4" component="div">Juego de Cartas!!</Typography>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GameStartup />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </>
  );
}

export default App;
