import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };



  const element =
    props.element === 'input' ? (
      <input
        className={`${props.className} py-2 px-2 rounded-md`}
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        pattern={props.pattern}
        placeholder={props.placeholder}
        required={props.required}
        name={props.id}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        placeholder={props.placeholder}
        value={inputState.value}
        style={props.style}
        className={`${props.className} py-2 px-2 rounded-md`}
      />
    );

  return (
    <div
      className={`relative flex flex-col justify-between `}
    >
      <label className='font-bold text-bvs-deepGreen mb-1' htmlFor={props.id}>{props.label}</label>

      {element}{inputState.value !== '' && props.children}
      {
        inputState.isTouched && inputState.isValid &&
        <IoIosCheckmarkCircle className='text-2xl text-bvs-darkGreen absolute right-2 bottom-2' />
      }
      {
        inputState.isTouched && !inputState.isValid &&
        <IoCloseCircle className='text-2xl text-bvs-danger absolute right-2 bottom-2' />
      }
    </div >
  );
};

export default Input;
