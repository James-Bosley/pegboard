import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNextId, selectPlayers } from '../players/playersSlice';
import './Register.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('M');
  const [handedness, setHandedness] = useState('R');
  const dispatch = useDispatch()

  const existingPlayers = useSelector(selectPlayers);
  const getIdNo = useSelector(selectNextId);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastName = (event) => {
    setLastName(event.target.value);
  } 

  const handleGender = (event) => {
    setGender(event.target.value);
  }

  const handleHands = (event) => {
    setHandedness(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(firstName && lastName && gender && handedness) {
      if(!existingPlayers[getIdNo]) {
        dispatch({type: 'players/registerPlayer', payload: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          handedness: handedness,
          id: getIdNo,
          wins: 0
        }})
        setFirstName('');
        setLastName('');
        setGender('M');
        setHandedness('R');
        alert(`${firstName} ${lastName} has been registered with player ID ${getIdNo}.`)
      } else {
        alert('Player with this ID already exists.');
      }
    } else {
      alert('Please complete all fields.')
    }
  }

  return (
    <div className='reg-form-container'>
      <form className='reg-form' onSubmit={handleSubmit}>
        <label>Firstname: 
          <input className='names' type='text' value={firstName} onChange={handleFirstName}></input>
        </label>
        <label>Lastname: 
          <input className='names' type='text' value={lastName} onChange={handleLastName}></input>
        </label>
        <label>Gender: 
          <select value={gender} onChange={handleGender}>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select>
        </label>
        <label>Handedness: 
          <select value={handedness} onChange={handleHands}>
            <option value='R'>Right</option>
            <option value='L'>Left</option>
          </select>
        </label>
        <label>Player ID:
          <input type='number' value={getIdNo} disabled='true'></input>
        </label> 
        <button type='submit'>Submit</button>
      </form>
    </div>
  )

}

export default Register;
