import React from "react";
import { useSelector } from "react-redux";
import { selectGamesWaiting, selectOnCourt } from "./gamesSlice";
import './Games.css';

function GamesWaiting() {
  const games = useSelector(selectGamesWaiting);
  const gamesOn = useSelector(selectOnCourt);

  return (
    <div>
      <div className='games-section'>
        <div className='games-waiting'>
          <h3>Games Waiting</h3>
          {games.map(game => {
            return (
              <div className='game-box'>
                <h4>{game.players[0].firstName} {game.players[0].lastName} & {game.players[2].firstName} {game.players[2].lastName}</h4>
                <h5>vs.</h5>
                <h4>{game.players[1].firstName} {game.players[1].lastName} & {game.players[3].firstName} {game.players[3].lastName}</h4>
              </div>  
            )
          })}
        </div>
        <div className='games-on'>
          <h3>On Court</h3>
          {gamesOn.map(game => {
            return (
              <div className='game-box'>
                <h4>{game.players[0].firstName} {game.players[0].lastName} & {game.players[2].firstName} {game.players[2].lastName}</h4>
                <h5>vs.</h5>
                <h4>{game.players[1].firstName} {game.players[1].lastName} & {game.players[3].firstName} {game.players[3].lastName}</h4>
              </div>  
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GamesWaiting;