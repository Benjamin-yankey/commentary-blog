/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blog title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/Commentary Blog/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
