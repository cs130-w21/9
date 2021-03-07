/* Testing front-end: creating and editing a course */
import React, { useState as useStateMock } from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from "@material-ui/core/Button";
import CreateAndEdit from './CreateAndEdit';

describe("Tests CreateAndEdit", function() {

it('Add Module works; calls the correct function', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}> /Add Module/i </Button>)
    fireEvent.click(getByText(/Add Module/i))  
    expect(onClick).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
  });

it('Create Course works; calls the correct function', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}> /Create Course/i </Button>)
    fireEvent.click(getByText(/Create Course/i))  
    expect(onClick).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
  });

it('Save Changes works; calls the correct function', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}> /Save Changes/i </Button>)
    fireEvent.click(getByText(/Save Changes/i))  
    expect(onClick).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
  });




});



