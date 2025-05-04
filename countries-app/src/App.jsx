import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritesProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:code" element={<CountryDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
