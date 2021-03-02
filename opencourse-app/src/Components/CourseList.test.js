import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseList from './CourseList';

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

});
