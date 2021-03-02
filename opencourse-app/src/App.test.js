import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import App from './App';

it('renders successfully ', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders opening page', () => {
  render(<App />);
  //expect(screen.getByLabelText('OpenCourse')).toBeInTheDocument();
  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveTextContent('OpenCourse');

  const elem = screen.getAllByText(/OpenCourse/i);
  expect(elem[0]).toBeInTheDocument();
});

