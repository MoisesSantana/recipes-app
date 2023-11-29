import { render, screen } from '@testing-library/react';
import { Loading } from '../loading';

describe('Loading component', () => {
  it('should render the loading spinner', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should render the "Processing..." text', () => {
    render(<Loading />);
    const processingText = screen.getByRole('button', { name: 'Processing...' });
    expect(processingText).toBeInTheDocument();
  });
});
