import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../RegionFilter';

describe('RegionFilter', () => {
  const mockOnFilter = jest.fn();
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  beforeEach(() => {
    mockOnFilter.mockClear();
  });

  it('renders with all region options', () => {
    render(<RegionFilter onFilter={mockOnFilter} />);
    
    // Check if the select element is rendered
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    // Check if all regions are present in the options
    regions.forEach(region => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  it('calls onFilter when a region is selected', () => {
    render(<RegionFilter onFilter={mockOnFilter} />);
    const select = screen.getByRole('combobox');
    
    // Select a region
    fireEvent.change(select, { target: { value: 'Europe' } });
    
    // Check if onFilter was called with the correct value
    expect(mockOnFilter).toHaveBeenCalledWith('Europe');
  });

  it('resets filter when "All Regions" is selected', () => {
    render(<RegionFilter onFilter={mockOnFilter} />);
    const select = screen.getByRole('combobox');
    
    // First select a region
    fireEvent.change(select, { target: { value: 'Europe' } });
    
    // Then select "All Regions"
    fireEvent.change(select, { target: { value: '' } });
    
    // Check if onFilter was called with empty string
    expect(mockOnFilter).toHaveBeenCalledWith('');
  });

  it('maintains selected value after selection', () => {
    render(<RegionFilter onFilter={mockOnFilter} />);
    const select = screen.getByRole('combobox');
    
    // Select a region
    fireEvent.change(select, { target: { value: 'Asia' } });
    
    // Check if the select element maintains the selected value
    expect(select.value).toBe('Asia');
  });
}); 