import { render, screen } from '@testing-library/react';
import { Error } from '../error';

describe('Error', () => {
  it('should render the error message', () => {
    const errorMessage = 'This is an error message';
    render(<Error message={errorMessage} />);
    
    const errorElement = screen.getByRole('button');
    expect(errorElement).toHaveTextContent('This is an error message');
    expect(errorElement).toBeInTheDocument();
  
    const iconElement = screen.getByTestId('warning-icon');
    expect(iconElement).toBeInTheDocument();
  });
});

