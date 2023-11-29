import { render, screen } from '@testing-library/react';
import { SearchButton } from '../search-button';

describe('SearchButton', () => {
  it('renders a button', () => {
    render(<SearchButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });
});