import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('should render a button with the text "Click me"', () => {
    const buttonChildren = 'Click me';
    render(<Button>{buttonChildren}</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent(buttonChildren);
    expect(buttonElement).toBeInTheDocument();
  })
})