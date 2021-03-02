/* Testing front-end: creating and editing a course */
import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateAndEdit from './CreateAndEdit';

it('renders successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateAndEdit />, div);
});

it('renders correctly', () => {
  render(<CreateAndEdit />);
  //expect(screen.getByLabelText('OpenCourse')).toBeInTheDocument();
  
  const elem = screen.getAllByText(/Course Title/i);
  expect(elem[0]).toBeInTheDocument();
  const el = screen.getAllByText(/Course Description/i);
  expect(el[0]).toBeInTheDocument();
  const e = screen.getAllByText(/Course Modules:/i);
  expect(e[0]).toBeInTheDocument();
	
  const buttons = screen.getAllByRole('button')
  expect(buttons.length).toBe(4)
  expect(buttons[0]).toHaveTextContent('Save Changes')
  expect(buttons[3]).toHaveTextContent('Add Module')
  // screen.debug()

});

test('add new module works', () => {
  const handleAdd = jest.fn()
  render(<CreateAndEdit />)

  const button1 = screen.getByTestId('addmodulebutton')
  userEvent.click(button1)

  const paperelement = screen.getByTestId('addmoduleextension')

  


})


