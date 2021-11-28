import gamesReducer, { selectGamesWaiting, selectOnCourt } from './gamesSlice';


describe('Games Reducer', () => {

  it('Should return default state with invalid actions.', () => {
    const invalidAction = {type: 'INVALID'}
    
    const newState = gamesReducer(undefined, invalidAction);

    expect(newState).toStrictEqual({completed: [], onCourt: [], waiting: []});
  });

  it('Should add a game to [waiting] when passed game object in addGame.', () => {
    const gameObject = {type: 'games/addGame', payload: {id: 'fake id', players: [1,2,3,4]}};

    const newState = gamesReducer(undefined, gameObject);

    expect(newState.waiting[0]).toBe(gameObject.payload);
  });

  it('Should move a game from [waiting] to [onCourt] when gameOn.', () => {
    const startState = {waiting: [{id: 'testGame'}], onCourt: [], completed: []};
    const gameOn = {type: 'games/gameOn'};
    const endState = {waiting: [], onCourt: [{id: 'testGame'}], completed: []};

    const newState = gamesReducer(startState, gameOn);

    expect(newState).toStrictEqual(endState);
  });

  it('Should not move a game when onCourt.length = numberOfCourts when gameOn.', () => {
    const startState = {waiting: [{id: 'testGame'}], onCourt: ['max','cap','reached'], completed: []};
    const gameOn = {type: 'games/gameOn'};
    
    const newState = gamesReducer(startState, gameOn);
    expect(newState).toStrictEqual(startState);
  })

  it('Should move a game from [onCourt] to [completed] when gameOver', () => {
    const startState = {waiting: [], onCourt: [{id:'testGame'}], completed: []};
    const gameOver = {type: 'games/gameOver', payload: {id:'testGame'}};
    const endState = {waiting: [], onCourt: [], completed: [{id:'testGame'}]};

    const newState = gamesReducer(startState, gameOver);

    expect(newState).toStrictEqual(endState);
  })

});

describe('Selectors', () => {

  const mockState = {games: {waiting: [{id: 'waiting'}], 
    onCourt: [{id: 'onCourt'}], 
    completed: [{id:'completed'}]
  }};

  it('selectGamesWaiting should return [waiting].', () => {
    const returnData = selectGamesWaiting(mockState);

    expect(returnData).toBe(mockState.games.waiting);
  });

  it('selectOnCourt should return [onCourt].', () => {
    const returnData = selectOnCourt(mockState);

    expect(returnData).toBe(mockState.games.onCourt);
  });

});
