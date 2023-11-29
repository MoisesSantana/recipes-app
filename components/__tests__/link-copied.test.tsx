import { render, screen } from '@testing-library/react';
import { LinkCopied } from '../link-copied';

describe('LinkCopied', () => {
  it('should render text "Link Copied!"', () => {
    render(<LinkCopied />);
    
    const divElement = screen.getByText('Link Copied!', { selector: 'p' });
    expect(divElement).toBeInTheDocument();
  });
});