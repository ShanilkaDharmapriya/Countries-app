import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../CountryCard';

const mockCountry = {
  name: { common: 'Test Country' },
  capital: ['Test Capital'],
  region: 'Test Region',
  flags: { png: 'test-flag.png' }
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);

    // Check if country name is rendered
    expect(screen.getByText('Test Country')).toBeInTheDocument();

    // Check if capital is rendered
    expect(screen.getByText('Test Capital')).toBeInTheDocument();

    // Check if region is rendered
    expect(screen.getByText('Test Region')).toBeInTheDocument();

    // Check if flag image is rendered with correct alt text
    const flagImage = screen.getByAltText('Test Country flag');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'test-flag.png');
  });

  it('renders with missing optional data', () => {
    const countryWithMissingData = {
      name: { common: 'Test Country' },
      flags: { png: 'test-flag.png' }
    };

    renderWithRouter(<CountryCard country={countryWithMissingData} />);

    // Check if country name is still rendered
    expect(screen.getByText('Test Country')).toBeInTheDocument();

    // Check if "N/A" is shown for missing capital
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('navigates to country details when clicked', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    // Check if the card is wrapped in a link
    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', '/country/Test Country');
  });
}); 