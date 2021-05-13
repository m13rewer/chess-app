import logo from './logo.svg';
import './App.css';
import React from 'react';

class Pawn extends React.Component {

  calculatePotentialMoves(coordinate) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);
    let potentialMoves = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);

    potentialMoves[0] = files[indexOfFile+1] + rank;
    potentialMoves[1] = files[indexOfFile-1] + rank;
    potentialMoves[2] = file + ranks[indexOfRank+1];
    potentialMoves[3] = file + ranks[indexOfRank+2];
    potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
    
    return potentialMoves;
  }

  handleClick(){
    const potentialMoves = this.calculatePotentialMoves(this.props.coordinate);
    this.props.onClick(this.props.coordinate, 
      {
        piece: 'P', color: this.props.color, potentialMoves: potentialMoves
      });
  }

  render() {
    return (
      <p onClick={()=>this.handleClick()}>P</p>
    );
  }
}

class Knight extends React.Component {
  calculatePotentialMoves(coordinate) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);
    let potentialMoves = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);

    potentialMoves[0] = files[indexOfFile+1] + ranks[indexOfRank+2];
    potentialMoves[1] = files[indexOfFile+1] + ranks[indexOfRank-2];
    potentialMoves[2] = files[indexOfFile-1] + ranks[indexOfRank+2];
    potentialMoves[3] = files[indexOfFile-1] + ranks[indexOfRank-2];
    potentialMoves[4] = files[indexOfFile+2] + ranks[indexOfRank+1];
    potentialMoves[5] = files[indexOfFile+2] + ranks[indexOfRank-1];
    potentialMoves[6] = files[indexOfFile-2] + ranks[indexOfRank+1];
    potentialMoves[7] = files[indexOfFile-2] + ranks[indexOfRank-1];

    potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
    return potentialMoves;
  }

  handleClick(){
    const potentialMoves = this.calculatePotentialMoves(this.props.coordinate);
    this.props.onClick(this.props.coordinate, 
      {
        piece: 'N', color: this.props.color, potentialMoves: potentialMoves
      });
  }

  render() {
    return (
      <p onClick={()=>this.handleClick()}>N</p>
    );
  }
}

class Bishop extends React.Component {
  calculatePotentialMoves(coordinate) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);
    let potentialMoves = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);

    let traverseFiles = indexOfFile;
    let traverseRanks = indexOfRank;
    let pathOne = [];
    let pathTwo = [];
    
    //up the ranks down the files
    //down the ranks up the files
    //up the ranks up the files
    //down the ranks down the files
    
    for(let i = 0; i < ranks.length; i++) {
      traverseFiles = (traverseFiles+1) % files.length;
      traverseRanks = (traverseRanks+1) % ranks.length;
      pathOne[i] = files[traverseFiles] + ranks[traverseRanks];
    }

    potentialMoves[0] = pathOne;

    for(i = 0; i < files.length; i++) {
      traverseFiles = (traverseFiles-1) % files.length;
      traverseRanks = (traverseRanks+1) % ranks.length;
      pathTwo[i] = files[traverseFiles] + ranks[traverseRanks];
    }

    potentialMoves[1] = pathTwo;

    //potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
    return potentialMoves;
  }

  handleClick(){
    const potentialMoves = this.calculatePotentialMoves(this.props.coordinate);
    this.props.onClick(this.props.coordinate, 
      {
        piece: 'B', color: this.props.color, potentialMoves: potentialMoves
      });
  }

  render() {
    return (
      <p onClick={()=>this.handleClick()}>B</p>
    );
  }
}

class Rook extends React.Component {
  calculatePotentialMoves(coordinate) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);
    let potentialMoves = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);


    //up down ranks same file
    //up down files same rank
    let traverseFiles = indexOfFile;
    let traverseRanks = indexOfRank;
    let pathOne = [];
    let pathTwo = [];

    for(let i = 0; i < files.length; i++) {
      traverseFiles = (traverseFiles + 1) % files.length;
      pathOne[i] = files[traverseFiles] + rank;
    }

    potentialMoves[0] = pathOne;

    for(i = 0; i < ranks.length; i++) {
      traverseRanks = (traverseRanks + 1) % ranks.length;
      pathTwo[i] = file + ranks[traverseRanks];
    }

    potentialMoves[1] = pathTwo;

    //potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
    return potentialMoves;

  }

  handleClick(){
    const potentialMoves = this.calculatePotentialMoves(this.props.coordinate);
    this.props.onClick(this.props.coordinate, 
      {
        piece: 'R', color: this.props.color, potentialMoves: potentialMoves
      });
  }

  render() {
    return (
      <p onClick={()=>this.handleClick()}>R</p>
    );
  }
}

