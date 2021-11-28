import playersReducer, { selectPlayers, selectPlayerQueue, selectNextId } from './playersSlice';

describe('Player Reducer', () => {

  const mockState = {registeredPlayers: {
    1: {id: 1, firstName: 'testPlayer', wins: 0},
    2: {id: 2, firstName: 'testPlayer2', wins: 0}
    },
    nextId: 3,
    playerQueue: []
    };
      
  it('Loads a list of registered players on first render.', () => {
    const loadPlayers = {type: 'players/load'};

    const newState = playersReducer(undefined, loadPlayers);

    expect(newState.registeredPlayers).not.toBe({});
  });

  it('Adds a player to {registeredPlayers} when passed registeredPlayers.', () => {
    const newPlayer = {type: 'players/registerPlayer', payload: {id: 3, firstName: 'exists'}}

    const newState = playersReducer(mockState, newPlayer);

    expect(newState.registeredPlayers[3]).toBeDefined();
  });

  it('Should increment nextId by 1 when registering new player.', () => {
    const newPlayer = {type: 'players/registerPlayer', payload: {id: 3, firstName: 'exists'}}
    
    const newState = playersReducer(mockState, newPlayer);

    expect(newState.nextId).toBe(4);
  });

  it('Should remove a player object when unregisterPlayer.', () => {
    const removePlayer = {type: 'players/unregisterPlayer', payload: 2}

    const newState = playersReducer(mockState, removePlayer);

    expect(newState.registeredPlayers[2]).toBeUndefined();
  });

  it('Should add player id from a given array to [playerQueue].', () => {
    const enqueuePlayers = {type: 'players/enqueue', payload: [1, 2]};

    const newState = playersReducer(mockState, enqueuePlayers);

    expect(newState.playerQueue).toStrictEqual([1, 2]);
  });

  it('Should only add a player from {registeredPlayers} to [playerQueue].', () => {
    const enqueuePlayers = {type: 'players/enqueue', payload: [3]};
    const jsdomAlert = window.alert;
    window.alert = () => {}

    const newState = playersReducer(mockState, enqueuePlayers);
    
    expect(newState.playerQueue).toStrictEqual([]);
    window.alert = jsdomAlert;
  })

  it('Should remove a given array of players from [playerQueue].', () => {
    const enqueuePlayers = {type: 'players/enqueue', payload: [1, 2]};
    const dequeuePlayers = {type: 'players/dequeue', payload: [1]};

    const midState = playersReducer(mockState, enqueuePlayers);
    const newState = playersReducer(midState, dequeuePlayers);

    expect(newState.playerQueue.length).toBe(1);
  });

  it('Should add 1 to {registeredPlayers[x].wins} from given array.', () => {
    const winningPlayer = {type: 'players/incrementWins', payload: [2]};

    const newState = playersReducer(mockState, winningPlayer);

    expect(newState.registeredPlayers[2].wins).toBe(1);
  });

});

describe('Selectors.', () => {

  const mockState = {players: {
    registeredPlayers: {
    1: {id: 1, firstName: 'testPlayer', wins: 0},
    2: {id: 2, firstName: 'testPlayer2', wins: 0}
    },
    nextId: 3,
    playerQueue: [1, 2]
  }};

  it('selectPlayers should return {registeredPlayers}.', () => {
    const returnData = selectPlayers(mockState);

    expect(returnData).toBe(mockState.players.registeredPlayers);
  });

  it('selectPlayerQueue should return [playerQueue].', () => {
    const returnData = selectPlayerQueue(mockState);

    expect(returnData).toBe(mockState.players.playerQueue);
  });

  it('selectNextId should return nextId.', () => {
    const returnData = selectNextId(mockState);

    expect(returnData).toBe(3);
  });

});
