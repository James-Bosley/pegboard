import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGamesWaiting, selectOnCourt } from "./gamesSlice";
import { selectPlayers } from "../players/playersSlice";
import './Games.css';

function GamesWaiting() {
  const games = useSelector(selectGamesWaiting);
  const gamesOn = useSelector(selectOnCourt);
  const presentPlayers = useSelector(selectPlayers);
  const dispatch = useDispatch();
  const [pairOne, setPairOne] = useState();
  const [pairTwo, setPairTwo] = useState();

  const handleChangeOne = (event) => {
    setPairOne(event.target.value)
  }

  const handleChangeTwo = (event) => {
    setPairTwo(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    const gameToSubmit = gamesOn.find(game => {
      return game.id === event.target[2].value;
    })
    console.log({...gameToSubmit, score: [pairOne, pairTwo]})
    if(pairOne > pairTwo) {
      dispatch({type: 'players/incrementWins', payload: gameToSubmit.players.slice(0,2)});
      dispatch({type: 'players/enqueue', payload: gameToSubmit.players.slice(0,2)});
      dispatch({type: 'players/enqueue', payload: gameToSubmit.players.slice(2,4)});
    } else {
      dispatch({type: 'players/incrementWins', payload: gameToSubmit.players.slice(2,4)});
      dispatch({type: 'players/enqueue', payload: gameToSubmit.players.slice(2,4)});
      dispatch({type: 'players/enqueue', payload: gameToSubmit.players.slice(0,2)});
    }
    dispatch({type: 'games/gameOver', payload: {...gameToSubmit, score: [pairOne, pairTwo]}});
    dispatch({type: 'games/gameOn'});
    setPairOne();
    setPairTwo();
  }

  if(games.length > 0 || gamesOn.length > 0) {
    return (
        <div className='games-section'>
          <div className='games-waiting'>
            <h3>Games Waiting</h3>
            {games.map(game => {
              return (
                <div className='game-box'>
                  <h4>{presentPlayers[game.players[0]].firstName} {presentPlayers[game.players[0]].lastName} & {presentPlayers[game.players[1]].firstName} {presentPlayers[game.players[1]].lastName}</h4>
                  <h5>vs.</h5>
                  <h4>{presentPlayers[game.players[2]].firstName} {presentPlayers[game.players[2]].lastName} & {presentPlayers[game.players[3]].firstName} {presentPlayers[game.players[3]].lastName}</h4>
                </div>  
              )
            })}
          </div>
          <div className='games-on'>
            <h3>On Court</h3>
            {gamesOn.map(game => {
              return (
                <div className='game-box'>
                  <h4>{presentPlayers[game.players[0]].firstName} {presentPlayers[game.players[0]].lastName} & {presentPlayers[game.players[1]].firstName} {presentPlayers[game.players[1]].lastName}</h4>
                  <h5>vs.</h5>
                  <h4>{presentPlayers[game.players[2]].firstName} {presentPlayers[game.players[2]].lastName} & {presentPlayers[game.players[3]].firstName} {presentPlayers[game.players[3]].lastName}</h4>
                  <form className='score-form' onSubmit={onSubmit}>
                    <label>Score: </label>
                    <input type='number' max='21' value={pairOne} onChange={handleChangeOne} placeholder='Pair 1'></input>
                    <label>- </label>
                    <input type='number' max='21' value={pairTwo} onChange={handleChangeTwo} placeholder='Pair 2'></input>
                    <button type='submit' value={game.id}>Submit</button>
                  </form>
                </div>  
              )
            })}
          </div>
        </div>
    )
  } else {
    return null;
  }
}

export default GamesWaiting;