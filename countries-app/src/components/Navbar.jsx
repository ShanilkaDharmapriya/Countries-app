import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { favorites } = useFavorites();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Countries Explorer
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/favorites"
            startIcon={<FavoriteIcon />}
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {!isMobile && 'Favorites'}
            {favorites.length > 0 && (
              <Box
                sx={{
                  ml: 1,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {favorites.length}
              </Box>
            )}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
