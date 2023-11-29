import { render, screen } from '@testing-library/react';
import { InputText } from '../input-text';
import { LoginInputs, SearchInputs } from '@/types/forms';
import userEvent from '@testing-library/user-event';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn().mockReturnValue({
    register: jest.fn(),
  }),
}));

describe('InputText', () => {
  it('should render an input element with correct attributes', () => {
    render(<InputText name={LoginInputs.EMAIL} text='email' isALoginPage />);
    
    const inputElement = screen.getByRole('textbox', { name: 'email' });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveAttribute('id', LoginInputs.EMAIL);
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('placeholder', 'example@email.com');
  });

  it('should write the value in the input element', async () => {
    const user = userEvent.setup();
    
    render(<InputText name={LoginInputs.EMAIL} text='email' isALoginPage />);
    
    const inputElement = screen.getByRole('textbox', { name: 'email' });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
    
    await user.type(inputElement, 'email@email.com');

    expect(inputElement).toHaveValue('email@email.com');
  });

  it('should call the onChange callback when the input value changes', async () => {
    const handleChange = jest.fn();
    
    const user = userEvent.setup();

    render(<InputText name={SearchInputs.SEARCH} text='Enter your search' handleChange={handleChange} />);
    
    const inputValue = 'Test Input';
    const inputElement = screen.getByRole('textbox', { name: 'Enter your search' });
    expect(inputElement).toBeInTheDocument();

    expect(handleChange).not.toHaveBeenCalled();
    
    await user.type(inputElement, 'a');

    expect(handleChange).toHaveBeenCalledWith('a');

    await user.clear(inputElement);

    await user.type(inputElement, inputValue);

    expect(handleChange).toHaveBeenCalledTimes(11);
  });
});