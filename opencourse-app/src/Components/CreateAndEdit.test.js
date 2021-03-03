/* Testing front-end: creating and editing a course */
import React, { useState as useStateMock } from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from "@material-ui/core/Button";
import CreateAndEdit from './CreateAndEdit';

/*
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
*/

describe("Tests CreateAndEdit", function() {
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
});


/*
    const onClick = jest.fn()
    const { getByText } = render(<Button
            style={{
              margin: 20,
              // background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "#2196F3",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
            }}
            onClick={onClick}
            variant="outlined"
            color="primary"
            data-testid="addmodulebutton"
          >
            Add Module
          </Button>)
    //const iris = screen.getAllByText("Add Module");
    wrapper.find('Button').props().onClick() 
    //fireEvent.click(iris[0])
    expect(onClick).toHaveBeenCalled()
    // screen.debug()
  }); 

*/




  /* TRY THIS NEXT:
  import { shallow } from "enzyme";
import * as React from "react";
import Button from "../button.component";

describe("Button Component Tests", () => {
    it("Renders correctly in DOM", () => {
        shallow(
            <Button text="Test" />
        );
    });
    it("Expects to find button HTML element in the DOM", () => {
        const wrapper = shallow(<Button text="test"/>)
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it("Expects to find button HTML element with className test in the DOM", () => {
        const wrapper = shallow(<Button className="test" text="test"/>)
        expect(wrapper.find('button.test')).toHaveLength(1);
    });

    it("Expects to run onClick function when button is pressed in the DOM", () => {
        const mockCallBackClick = jest.fn();
        const wrapper = shallow(<Button onClick={mockCallBackClick} className="test" text="test"/>);
        wrapper.find('button').simulate('click');
        expect(mockCallBackClick.mock.calls.length).toEqual(1);
    });
});

*/



  /*
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

*/

/*
  it('Tests adding a new module', () => {
    render(<CreateAndEdit />)

    const button1 = screen.getByTestId('addmodulebutton')
    fireEvent.click(button1)

    const elem = screen.getAllByText('password');
    expect(elem[0]).toBeInTheDocument();
    //const addmodulepage = screen.getByTestId('addmoduleextension')
    //expect(addmodulepage).toHaveTextContent('Course Title:')
  }); */



});



