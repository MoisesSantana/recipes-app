import { render, screen } from '@testing-library/react';
import { Footer } from '../footer';

describe('Footer', () => {
  it('should render a footer with a nav element containing 3 links', () => {
    render(<Footer />);
    
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();

    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(3);
  });

  it('should render the correct links and icons', () => {
    render(<Footer />);
    
    const linkElements = screen.getAllByRole('link');
    expect(linkElements[0]).toHaveAttribute('href', '/recipes/meals');
    expect(linkElements[1]).toHaveAttribute('href', '/recipes/explore');
    expect(linkElements[2]).toHaveAttribute('href', '/recipes/drinks');
    
    const forkIcon = screen.getByTestId('fork-icon');
    const compassIcon = screen.getByTestId('compass-icon');
    const drinkIcon = screen.getByTestId('drink-icon');

    expect(linkElements[0]).toContainElement(forkIcon);
    expect(linkElements[1]).toContainElement(compassIcon);
    expect(linkElements[2]).toContainElement(drinkIcon);
  });
});
