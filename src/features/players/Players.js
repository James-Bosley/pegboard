import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayerQueue } from './playersSlice';
import { v4 as uuidv4 } from 'uuid';
import './Players.css';

function PlayersWaiting() {
  const players = useSelector(selectPlayerQueue);
  const firstPlayer = players[0];
  const eligiblePlayers = players.slice(1, 9);
  const dispatch = (useDispatch())
  const [playersForGame, setPlayersForGame] = useState([firstPlayer]);

  const style = (gender) => {
    if(gender === 'M') {
      return {backgroundColor: 'lightblue'};
    } else {
      return {backgroundColor: 'pink'};
    }
  }

  const checkSubmit = () => {
    if(playersForGame.length === 4) {
      dispatch({type: 'games/addGame', payload: {id: uuidv4(), players: playersForGame}});
      dispatch({type: 'players/dequeue', payload: playersForGame})
      dispatch({type: 'games/gameOn'});
      setPlayersForGame([firstPlayer])
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    console.log('HERE')
    const playerSelected = players.find(player => {
      return player.id === Number(event.target.value);
    });
    console.log(playerSelected)
    setPlayersForGame(prev => [...prev, playerSelected]);
    checkSubmit()
  }

  return (
    <div className='waiting-players'>
      <div className='selecting-player'>
        {!firstPlayer ? null :
          <button className='name-button' key={firstPlayer.id} style={style(firstPlayer.gender)}>
            <h3>{firstPlayer.firstName}</h3>
            <h3>{firstPlayer.lastName}</h3> 
            <p>({firstPlayer.handedness})</p>
            <h5>Wins Today: {firstPlayer.wins}</h5>
          </button>
        }
      </div>
      <div className='eligible-players'>
        {eligiblePlayers.map(player => {
          return (
            <button className='name-button sel' key={player.id} value={player.id} onClick={handleClick} style={style(player.gender)}>
              <h3>{player.firstName}</h3>
              <h3>{player.lastName}</h3>
              <p>({player.handedness})</p>
              <h5>Wins Today: {player.wins}</h5> 
            </button> 
        )})}
      </div>
    </div>
  )
}

export default PlayersWaiting;