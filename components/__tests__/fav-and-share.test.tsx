import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavAndShare } from '../fav-and-share';

jest.mock('next/navigation', () => ({
  usePathname: () => '/meals',
  useParams: () => ({ id: '123' }),
}));

describe('FavAndShare', () => {
  it('should renders two buttons', () => {
    render(<FavAndShare handleCopy={() => {}} />);
    
    const [shareButton, favButton] = screen.getAllByRole('button');
    const shareIcon = screen.getByTestId('share-icon');
    const favIcon = screen.getByTestId('fav-icon');
    
    expect(shareButton).toBeInTheDocument();
    expect(favButton).toBeInTheDocument();
    expect(shareIcon).toBeInTheDocument();
    expect(favIcon).toBeInTheDocument();
  });

  it('should click in share button', () => {
    const handleCopy = jest.fn();
    render(<FavAndShare handleCopy={handleCopy} />);
    
    const [shareButton] = screen.getAllByRole('button');

    expect(handleCopy).not.toHaveBeenCalled();
    shareButton.click();
    expect(handleCopy).toHaveBeenCalled();
  });
});
