// board
// game
// snake
// player

import { LinkedHashSet } from "./linkedhash.js";

// inputInterface
class Pair {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return JSON.stringify({x: this.x, y: this.y})
  }
}
class Player {
  constructor (id, name) {
    this.id = id;
    this.name = name;
  }
}
class Board {
  constructor(width, heigth) {
    this.width = width;
    this.heigth = heigth;
  }

  isAllowed(newPosition) {
    if(newPosition.x < 0 || newPosition.x >= this.width || newPosition.y < 0 || newPosition.y >= this.heigth) {
      return false;
    }
    return true;
  }
}

class Snake {
  constructor(intialPosition) {
    this.body = new LinkedHashSet();
    this.body.addToFront(intialPosition);
  }

  moveTo(position) {
    this.body.addToFront(position);
    this.body.removeFromRear();
  }

  addToBody(position) {
    this.body.addToFront(position);
  }

  getHead() {
    return this.body.getLast();
  }

  isAllowed(newPosition) {
    return !this.body.contains(newPosition);
  }
}

const Directions = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};

class SnakeGame {
  constructor(board, snake, inputInterface) {
   this.board = board;
   this.snake = snake;
   this.inputInterface = inputInterface;
   // TODO this can be moved to some food manager
   // can be part of braod class and
   // board with different items called food, icecream
   // simce we dont have time
   this.foods = new LinkedHashSet();
   this.foods.addToFront(new Pair(0,2));
   this.foods.addToFront(new Pair(1,2));
  }

  addPlayer(player){
    this.player = player;
  }

  getNewPosition(direction, currentPosition) {
    if(direction == Directions.UP) {
      return new Pair(currentPosition.x - 1, currentPosition.y);
    }
    if(direction == Directions.DOWN) {
      return new Pair(currentPosition.x + 1, currentPosition.y);
    }
    if(direction == Directions.LEFT) {
      return new Pair(currentPosition.x, currentPosition.y - 1);
    }
    if(direction == Directions.RIGHT) {
      return new Pair(currentPosition.x , currentPosition.y + 1);
    }
  }

  onUserInput(directions) {
    let newPosition = this.getNewPosition(directions, this.snake.getHead());
    if(!this.board.isAllowed(newPosition)) {
       console.log("Game Over !!!" + this.player.name);
       throw new Error("New position Not Valid for board")
    }
    if(!this.snake.isAllowed(newPosition)) {
      console.log("Game Over !!!" + this.player.name);
      throw new Error("New position Not Valid for Snake")
    }
    if(this.foods.contains(newPosition)) {
      this.snake.addToBody(newPosition);
      console.log("Food Found at " + newPosition.toString());
      console.log("Snake Body Now: " + snake);
    } else {
      this.snake.moveTo(newPosition);
      console.log("Snake Moved to " + newPosition.toString());
      console.log("Snake Body Now: " + snake);
    }
  }
  start() {
    try {
      while(true) {
        // this interface should convert the user input to directions 
        let userInput = this.inputInterface.getInput();
        this.onUserInput(userInput);
        // if move is valid
        // if it contains food then increase size
        // else move
      }
    } catch {
      console.log("Game over !!!");
    }
  }
}

// this is driver class

let snake = new Snake(new Pair(0,1));
let board = new Board(2,3);
let inputInterface = null;

let snakeGame = new SnakeGame(board, snake, null);
snakeGame.addPlayer(new Player(1, "Gheri"));
// snakeGame.start();
/*
E S F
E E F
*/

snakeGame.onUserInput(Directions.RIGHT);
snakeGame.onUserInput(Directions.DOWN);
snakeGame.onUserInput(Directions.DOWN);
