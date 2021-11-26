import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Register from "../register/Register";
import './Nav.css';

function NavBar() {
  const [uidIn, setUidIn] = useState()
  const [uidOut, setUidOut] = useState()
  const [toggleReg, setToggleReg] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'players/load'})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleToggle = (event) => {
    event.preventDefault()
    setToggleReg(state => !state);
  }

  return (
    <div className='nav-container'>
      <nav>
        <h1>PegBoard</h1>
        <form onSubmit={e => handleSubmitIn(e)}>
          <label>Add player by ID: </label>
          <input type='number' maxLength='4' name='uidi' value={uidIn} placeholder='####' onChange={handleChangeIn}></input>
          <button type='submit'>Add</button>
        </form>
        <form onSubmit={e => handleSubmitOut(e)}>
          <label>Remove player by ID: </label>
          <input type='number' maxLength='4' name='uido' value={uidOut} placeholder='####' onChange={handleChangeOut}></input>
          <button type='submit'>Remove</button>
        </form>
        <form>
          <label>Register new player: </label>
          <button onClick={handleToggle}>{toggleReg ? 'Hide Form' : 'Show Form'}</button>
        </form>
      </nav>
      {toggleReg ? <Register /> : null}
    </div>
  )
}

export default NavBar;
