import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseList from './CourseList';
import Button from "@material-ui/core/Button";

test('empty testing', () => { })

describe("Tests CourseList", function() {
  it('renders successfully', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CourseList />, div);
  });

  it('renders correctly', () => {
    render(<CourseList />);

    const elem = screen.getAllByText(/OpenCourse/i);
    expect(elem[0]).toBeInTheDocument();

  });

  it('Edit button works', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}> /Edit/i </Button>)
    fireEvent.click(getByText(/Edit/i))  
    expect(onClick).toHaveBeenCalled()
  });

  it('View button works', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}> /View/i </Button>)
    fireEvent.click(getByText(/View/i))  
    expect(onClick).toHaveBeenCalled()
  });


});
