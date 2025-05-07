import { fetchAllCountries, searchByName, filterByRegion } from '../countryService';

// Mock the fetch function
global.fetch = jest.fn();

describe('Country Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  const mockCountries = [
    {
      name: { common: 'Test Country' },
      capital: ['Test Capital'],
      region: 'Test Region',
      flags: { png: 'test-flag.png' }
    }
  ];

  describe('fetchAllCountries', () => {
    it('should fetch all countries successfully', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCountries)
        })
      );

      const result = await fetchAllCountries();
      expect(result).toEqual(mockCountries);
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    });

    it('should handle API errors', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.reject(new Error('API Error'))
      );

      await expect(fetchAllCountries()).rejects.toThrow('API Error');
    });
  });

  describe('searchByName', () => {
    it('should search countries by name successfully', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCountries)
        })
      );

      const result = await searchByName('test');
      expect(result).toEqual(mockCountries);
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/test');
    });

    it('should handle no results found', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 404
        })
      );

      await expect(searchByName('nonexistent')).rejects.toThrow('Country not found');
    });
  });

  describe('filterByRegion', () => {
    it('should filter countries by region successfully', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCountries)
        })
      );

      const result = await filterByRegion('Europe');
      expect(result).toEqual(mockCountries);
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/Europe');
    });

    it('should handle region filter errors', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.reject(new Error('Region filter failed'))
      );

      await expect(filterByRegion('Invalid')).rejects.toThrow('Region filter failed');
    });
  });
}); 