const API_BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const searchCountries = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/name/${name}`);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error('Failed to search countries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching countries:', error);
    throw error;
  }
};

export const filterByRegion = async (region) => {
  try {
    const response = await fetch(`${API_BASE_URL}/region/${region}`);
    if (!response.ok) {
      throw new Error('Failed to filter countries by region');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error filtering countries by region:', error);
    throw error;
  }
}; 