import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, useTheme, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CountryCard = ({ country }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleCardClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(country);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      style={{ height: '100%' }}
    >
      <Card 
        onClick={handleCardClick}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme.shadows[8],
            cursor: 'pointer'
          },
          minHeight: { xs: 380, sm: 400 },
          maxHeight: { xs: 380, sm: 400 }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={country.flags.png}
            alt={`${country.name.common} flag`}
            sx={{ 
              height: 180,
              objectFit: 'cover',
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          />
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            {isFavorite(country.cca3) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
        <CardContent 
          sx={{ 
            flexGrow: 1,
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '&:last-child': {
              pb: 2.5
            }
          }}
        >
          <Typography 
            gutterBottom 
            variant="h5" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.2,
              minHeight: '2.4em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {country.name.common}
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              mb: 2,
              minHeight: '32px'
            }}
          >
            <Chip 
              label={country.region} 
              size="small" 
              color="primary"
              variant="outlined"
              sx={{ 
                borderRadius: 1,
                fontWeight: 500,
                height: '24px'
              }}
            />
            {country.capital?.[0] && (
              <Chip 
                label={country.capital[0]} 
                size="small" 
                color="secondary"
                variant="outlined"
                sx={{ 
                  borderRadius: 1,
                  fontWeight: 500,
                  height: '24px'
                }}
              />
            )}
          </Box>
          <Box 
            sx={{ 
              mt: 'auto',
              '& > *:not(:last-child)': {
                mb: 1
              }
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& strong': {
                  color: 'text.primary',
                  fontWeight: 600,
                  minWidth: '80px'
                }
              }}
            >
              <strong>Population:</strong> 
              <Box component="span" sx={{ flex: 1 }}>
                {country.population.toLocaleString()}
              </Box>
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& strong': {
                  color: 'text.primary',
                  fontWeight: 600,
                  minWidth: '80px'
                }
              }}
            >
              <strong>Area:</strong> 
              <Box component="span" sx={{ flex: 1 }}>
                {country.area.toLocaleString()} km²
              </Box>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CountryCard;
