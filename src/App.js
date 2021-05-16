import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Pawn, Knight, Bishop, Rook, Queen, King, NoPiece} from './pieces';

class Square extends React.Component {

  renderPiece(pieceObj){
    console.log("renderPiece");

    const color = pieceObj.color;
    const pieceName = pieceObj.piece;
    //does no piece need the board?
    const pieceMap = 
      new Map([
        ['P', <Pawn board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['N', <Knight board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['B', <Bishop board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['R', <Rook board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['Q', <Queen board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['K', <King board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>],
        ['', <NoPiece color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>]
      ]);

    return (
      pieceMap.get(pieceName)
    );
  }
  
  render() {
    
    return (
      <div className={this.props.color+"-square square"} id={this.props.coordinate}>
        {this.renderPiece(this.props.piece)}
      </div>
    );
  }
}

class Board extends React.Component {

  renderSquare(coordinate, piece, bool) {
    console.log("renderSqaure()");
    
    return (
      <Square 
        key={coordinate} 
        color={(bool) ? "light": "dark"}
        coordinate={coordinate} 
        piece={piece}
        board={this.props.board}
        onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)}/>
    );
  }

  render() {
    const renderBoard = () => {
      const board = this.props.board;
      let bool = false;
      let squares = [];
      let i = 0;

      for(const entry of board) {
        if(entry[0].substring(0, 1) === "a") bool = !bool;
        squares[i] = this.renderSquare(entry[0], entry[1], bool);
        bool = !bool;
        i++;
      }

      return squares;
    }

    const ranks = (squares) => {
      let ranks = [];
      let rank = 8;
      let start = 0;
      let end = 8;
      let i = 0;

      while(rank > 0) {
        ranks[i] = <div className={"rank-"+rank}>{squares.slice(start, end)}</div>;
        start = end;
        end+=8;
        rank--;
        i++;
      }
      
      return ranks;
    }

    return(
      <div id="board">{ranks(renderBoard())}</div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        history: [
          {
            board: new Map([
              ['a8', {piece: 'R', color: 'black'}], ['b8', {piece: 'N', color: 'black'}], ['c8', {piece: 'B', color: 'black'}], 
                ['d8', {piece: 'Q', color: 'black'}], ['e8', {piece: 'K', color: 'black'}], ['f8', {piece: 'B', color: 'black'}], 
                ['g8', {piece: 'N', color: 'black'}], ['h8', {piece: 'R', color: 'black'}],
              ['a7', {piece: 'P', color: 'black'}], ['b7', {piece: 'P', color: 'black'}], ['c7', {piece: 'P', color: 'black'}], 
                ['d7', {piece: 'P', color: 'black'}], ['e7', {piece: 'P', color: 'black'}], ['f7', {piece: 'P', color: 'black'}], 
                ['g7', {piece: 'P', color: 'black'}], ['h7', {piece: 'P', color: 'black'}],
              ['a6', {piece: '', color: ''}], ['b6', {piece: '', color: ''}], ['c6', {piece: '', color: ''}], ['d6',{piece: '', color: ''}], 
                ['e6', {piece: '', color: ''}], ['f6', {piece: '', color: ''}], ['g6', {piece: '', color: ''}], ['h6', {piece: '', color: ''}],
              ['a5', {piece: '', color: ''}], ['b5', {piece: '', color: ''}], ['c5', {piece: '', color: ''}], ['d5',{piece: '', color: ''}], 
                ['e5', {piece: '', color: ''}], ['f5', {piece: '', color: ''}], ['g5', {piece: '', color: ''}], ['h5', {piece: '', color: ''}],
              ['a4', {piece: '', color: ''}], ['b4', {piece: '', color: ''}], ['c4', {piece: '', color: ''}], ['d4', {piece: '', color: ''}], 
                ['e4', {piece: '', color: ''}], ['f4', {piece: '', color: ''}], ['g4', {piece: '', color: ''}], ['h4', {piece: '', color: ''}],
              ['a3', {piece: '', color: ''}], ['b3', {piece: '', color: ''}], ['c3', {piece: '', color: ''}], ['d3',{piece: '', color: ''}], 
                ['e3', {piece: '', color: ''}], ['f3', {piece: '', color: ''}], ['g3', {piece: '', color: ''}], ['h3', {piece: '', color: ''}],
              ['a2', {piece: 'P', color: 'white'}], ['b2', {piece: 'P', color: 'white'}], ['c2', {piece: 'P', color: 'white'}], 
                ['d2', {piece: 'P', color: 'white'}], ['e2', {piece: 'P', color: 'white'}], ['f2', {piece: 'P', color: 'white'}], 
                ['g2', {piece: 'P', color: 'white'}], ['h2', {piece: 'P', color: 'white'}],
              ['a1', {piece: 'R', color: 'white'}], ['b1', {piece: 'N', color: 'white'}], ['c1', {piece: 'B', color: 'white'}], 
                ['d1', {piece: 'Q', color: 'white'}], ['e1', {piece: 'K', color: 'white'}], ['f1', {piece: 'B', color: 'white'}], 
                ['g1', {piece: 'N', color: 'white'}], ['h1', {piece: 'R', color: 'white'}]
            ])
          }
        ],
        player: {color: '', result: '', isMyTurn: false},
        selectedPiece: null,
        moves: [],
        pieces: []
      }
  }

  startGame() {

  }

  calculateLegalMoves() {

  }

  isLegalMove(coordinate) {
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;
    const playerColor = this.state.player.color;

    const askingDestination = boardMap.get(coordinate);

    if(askingDestination.color === playerColor) {

    }

    return false;
  }

  handleClick(coordinate, pieceObj) {
    console.log("handleClick()");
    console.log(pieceObj);
    const historyLength = this.state.history.length;
    

    if(!this.state.selectedPiece && !pieceObj) {
      return;
    }

    if(!this.state.selectedPiece && pieceObj.piece) {
      console.log("if");
      this.setState(
        {
          selectedPiece: {coord: coordinate, symbol: pieceObj}
        }
      );

      return;
    }
    console.log(this.state);

    console.log("movePiece()");
    this.movePiece(coordinate);
    

  }

  movePiece(coordinate) {

    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;
    boardMap.set(coordinate, {piece: this.state.selectedPiece.symbol.piece, color: 'white'});
    boardMap.set(this.state.selectedPiece.coord, {piece: '', color: ''});

    this.setState({
      history: history.concat([
        {
          board: boardMap
        }
      ]),
      selectedPiece: null
    });
    console.log(new Rook().calculatePotentialMoves('h8'));

    console.log(boardMap);
  }

  render() {
    const historyLength = this.state.history.length;
    const current = this.state.history[historyLength-1];
   
    console.log(current.board);

    return (
      <Board onClick={(coordinate, piece) => this.handleClick(coordinate, piece)} board={current.board}/>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <Game />
    </div>
  );
}

export default App;
