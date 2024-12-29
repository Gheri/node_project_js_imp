import { LinkedHashSet } from "./datastructures/lhs.js";
const Directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

class SnakeGame {
  constructor(height, width, foods) {
    this.board = this.createBoard(height, width);
    this.snake = new LinkedHashSet();
    this.snake.addFromFront(new Pair(0,0))
    this.foods = this.createFoodSet(foods);
  }

  createFoodSet(foods) {
    let set = new Array();
    for(let i = 0; i < foods.length; i++) {
      set.push(foods[i]);
    }
    return set;
  }

  createBoard(height, width) {
    let board = [];
    for(let i = 0; i < height; i++) {
      board.push(new Array(width));
    }
    return board;
  }

  getPairFor(pair, direction) {
    if(direction === Directions.UP) {
       return new Pair(pair.x - 1, pair.y);
    }
    if(direction === Directions.DOWN) {
      return new Pair(pair.x + 1, pair.y);
    }
    if(direction === Directions.LEFT) {
      return new Pair(pair.x, pair.y - 1);
    }
    if(direction === Directions.RIGHT) {
      return new Pair(pair.x, pair.y + 1);
    }
  }

  isValidMove(pair) {
    if(pair.x <0 || pair.y < 0 || pair.y > this.height || pair.x > this.width) {
      return false;
    }
    if(this.snake.has(pair)) {
      return false;
    }
  }

  move(direction) {
   let newPair = this.getPairFor(this.snake.getHead(), direction);
   if(this.isValidMove(newPair) === false) {
      console.log("not Valid Move. Exit !!!!");
      return -1;
   }
   if(this.foods[0].toString() == newPair.toString()) {
     this.snake.addFromFront(this.foods[0]);
     this.foods.shift();
     return this.snake.getSize() - 1;
   } else {
     this.snake.addFromFront(newPair);
     this.snake.removeFromRear();
     return this.snake.getSize() - 1;
   }
  }
}


class Pair {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  // thi is created just to ensure the hashmap keys
  toString() {
    return "x:" + this.x + " y:" + this.y;
  }
}

let game = new SnakeGame(2,3, [new Pair(1,2), new Pair(0,1)]);
/*
E F E
E E F
*/
console.log(game.move(Directions.RIGHT));
console.log(game.move(Directions.RIGHT));
console.log(game.move(Directions.DOWN));
console.log(game.move(Directions.LEFT));
console.log(game.move(Directions.UP));
console.log(game.move(Directions.UP));

// Go through design patterns

// go through those papers


