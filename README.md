## PegBoard

This project was created as a portfolio project for [Codecademy's](https://www.codecademy.com/) front end engineer career path. It has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

### Project Objective

To digitize the process of badminton game selection. 

### Problem

The current process of choosing games next up involves the use of wooden ‘pegs’ on a board mounted to a wll. The key drawback of this classical implementation, which this project aims to resolve, is that players have to be present at the board to know where they are in the queue and take actions, such as choosing a game. It also lacks the capacity to store data about games and player performance, which could be useful in managing the club.

### App Implementation

This app mangages players across states, and can be viewed remotely from the courts. It also has the capacity to store game data, and as a starting point will display the number of wins a player has earned so far.  

The possible player states managed by the app are:
* Registered to play, but not present in the queue.
* Waiting in queue above position 9 - ineligible for selection to play. 
* Waiting in queue between position 2 and 9 - eligible for selection. 
* Waiting in position 1 - player to pick game next game from following 8 players. 
* Game waiting – a group of 4 players awaiting available court space.  
* On court. 

Players move between states as they:
* Register thier details.
* Sign in to play.
  * A joining player should always join the back of the queue.
* Get chosen to play.
  * Game pairing is determined by the order of selection.
* Complete their game.
  * On completion of a game, the winners are added to the back of the queue ahead of their competition. 
* Sign out of play.

### Future Development

Further features proposed to enhance the app:
* Ability for players to find their position in the queue above position 9.
* Transition of game from waiting to on court to be highlighted in order to alert players.
* Ability to select singles games of 2 players when the length of the queue falls below a determined threshold.
* A backend, to store organised player and game data for future use.
* Introduce user accounts for players to view/change their details, and administrator accounts to manage the app at a higher level.
* Reports and analytics to present decision making insights to players and team captains.


### Using the App

In the project directory, to launch the development build of the project, you can run:

#### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
