/*
Rules:
    Broad = 20 * 20 
    Every time moveSnake(direction) is called, the snake moves up, down, left or right
    The snake’s initial size is 3 and grows by 1 every 5 moves
    The game ends when the snake hits itself,
    isGameOver()
    initailSize = 3, Grows By 1 after every five moves
    
    optional : circular 
      0 1 2 3 4 5 6 7
    0 _ _ _ _ _ _ _ _ _ _
    1 _ _ _ _ _ _ _ _ _ _
    2 S S S _ _ _ S S S S
    3 _ _ _ _ _ _ _ S S S

    newPosition = 20 % 20

    Board --> N= 20
    Snake  --> Array (Body Position[]), Set O(1) --> move(), growBy(Position), ishitItself()
    Position
    Player
    SnakeGame --> moveSnake, isGameOver
    userInterface (no Scope)
    main (driver)

    Cicular 00> next
    
    

*/

const Directions = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN'
}

class Position {
    constructor(r, c) {
        this.r = r;
        this.c = c;
    }

    toString() {
        return "r: "+ this.r + " c: "+ this.c;
    }
}

class Snake {
    constructor(positions) {
      this.bodyParts = positions;
    }

    move(position) {
        this.bodyParts.push(position);
        this.bodyParts.shift();
    }

    growWith(position) {
        this.bodyParts.push(position);
    }

    isHit(position) {
       return false;
    }

    display() {
        console.log(this.bodyParts);
    }

    getHead() {
        return this.bodyParts[this.bodyParts.length - 1];
    }

    getSize() {
        return this.bodyParts.length;
    }
}

// Day 0 
class SnakeGame {
   constructor(snake, board) {
      this.snake = snake;
      this.board = board;
      this.isGameover = false;
      this.snakeMovesCount = 0;
   }
   
   // this would 
   getNewPosition(direction, currSnakePosition) {
    let newPosition = null;
    if(direction == Directions.RIGHT) {
        newPosition= new Position(currSnakePosition.r, currSnakePosition.c + 1 % this.board.length);
    }

    if((newPosition.r < 0 || newPosition.r >= this.board.length) || (newPosition.r < 0 || newPosition.r >= this.board.length)){
        return null;
    }
    return newPosition;
   }

   moveSnake(directions) {
     let newPosition = this.getNewPosition(directions, this.snake.getHead());
     if(newPosition == null) {
        console.log("Board boundaries have been hit !!!");
        this.isGameover = true;
        return;
     }
     if(this.snake.isHit(newPosition)) {
        console.log("Board boundaries have been hit !!!");
        
        this.isGameover = true;
        return;
     }
     if(this.snakeMovesCount == 4) {
        this.snakeMovesCount = 0;
        this.snake.growWith(newPosition);
        console.log("Snake Size have been increased !!!!");
        return ;
     }
     this.snake.move(newPosition);
     this.snakeMovesCount++;
     console.log("Snake have been moved to this position !!!!");
   }

}

    let position1 = new Position(2, 0);
    let position2 = new Position(2, 1);
    let position3 = new Position(2, 2);
    let bodyParts = new Array();
    bodyParts.push(position1);
    bodyParts.push(position2);
    bodyParts.push(position3);
    let snake = new Snake(bodyParts);
    snake.display();

    let game = new SnakeGame(snake, {length: 20}); // 2,0
    game.moveSnake(Directions.RIGHT);
    game.moveSnake(Directions.RIGHT);
    game.moveSnake(Directions.RIGHT);
    game.moveSnake(Directions.RIGHT);
    game.moveSnake(Directions.RIGHT);
    
    snake.display();
    console.log(snake.getSize());
    // verify body parts
    // verify size of snake