// Board = N * N
// Players
// Game
// GameLoop
import { questionInt } from "readline-sync";
const DEFAULT_BOARD_SIZE = 3;
const RESERVED_BOARD_CHAR = '_';

class Player {
  constructor(name, character) {
    if(character == RESERVED_BOARD_CHAR) {
      throw new Error("This Character is reserved!!!. Cannot Create Player with this characgter")
    }
    this.name = name;
    this.character = character;
  }

  getCharacter() {
    return this.character;
  }
}

class Board {
  constructor(boardSize = DEFAULT_BOARD_SIZE, defaultboardChar = RESERVED_BOARD_CHAR) {
     this.boardSize = boardSize;
     this.initBoard(boardSize, defaultboardChar);
  }

  initBoard(boardSize, defaultboardChar) {
    this.board = new Array(boardSize);
    for(let r = 0 ; r < boardSize; r++) {
       this.board[r] = new Array(boardSize).fill(defaultboardChar);
    }
  }

  getRowElements(rowNumber) {
    return this.board[rowNumber];
  }

  getColumnElements(col) {
    let colElements = [];
    for(let r = 0; r < this.boardSize ; r++) {
      colElements.push(this.board[r][col]);
    }
    return colElements;
  }

  getBothDiagonalsElements() {
    let diagonal1 = [];
    for(let i = 0; i < this.boardSize; i++) {
      diagonal1.push(this.board[i][i]);
    }
    let diagonal2 = [];
    for(let i = 0; i < this.boardSize; i++) {
      diagonal2.push(this.board[this.boardSize - 1 - i][i]);
    }
    return[diagonal1, diagonal2];
  }
  
  mark(row, col, character) {
    if(row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
      return false;
    }
    if(this.board[row][col] === RESERVED_BOARD_CHAR) {
      this.board[row][col] = character;
      return true;
    }
    return false;
  }

  // TODO
  // this has to be moved from this class
  print() {
    for(let r = 0 ; r < this.boardSize; r++) {
      console.log();
      let rwoString = ""
      for(let c = 0; c < this.boardSize; c++) {
        rwoString = rwoString + " " + this.board[r][c];
      }
      console.log(rwoString);
    }
  }
}

class Game {
  constructor(board, userInputInterface) {
    this.board = board;
    this.players = [];
    this.state = "NOT_STARTED";
    this.maxTurns = this.board.boardSize * this.board.boardSize;
    this.turnCount = 0;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  checkWinner(player) {
    let desiredState = new Array(3).fill(player.character).join();
    // check for rows
    for(let i = 0 ; i < 3; i++) {
      let rowString = this.board.getRowElements(i).join();
      if(rowString === desiredState) {
        return true;
      }
    }

    // check for cols
    for(let i = 0 ; i < 3; i++) {
      let colString = this.board.getColumnElements(i).join();
      if(colString === desiredState) {
        return true;
      }
    }

    // check for diagonals
    let diagonals = this.board.getBothDiagonalsElements();
    for(let i = 0; i < diagonals.length; i++) {
      let diagnoalString = diagonals[i].join();
      if(diagnoalString === desiredState) {
        return true;
      }
    }
    return false;
  }

  start() {
    this.state = "RUNNING";
    console.log("Game Started Running!!!");
    while(true) {
       this.board.print();
       let currentPlayer = this.players[0];
       console.log("Please enter the below questions " + currentPlayer.name);
       const row = questionInt('Row: ');
       const col = questionInt('Col: ');
       if(!this.board.mark(row, col, currentPlayer.getCharacter())) {
            console.log("Please try Again !!! " + currentPlayer.name)
            continue;
       }
       if(this.checkWinner(currentPlayer)) {
          console.log("Winner: "+ currentPlayer.name)
          this.state = "END"
          break;
       }
       if(this.turnCount === this.maxTurns) {
          console.log("GAME is DRAW!!!!!")
          break;
       }
       this.players.push(this.players.shift());
       this.turnCount++;
      }
  }
}

// driver.js or game loop

let board = new Board();
let player1 = new Player("Gheri", "X");
let player2 = new Player("Dinesh", "O");
let ttGame = new Game(board);
ttGame.addPlayer(player1);
ttGame.addPlayer(player2);
ttGame.start();