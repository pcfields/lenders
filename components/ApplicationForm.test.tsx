import { render, screen } from '@testing-library/react';
import { ApplicationForm } from './ApplicationForm';
import '@testing-library/jest-dom';

test('Application from should display all empty fields', () => {
  const lenderFields = {
    name: 'Thee Bank',
    fields: ['email', 'name'],
  };

  render(<ApplicationForm data={lenderFields} lenderId="lender1" />);

  expect(screen.getByLabelText('Name')).toHaveValue('');
  expect(screen.getByLabelText('Email')).toHaveValue('');
  expect(screen.getByText('Save')).toBeInTheDocument();
});
