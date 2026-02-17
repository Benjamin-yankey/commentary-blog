/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DevLog platform', () => {
  render(<App />);
  // Check for parts of the main heading that aren't split across elements
  const codeText = screen.getByText(/Code/i);
  const writingText = screen.getByText(/Great Writing/i);
  expect(codeText).toBeInTheDocument();
  expect(writingText).toBeInTheDocument();
});
