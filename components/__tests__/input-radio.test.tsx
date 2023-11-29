import { render, screen } from '@testing-library/react';
import { InputRadio } from '../input-radio';
import { ControllerRenderProps } from 'react-hook-form';
import { SearchType } from '@/types/search';
import userEvent from '@testing-library/user-event';

describe('InputRadio', () => {
  const mockField = {
    onChange: jest.fn(),
    value: SearchType.NAME,
  } as any as ControllerRenderProps<{ search: string, searchType: string }, 'searchType'>;

  it('renders the radio input with the correct value and checked state', () => {
    render(
      <InputRadio field={mockField} value={SearchType.NAME} />
    );

    const radioInput = screen.getByRole('radio', { name: SearchType.NAME })

    expect(radioInput).toBeInTheDocument();

    expect(radioInput).toHaveAttribute('value', SearchType.NAME)
    expect(radioInput).toBeChecked();
  });

  it('calls the onChange function when the radio input is clicked', async () => {
    const user = userEvent.setup();
    render(
      <InputRadio field={mockField} value={SearchType.FIRST_LETTER} />
    );

    const radioInput = screen.getByRole('radio', { name: SearchType.FIRST_LETTER });

    expect(radioInput).toBeInTheDocument();
    expect(radioInput).not.toBeChecked();
    expect(radioInput).toHaveAttribute('value', SearchType.FIRST_LETTER);
    
    expect(mockField.onChange).not.toHaveBeenCalled();

    await user.click(radioInput);
    expect(mockField.onChange).toHaveBeenCalledTimes(1);
  });
});