class Queen extends React.Component {
  calculatePotentialMoves(coordinate) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);
    let potentialMoves = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);

    let traverseFiles = indexOfFile;
    let traverseRanks = indexOfRank;
    let pathOne = [];
    let pathTwo = [];
    let pathThree = [];
    let pathFour = [];
    
    for(let i = 0; i < ranks.length; i++) {
      traverseFiles = (traverseFiles+1) % files.length;
      traverseRanks = (traverseRanks+1) % ranks.length;
      pathOne[i] = files[traverseFiles] + ranks[traverseRanks];
    }

    potentialMoves[0] = pathOne;
    

    for(i = 0; i < files.length; i++) {
      traverseFiles = (traverseFiles-1) % files.length;
      traverseRanks = (traverseRanks+1) % ranks.length;
      pathTwo[i] = files[traverseFiles] + ranks[traverseRanks];
    }

    potentialMoves[1] = pathTwo;

    for(i = 0; i < files.length; i++) {
      traverseFiles = (traverseFiles + 1) % files.length;
      pathThree[i] = files[traverseFiles] + rank;
    }

    potentialMoves[2] = pathThree;

    for(i = 0; i < ranks.length; i++) {
      traverseRanks = (traverseRanks + 1) % ranks.length;
      pathFour[i] = file + ranks[traverseRanks];
    }

    potentialMoves[3] = pathFour;


    //up the ranks down the files
    //down the ranks up the files
    //up the ranks up the files
    //down the ranks down the files
    //up down ranks same file
    //up down files same rank
    //potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
    return potentialMoves;
  }

  handleClick(){
    const potentialMoves = this.calculatePotentialMoves(this.props.coordinate);
    this.props.onClick(this.props.coordinate, 
      {
        piece: 'Q', color: this.props.color, potentialMoves: potentialMoves
      });
  }

  render() {
    return (
      <p onClick={()=>this.handleClick()}>Q</p>
    );
  }
}

class King extends React.Component {
  calculatePotentialMoves(coordinate) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);
    
    let potentialMoves = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);
    potentialMoves[0] = file+ranks[indexOfRank+1];
    potentialMoves[1] = file+ranks[indexOfRank-1];
    potentialMoves[2] = files[indexOfFile+1]+ranks[indexOfRank+1];
    potentialMoves[3] = files[indexOfFile+1]+ranks[indexOfRank-1];
    potentialMoves[4] = files[indexOfFile-1]+ranks[indexOfRank-1];
    potentialMoves[5] = files[indexOfFile-1]+ranks[indexOfRank+1];
    potentialMoves[6] = files[indexOfFile+1]+rank;
    potentialMoves[7] = files[indexOfFile-1]+rank;
    potentialMoves[8] = 'K-Castle';
    potentialMoves[9] = 'Q-Castle';
    potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
    
    console.log(potentialMoves);
    
    return potentialMoves;

  }

  handleClick(){
    const potentialMoves = this.calculatePotentialMoves(this.props.coordinate);
    this.props.onClick(this.props.coordinate, 
      {
        piece: 'K', color: this.props.color, potentialMoves: potentialMoves
      });
  }

  render() {
    return (
      <p onClick={()=>this.handleClick()}>K</p>
    );
  }
}

class NoPiece extends React.Component {

  handleClick() {
    this.props.onClick(this.props.coordinate, null);
  }

  render() {
    
    return (
      <p onClick={()=>this.handleClick()}></p>
    );
  }
}

class Square extends React.Component {

  renderPiece(pieceObj){
    console.log("renderPiece");

    const color = pieceObj.color;
    const pieceName = pieceObj.piece;
    const pieceMap = 
      new Map([
        ['P', <Pawn color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['N', <Knight color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['B', <Bishop color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['R', <Rook color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['Q', <Queen color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['K', <King color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>],
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
    

    if(!this.state.selectedPiece && !pieceObj.piece) {
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
