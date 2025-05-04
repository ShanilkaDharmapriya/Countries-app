import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BorderAllIcon from '@mui/icons-material/BorderAll';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [code]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!country) return null;

  const {
    flags,
    name,
    capital,
    region,
    subregion,
    population,
    languages,
    timezones,
    currencies,
    borders,
  } = country;

  const InfoSection = ({ icon, title, content }) => (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      {content}
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        variant="contained"
        sx={{ mb: 4 }}
      >
        Back
      </Button>

      <Box sx={{ position: 'relative' }}>
        {/* Flag Image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 240, sm: 280 },
            height: { xs: 144, sm: 168 },
            mx: 'auto',
            mb: 3,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: theme.shadows[4],
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'white',
            transform: 'translateY(20px)',
            zIndex: 2,
          }}
        >
          <CardMedia
            component="img"
            image={flags.png}
            alt={`${name.common} flag`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Details Card */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent sx={{ p: 4, pt: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 4,
                fontSize: { xs: '2rem', sm: '2.5rem' },
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              {name.official}
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <InfoSection
                  icon={<LocationCityIcon color="primary" />}
                  title="Capital"
                  content={
                    <Typography variant="body1" sx={{ ml: 4 }}>
                      {capital?.[0] || 'N/A'}
                    </Typography>
                  }
                />

                <InfoSection
                  icon={<PublicIcon color="primary" />}
                  title="Region"
                  content={
                    <Box sx={{ ml: 4 }}>
                      <Typography variant="body1">{region}</Typography>
                      {subregion && (
                        <Typography variant="body2" color="text.secondary">
                          {subregion}
                        </Typography>
                      )}
                    </Box>
                  }
                />

                <InfoSection
                  icon={<PeopleIcon color="primary" />}
                  title="Population"
                  content={
                    <Typography variant="body1" sx={{ ml: 4 }}>
                      {population.toLocaleString()}
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InfoSection
                  icon={<LanguageIcon color="primary" />}
                  title="Languages"
                  content={
                    <Box sx={{ ml: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {Object.values(languages || {}).map((lang) => (
                        <Chip
                          key={lang}
                          label={lang}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  }
                />

                <InfoSection
                  icon={<AccessTimeIcon color="primary" />}
                  title="Timezones"
                  content={
                    <Box sx={{ ml: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {timezones.map((timezone) => (
                        <Chip
                          key={timezone}
                          label={timezone}
                          color="secondary"
                          variant="outlined"
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  }
                />

                <InfoSection
                  icon={<CurrencyExchangeIcon color="primary" />}
                  title="Currencies"
                  content={
                    <Box sx={{ ml: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {Object.values(currencies || {}).map((currency) => (
                        <Chip
                          key={currency.name}
                          label={`${currency.name} (${currency.symbol})`}
                          color="success"
                          variant="outlined"
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  }
                />
              </Grid>

              {borders && borders.length > 0 && (
                <Grid item xs={12}>
                  <InfoSection
                    icon={<BorderAllIcon color="primary" />}
                    title="Border Countries"
                    content={
                      <Box sx={{ ml: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {borders.map((border) => (
                          <Chip
                            key={border}
                            label={border}
                            onClick={() => navigate(`/country/${border}`)}
                            size="small"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    }
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Paper>
      </Box>
    </Container>
  );
};

export default CountryDetails; 