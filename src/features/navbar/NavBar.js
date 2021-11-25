import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './Nav.css'

function NavBar() {
  const [uidIn, setUidIn] = useState()
  const [uidOut, setUidOut] = useState()

  const dispatch = useDispatch();

  const handleChangeIn = (event) => {
    setUidIn(event.target.value);
  }

  const handleChangeOut = (event) => {
    setUidOut(event.target.value);
  }

  const handleSubmitIn = (event) => {
    event.preventDefault()
    dispatch({type: 'players/enqueue', payload: [uidIn]});
    setUidIn('');
  }

  const handleSubmitOut = (event) => {
    event.preventDefault()
    dispatch({type: 'players/dequeue', payload: [uidOut]});
    setUidOut('');
  }

  return (
    <div className='nav-container'>
      <nav>
        <h1>PegBoard</h1>
        <form onSubmit={e => handleSubmitIn(e)}>
          <label for='uidi'>Login using your player ID: </label>
          <input type='number' maxLength='4' name='uidi' value={uidIn} placeholder='####' onChange={handleChangeIn}></input>
          <button type='submit'>Login</button>
        </form>
        <form onSubmit={e => handleSubmitOut(e)}>
          <label for='uido'>Logout using your player ID: </label>
          <input type='number' maxLength='4' name='uido' value={uidOut} placeholder='####' onChange={handleChangeOut}></input>
          <button type='submit'>Logout</button>
        </form>
      </nav>
    </div>
  )
}

export default NavBar;
