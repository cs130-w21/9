/* Testing front-end: creating and editing a course */
import React, { useState as useStateMock } from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateAndEdit from './CreateAndEdit';


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe("Tests CreateAndEdit", function() {
  /* it('renders successfully', () => {
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
  }); */

  const setState = jest.fn();
  const useStateMock: any = (initState: any) => [initState, setState];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Tests useState hook Adding a new', () => {
    screen.debug();

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    render(<CreateAndEdit />);          
    const button1 = screen.getByTestId('addmodulebutton')
    fireEvent.click(button1)
    expect(setState).toHaveBeenCalledTimes(10);
    });



/*
  it('Tests adding a new module', () => {
    render(<CreateAndEdit />)
    //const state = screen.getByText("0");
    //const state = screen.getAllByText("0");
    //expect(state[0]).toBeInTheDocument();

    const button1 = screen.getByTestId('addmodulebutton')
    fireEvent.click(button1)

    const elem = screen.getAllByText('password');
    expect(elem[0]).toBeInTheDocument();
    //const addmodulepage = screen.getByTestId('addmoduleextension')
    //expect(addmodulepage).toHaveTextContent('Course Title:')
  }); */



});



