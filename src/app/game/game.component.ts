import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate(500)
      ])
    ])
  ]
})
export class GameComponent {

  board: (string | null)[];
  currentPlayer: 'X' | 'O' = 'X';
  winner: string | null;

  constructor(){
this.newGame();
  }

  newGame(){
    this.board =  Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner= '';
  }

  makeMove(idx:number){
if(!this.board[idx] && !this.winner){
  this.board[idx] = this.currentPlayer;
  if(this.checkWinner()){
    this.winner = this.currentPlayer
  } else{
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }
}
  }

  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      }
    }

    return false;
  }
  isDraw(): boolean {
    return this.board.every(cell => cell !== null);
  }
}
