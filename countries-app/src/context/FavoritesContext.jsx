import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteCountries');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (country) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.cca3 === country.cca3);
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = prevFavorites.filter((fav) => fav.cca3 !== country.cca3);
      } else {
        newFavorites = [...prevFavorites, country];
      }
      
      localStorage.setItem('favoriteCountries', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (countryCode) => {
    return favorites.some((fav) => fav.cca3 === countryCode);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 