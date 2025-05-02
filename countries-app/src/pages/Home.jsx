import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../services/countriesApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          mb: 4,
          borderRadius: 0
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Explore the World
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Discover information about countries around the globe
          </Typography>
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'white',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' }
                }
              }}
            />
          </Box>
        </Container>
      </Paper>

      {/* Countries Grid */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {filteredCountries.length === 0 ? (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="200px"
          >
            <Typography variant="h6" color="text.secondary">
              No countries found matching your search
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={isMobile ? 2 : 3}>
            {filteredCountries.map((country) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                key={country.cca3}
                sx={{ 
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CountryCard country={country} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
