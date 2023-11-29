import { render, screen } from '@testing-library/react';
import { Header } from '../header';
import { usePathname, useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));

describe('Header', () => {
  it('should render a link to profile with the correct link and icon', () => {
    (usePathname as jest.Mock).mockImplementation(() => '/recipes/meals');
    render(<Header />);

    const profileLink = screen.getByRole('link');
    const userIcon = screen.getByTestId('user-icon');
    
    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(profileLink).toContainElement(userIcon);
    
    expect(profileLink).toBeInTheDocument();
  });

  it('should render a title "Recipes App"', () => {
    (usePathname as jest.Mock).mockImplementation(() => '/recipes/meals');
    render(<Header />);
    
    const appTitle = screen.getByRole('heading', { name: /recipes app/i, level: 1 });
    expect(appTitle).toBeInTheDocument();
  });

  it('should render a search button when on recipes page', () => {
    (usePathname as jest.Mock).mockImplementation(() => '/recipes/meals');
    render(<Header />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  it('should not render a search button when on profile page', () => {
    (usePathname as jest.Mock).mockImplementation(() => '/profile');
    render(<Header />);

    const searchButton = screen.queryByRole('button');
    expect(searchButton).not.toBeInTheDocument();
  });

  it('should render a fav and share button when on recipe details page', () => {
    (usePathname as jest.Mock).mockImplementation(() => '/recipes/meals/123');
    (useParams as jest.Mock).mockImplementation(() => ({ id: '123' }));
    render(<Header />);

    const [favBtn, shareBtn] = screen.getAllByRole('button');
    expect(favBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
  });
});
