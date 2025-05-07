import React, { useState, useEffect, useCallback } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries, searchCountries, filterByRegion } from '../services/countriesApi';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];





const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = useCallback(async (search = '', region = '') => {
    try {
      setLoading(true);
      setError(null);
      let data;

      if (search) {
        data = await searchCountries(search);
      } else if (region) {
        data = await filterByRegion(region);
      } else {
        data = await fetchAllCountries();
      }

      setCountries(data);
    } catch (err) {
      setError('Failed to load countries. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);



  

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        setIsSearching(true);
        fetchData(searchQuery, selectedRegion);
      } else {
        fetchData('', selectedRegion);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedRegion, fetchData]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearRegion = () => {
    setSelectedRegion('');
  };

  if (loading && !isSearching) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
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
      {/* Header Section with Search and Filter */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 4, md: 6 },
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
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Explore the World
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: { xs: 3, md: 4 },
              textAlign: 'center',
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}


          >
            Discover information about countries around the globe
          </Typography>

          {/* Search and Filter Section */}
          <Box 
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              mt: { xs: 2, md: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: 'stretch'
            }}
          >

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={handleClearSearch} 
                      edge="end"
                      size="small"
                      sx={{ color: 'white' }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  color: 'white',
                  '& fieldset': { border: 'none' },
                  '& input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)'
                  },
                  height: '100%'
                }
              }}
              
            />
            <FormControl 
              sx={{ 
                minWidth: { xs: '100%', sm: 200 },
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                '& .MuiInputLabel-root': {
                  color: 'white',
                  '&.Mui-focused': {
                    color: 'white'
                  }
                },
                '& .MuiSelect-icon': {
                  color: 'white'
                },

                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiSelect-select': {
                  color: 'white',
                  padding: '14px 16px'
                }
              }}
            >
              <InputLabel id="region-select-label">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterListIcon fontSize="small" />
                  Filter by Region
                </Box>
              </InputLabel>
              <Select
                labelId="region-select-label"
                value={selectedRegion}
                onChange={handleRegionChange}
                label="Filter by Region"
                sx={{
                  color: 'white',
                  '& fieldset': { border: 'none' }
                }}
                endAdornment={
                  selectedRegion && (
                    <IconButton
                      onClick={handleClearRegion}
                      sx={{ 
                        position: 'absolute', 
                        right: 8, 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'white'
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )
                }

                
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region} sx={{ color: 'text.primary' }}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {countries.length === 0 ? (
          <Box 
            display="flex" 

            justifyContent="center" 
            alignItems="center" 
            minHeight="200px"
            sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 3
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {searchQuery 
                ? `No countries found matching "${searchQuery}"`
                : 'No countries found in this region'}
            </Typography>
          </Box>
        ) : (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ 
              '& > .MuiGrid-item': {
                display: 'flex'
              }
            }}
          >
            {countries.map((country) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                key={country.cca3}
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
