import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayerQueue, selectPlayers } from './playersSlice';
import { v4 as uuidv4 } from 'uuid';
import './Players.css';

function PlayersWaiting() {
  const players = useSelector(selectPlayerQueue);
  const presentPlayers = useSelector(selectPlayers)
  const firstPlayer = players[0];
  const eligiblePlayers = players.slice(1, 9);
  const dispatch = useDispatch()
  const [playersForGame, setPlayersForGame] = useState([]);

  const style = (gender) => {
    if(gender === 'M') {
      return {backgroundColor: 'lightblue'};
    } else {
      return {backgroundColor: 'pink'};
    }
  }

  const buttonElement = (player) => {
    if(playersForGame[0] === player || playersForGame[1] === player) {
      return (
        <div>
          <h5>Selected - Pair 1</h5>
          <button value={player} onClick={handleClickRemove}>Remove from Game</button>
        </div>
      );
    } else if(playersForGame[2] === player || playersForGame[3] === player) {
      return (
        <div>
          <h5>Selected - Pair 2</h5>
          <button value={player} onClick={handleClickRemove}>Remove from Game</button>
        </div>
      );
    } else {
      return <button value={player} onClick={handleClickAdd}>Add to Game</button>;
    }
  }

  const handleSubmit = () => {
    if(playersForGame.length === 4) {
      console.log(playersForGame)
      dispatch({type: 'games/addGame', payload: {id: uuidv4(), players: playersForGame}});
      dispatch({type: 'players/dequeue', payload: playersForGame});
      dispatch({type: 'games/gameOn'});
      setPlayersForGame([])
    }
  }

  const handleClickAdd = (event) => {
    if(playersForGame.length < 4) {
      if(!playersForGame.includes(event.target.value)) {
        setPlayersForGame(prev => [...prev, event.target.value]);
      } else {
        alert('Player already selected.');
      }
    } else {
      alert('Too many players selected.');
    }
  }

  const handleClickRemove = (event) => {
    setPlayersForGame(state => state.filter(player => {
      return event.target.value !== player;
    }))
  }

  if(players.length > 0) {
    return (
      <div className='waiting-players'>
        <div className='selecting-player'>
          {!firstPlayer ? null :
            <div className='name-button' key={firstPlayer} style={style(presentPlayers[firstPlayer].gender)}>
              <h3>{presentPlayers[firstPlayer].firstName}</h3>
              <h3>{presentPlayers[firstPlayer].lastName}</h3> 
              <h5>Game Wins: {presentPlayers[firstPlayer].wins}</h5>
              {buttonElement(firstPlayer)}
            </div>
          }
        </div>
        <div className='eligible-players'>
          {!eligiblePlayers.length ? <p>Log in above to join the queue.</p> :
            eligiblePlayers.map(player => {
              return (
                <div className='name-button sel' key={player} style={style(presentPlayers[player].gender)}>
                  <h3>{presentPlayers[player].firstName}</h3>
                  <h3>{presentPlayers[player].lastName}</h3>
                  <h5>Game Wins: {presentPlayers[player].wins}</h5>
                  {buttonElement(player)}
                </div> 
          )})}
        </div>
        <button id='submit-game' onClick={handleSubmit}>Submit Game</button>
      </div>
    )
  } else {
    return <h3>Add Players to Begin...</h3>
  }
}

export default PlayersWaiting;