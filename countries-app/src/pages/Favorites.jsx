import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import CountryCard from '../components/CountryCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 600,
          mb: 4,
          textAlign: 'center',
        }}
      >
        Favorite Countries
      </Typography>

      {favorites.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No favorite countries yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Add countries to your favorites to see them here
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((country) => (
            <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
              <CountryCard country={country} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites; 