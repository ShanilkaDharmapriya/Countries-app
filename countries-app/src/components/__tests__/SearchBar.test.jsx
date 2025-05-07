import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders with placeholder text', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
  });

  it('calls onSearch when user types', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    
    fireEvent.change(searchInput, { target: { value: 'France' } });
    
    // Check if onSearch was called with the correct value
    expect(mockOnSearch).toHaveBeenCalledWith('France');
  });

  it('debounces search input', async () => {
    jest.useFakeTimers();
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    
    fireEvent.change(searchInput, { target: { value: 'F' } });
    fireEvent.change(searchInput, { target: { value: 'Fr' } });
    fireEvent.change(searchInput, { target: { value: 'Fra' } });
    
    // Fast-forward timers
    jest.runAllTimers();
    
    // Should only call onSearch once with the final value
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Fra');
    
    jest.useRealTimers();
  });

  it('clears search when clear button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    
    // Type something
    fireEvent.change(searchInput, { target: { value: 'France' } });
    expect(searchInput.value).toBe('France');
    
    // Clear the input
    fireEvent.click(screen.getByRole('button'));
    
    // Check if input is cleared
    expect(searchInput.value).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
}); 