import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CountryCard = ({ country }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[8]
        }
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={country.flags.png}
        alt={`${country.name.common} flag`}
        sx={{ 
          objectFit: 'cover',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="h2"
          sx={{ 
            fontWeight: 600,
            mb: 2,
            color: 'text.primary'
          }}
        >
          {country.name.common}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip 
            label={country.region} 
            size="small" 
            color="primary"
            variant="outlined"
          />
          {country.capital?.[0] && (
            <Chip 
              label={country.capital[0]} 
              size="small" 
              color="secondary"
              variant="outlined"
            />
          )}
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1
            }}
          >
            <strong>Population:</strong> {country.population.toLocaleString()}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <strong>Area:</strong> {country.area.toLocaleString()} km²
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
