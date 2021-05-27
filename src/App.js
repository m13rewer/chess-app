import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Pawn, Knight, Bishop, Rook, Queen, King, NoPiece} from './pieces';

class Square extends React.Component {

  renderPiece(pieceObj){

    const color = pieceObj.color;
    const pieceName = pieceObj.piece;
    const moved = pieceObj.moved;
    
    const pieceMap = 
      new Map([
        ['P', <Pawn board={this.props.board} color={color} moved={moved} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['N', <Knight board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['B', <Bishop board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['R', <Rook board={this.props.board} color={color} moved={moved} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['Q', <Queen board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>], 
        ['K', <King board={this.props.board} color={color} moved={moved} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj)=> this.props.onClick(coordinate, pieceObj)}/>],
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
              ['a8', {piece: 'R', color: 'black', moved: false}], ['b8', {piece: 'N', color: 'black'}], ['c8', {piece: 'B', color: 'black'}], 
                ['d8', {piece: 'Q', color: 'black'}], ['e8', {piece: 'K', color: 'black', moved: false}], ['f8', {piece: 'B', color: 'black'}], 
                ['g8', {piece: 'N', color: 'black'}], ['h8', {piece: 'R', color: 'black', moved: false}],
              ['a7', {piece: 'P', color: 'black', moved: false}], ['b7', {piece: 'P', color: 'black', moved: false}], 
                ['c7', {piece: 'P', color: 'black', moved: false}], ['d7', {piece: 'P', color: 'black', moved: false}], 
                ['e7', {piece: 'P', color: 'black', moved: false}], ['f7', {piece: 'P', color: 'black', moved: false}], 
                ['g7', {piece: 'P', color: 'black', moved: false}], ['h7', {piece: 'P', color: 'black', moved: false}],
              ['a6', {piece: '', color: ''}], ['b6', {piece: '', color: ''}], ['c6', {piece: '', color: ''}], ['d6',{piece: '', color: ''}], 
                ['e6', {piece: '', color: ''}], ['f6', {piece: '', color: ''}], ['g6', {piece: '', color: ''}], ['h6', {piece: '', color: ''}],
              ['a5', {piece: '', color: ''}], ['b5', {piece: '', color: ''}], ['c5', {piece: '', color: ''}], ['d5',{piece: '', color: ''}], 
                ['e5', {piece: '', color: ''}], ['f5', {piece: '', color: ''}], ['g5', {piece: '', color: ''}], ['h5', {piece: '', color: ''}],
              ['a4', {piece: '', color: ''}], ['b4', {piece: '', color: ''}], ['c4', {piece: '', color: ''}], ['d4', {piece: '', color: ''}], 
                ['e4', {piece: '', color: ''}], ['f4', {piece: '', color: ''}], ['g4', {piece: '', color: ''}], ['h4', {piece: '', color: ''}],
              ['a3', {piece: '', color: ''}], ['b3', {piece: '', color: ''}], ['c3', {piece: '', color: ''}], ['d3',{piece: '', color: ''}], 
                ['e3', {piece: '', color: ''}], ['f3', {piece: '', color: ''}], ['g3', {piece: '', color: ''}], ['h3', {piece: '', color: ''}],
              ['a2', {piece: 'P', color: 'white', moved: false}], ['b2', {piece: 'P', color: 'white', moved: false}], 
                ['c2', {piece: 'P', color: 'white', moved: false}], ['d2', {piece: 'P', color: 'white', moved: false}], 
                ['e2', {piece: 'P', color: 'white', moved: false}], ['f2', {piece: 'P', color: 'white', moved: false}], 
                ['g2', {piece: 'P', color: 'white', moved: false}], ['h2', {piece: 'P', color: 'white', moved: false}],
              ['a1', {piece: 'R', color: 'white', moved: false}], ['b1', {piece: 'N', color: 'white'}], ['c1', {piece: 'B', color: 'white'}], 
                ['d1', {piece: 'Q', color: 'white'}], ['e1', {piece: 'K', color: 'white', moved: false}], ['f1', {piece: 'B', color: 'white'}], 
                ['g1', {piece: 'N', color: 'white'}], ['h1', {piece: 'R', color: 'white', moved: false}]
            ])
          }
        ],
        player: {color: '', isMyTurn: false, status: ''},
        selectedPiece: null,
        moves: [],
        pieces: [],
        check: null,
        whiteToMove: true
      }
  }

  startGame() {
    //we make some kind of api call
    this.fakeApiCall();
    
    console.log(this.state);

  }

  fakeApiCall() {
    const wb = Math.floor(Math.random() * 2) === 0;
    this.setState({
      player: {color: 'white', status: 'playing', isMyTurn: true}
    });
  }

  pieceSelection(coordinate, pieceObj) {
    console.log("pieceSelection")
    if(!this.state.selectedPiece && !pieceObj) {
      return true;
    }

    if(!this.state.selectedPiece && pieceObj.piece) {
      this.setState(
        {
          selectedPiece: {coordinate: coordinate, pieceObj: pieceObj}
        }
      );

      return true;
    }

    if(this.state.selectedPiece && !pieceObj) return false;

    if(this.state.selectedPiece && pieceObj.piece && this.state.selectedPiece.color && pieceObj.piece.color) {
      this.setState(
        {
          selectedPiece: {coordinate: coordinate, pieceObj: pieceObj}
        }
      );

      return true;
    }

    return false;
  }

  unselect() {
    this.setState(
      {
        selectedPiece: null
      }
    );
  }

  handleClick(coordinate, pieceObj) {
    console.log("handleClick()");
    console.log(coordinate);
    console.log(pieceObj);
    const player = this.state.player;
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;
    const whiteToMove = this.state.whiteToMove;
    const colorOfTurn = whiteToMove ? 'white': 'black';
    
    //const historyLength = this.state.history.length;

    if(this.pieceSelection(coordinate, pieceObj)) return;

    const selectedPiece = this.state.selectedPiece;

    if(selectedPiece.pieceObj.color !== player.color) {
      this.unselect();
      return;
    }

    let legalMoves; 
    const isCheck = this.isCheck(boardMap, whiteToMove);

    if(isCheck && selectedPiece.pieceObj.piece === 'K'){
      legalMoves = selectedPiece.pieceObj.legalMoves;
      this.setState({
        check: null,
        sourcesOfCheck: null
      });
    }
    else if(isCheck) {
      const kingCoordinate = this.findKing(colorOfTurn, boardMap);
      const sourcesOfCheck = this.sourcesOfCheck(kingCoordinate, colorOfTurn);
      
      this.setState({
        check: colorOfTurn,
        sourcesOfCheck: sourcesOfCheck
      });

      legalMoves = this.getInCheckLegalMoves(boardMap, sourcesOfCheck);

    } 
    else{
      legalMoves = selectedPiece.pieceObj.legalMoves;
      this.setState({
        check: null,
        sourcesOfCheck: null
      });
    }
    
    console.log(legalMoves);
    console.log(coordinate);
    if(legalMoves.includes(coordinate)) {
      console.log("coordinateMatches");
      this.movePiece(coordinate);
      this.switchTurns();

      return;
    }

    this.unselect();

  }

  switchTurns() {
    const whiteToMove = this.state.whiteToMove;
    this.setState({
      whiteToMove: !whiteToMove,
      player: {color: !whiteToMove ? 'white': 'black', isMyTurn: true, status: 'playing'} //this is temporary because we will never change player color during a real game
    });

  }
  // findBlockingMove() {
  //   //TODO
  // }

  getInCheckLegalMoves(board, checkSources) {
    const whiteToMove = this.state.whiteToMove;
    const turnColor = whiteToMove ? 'white': 'black';
    const sourcesOfCheck = checkSources;
    const eliminateSourceOfCheckMove = [];
    const boardMap = board;
    let captureAndBlockingMoves = [];
    const coordinate = this.findKing(turnColor, boardMap);

    if(sourcesOfCheck.length === 1) {
      eliminateSourceOfCheckMove.unshift(sourcesOfCheck[0].coordinate); 
      captureAndBlockingMoves = eliminateSourceOfCheckMove.concat(sourcesOfCheck[0].path);
    }

    const king = new King({
      board: boardMap,
      color: turnColor,
      moved: false,
      coordinate: coordinate
    });

    const legalKingMoves = king.getLegalMoves(king.calculatePotentialMoves(coordinate));
    const inCheckLegalMoves = captureAndBlockingMoves.concat(legalKingMoves);

    return inCheckLegalMoves;
  }

  isCheckmate() {

  }

  sourcesOfCheck(kingCoordinate, colorInCheck) {
    const sourcesOfCheck = this.rookPath(kingCoordinate, colorInCheck)
    .concat(this.bishopPath(kingCoordinate, colorInCheck)
      .concat(this.knightPath(kingCoordinate, colorInCheck)
        .concat(this.pawnPath(kingCoordinate, colorInCheck))
      )
    ).filter(element => element);

    // this.setState({
    //   sourcesOfCheck: sourcesOfCheck
    // });
    
    return sourcesOfCheck;
  }

  rookPath(coordinate, colorInCheck) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;

    let traverseFiles = indexOfFile+1;
    let traverseRanks = indexOfRank+1;
    let piecesFound = [];
    let path = [];
    let pathIncrement = 0;
    let squareChecked;
    let coordCheck;

    let i = 0;

    while(files[traverseFiles]) {
      coordCheck = files[traverseFiles] + rank;
      squareChecked = boardMap.get(coordCheck);
      console.log(squareChecked);
      console.log(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseFiles++;
      i++;
      pathIncrement++;
    }

    pathIncrement = 0;
    path = [];
    traverseFiles = indexOfFile-1;
    
    while(files[traverseFiles]) {
      coordCheck = files[traverseFiles] + rank;
      squareChecked = boardMap.get(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseFiles--;
      i++;
      pathIncrement++;
    }

    pathIncrement = 0;
    path = [];
    while(ranks[traverseRanks]) {
      coordCheck = file + ranks[traverseRanks];
      squareChecked = boardMap.get(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseRanks++;
      i++;
      pathIncrement++;
    }

    pathIncrement = 0;
    path = [];
    traverseRanks = indexOfRank-1;
    
    while(files[traverseFiles]) {
      coordCheck = file + ranks[traverseRanks];
      squareChecked = boardMap.get(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseRanks--;
      i++;
      pathIncrement++;
    }

    return piecesFound;
  }

  knightPath(coordinate, colorInCheck) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);
    let potentialKnights = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;

    potentialKnights[0] = '' + files[indexOfFile+1] + ranks[indexOfRank+2];
    potentialKnights[1] = '' + files[indexOfFile+1] + ranks[indexOfRank-2];
    potentialKnights[2] = '' + files[indexOfFile-1] + ranks[indexOfRank+2];
    potentialKnights[3] = '' + files[indexOfFile-1] + ranks[indexOfRank-2];
    potentialKnights[4] = '' + files[indexOfFile+2] + ranks[indexOfRank+1];
    potentialKnights[5] = '' + files[indexOfFile+2] + ranks[indexOfRank-1];
    potentialKnights[6] = '' + files[indexOfFile-2] + ranks[indexOfRank+1];
    potentialKnights[7] = '' + files[indexOfFile-2] + ranks[indexOfRank-1];

    potentialKnights = potentialKnights.filter(element => !element.includes('undefined'));
    let piecesFound = [];
    let squareChecked;

    potentialKnights.forEach(element => {
      squareChecked = boardMap.get(element);
      if(squareChecked.piece === 'N' && squareChecked.color !== colorInCheck) {
        piecesFound.unshift(squareChecked);
      }
    });

    return piecesFound;
  }

  pawnPath(coordinate, colorInCheck) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);

    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;

    let piecesFound;
    let squareChecked;

    if(colorInCheck === 'black') {
      let potentialWhitePawns = [];
      potentialWhitePawns[0] = '' + files[indexOfFile+1] + ranks[indexOfRank-1];
      potentialWhitePawns[1] = '' + files[indexOfFile-1] + ranks[indexOfRank-1];
      potentialWhitePawns = potentialWhitePawns.filter(element => !element.includes('undefined'));
      
      potentialWhitePawns.forEach(element => {
        squareChecked = boardMap.get(element);
        if(squareChecked.piece === 'P' && squareChecked.color !== colorInCheck) {
          piecesFound.unshift(squareChecked);
        }
      });
    
      return piecesFound;
    }

    if(colorInCheck === 'white') {
      let potentialBlackPawns = [];
      potentialBlackPawns[0] = '' + files[indexOfFile+1] + ranks[indexOfRank-1];
      potentialBlackPawns[1] = '' + files[indexOfFile-1] + ranks[indexOfRank-1];
      potentialBlackPawns = potentialBlackPawns.filter(element => !element.includes('undefined'));
      
      potentialBlackPawns.forEach(element => {
        squareChecked = boardMap.get(element);
        if(squareChecked.piece === 'P' && squareChecked.color !== colorInCheck) {
          piecesFound.unshift(squareChecked);
        }
      });
      return piecesFound;
    }
  }

  bishopPath(coordinate, colorInCheck) {
    const file = coordinate.substring(0, 1);
    const rank = coordinate.substring(1);

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const indexOfFile = files.indexOf(file);
    const indexOfRank = ranks.indexOf(rank);
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;
    
    let traverseFiles = indexOfFile+1;
    let traverseRanks = indexOfRank+1;
    let piecesFound = [];
    let path = [];
    let pathIncrement = 0;
    let squareChecked;
    let coordCheck;
    let i = 0;

    while(files[traverseFiles] && ranks[traverseRanks]) {
      coordCheck = files[traverseFiles] + ranks[traverseRanks];
      squareChecked = boardMap.get(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseFiles++;
      traverseRanks++;
      i++;
      pathIncrement++;
    }

    pathIncrement = 0;
    path = [];
    traverseFiles = indexOfFile-1;
    traverseRanks = indexOfRank-1;

    while(files[traverseFiles] && ranks[traverseRanks]) {
      coordCheck = files[traverseFiles] + ranks[traverseRanks];
      squareChecked = boardMap.get(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseFiles--;
      traverseRanks--;
      i++;
      pathIncrement++;
    }

    pathIncrement = 0;
    path = [];
    traverseFiles = indexOfFile+1;
    traverseRanks = indexOfRank-1;

    while(files[traverseFiles] && ranks[traverseRanks]) {
      coordCheck = files[traverseFiles] + ranks[traverseRanks];
      squareChecked = boardMap.get(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseFiles++;
      traverseRanks--;
      i++;
      pathIncrement++;
    }

    pathIncrement = 0;
    path = [];
    traverseFiles = indexOfFile-1;
    traverseRanks = indexOfRank+1;

    while(files[traverseFiles] && ranks[traverseRanks]) {
      coordCheck = files[traverseFiles] + ranks[traverseRanks];
      squareChecked = boardMap.get(coordCheck);
      path[pathIncrement] = coordCheck;

      if((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
        piecesFound[i] = {pieceObj: squareChecked, coordinate: coordCheck, path: path};
        break;
      }

      traverseFiles--;
      traverseRanks++;
      i++;
      pathIncrement++;
    }

    return piecesFound;
  }

  isCheck(board, whitesMove) {
    const boardMap = board;
    const whiteToMove = whitesMove;
    const color = whiteToMove ? 'white' : 'black';
    const coordinate = this.findKing(color, boardMap);

    const king = new King({
      board: boardMap,
      color: color,
      moved: false,
      coordinate: coordinate
    });

    const allSquaresHit = king.getAllSquaresHit();

    if(allSquaresHit.includes(coordinate)) return true;

    return false;
    
  }

  findKing(color, board) {
    const boardMap = board;
    let coordinate;

    boardMap.forEach((value, key) => {
      if(value.piece === 'K' && value.color === color) {
        coordinate = key;
      }
    });

    return coordinate;
  }

  isCastle(selectedPiece, coordinate) {
    if(selectedPiece.pieceObj.color === 'white' && coordinate === 'g1') return this.kingSideCastle('white');
    if(selectedPiece.pieceObj.color === 'white' && coordinate === 'c1') return this.queenSideCastle('white');
    if(selectedPiece.pieceObj.color === 'black' && coordinate === 'g8') return this.kingSideCastle('black');
    if(selectedPiece.pieceObj.color === 'black' && coordinate === 'c8') return this.queenSideCastle('black');

    return false;
  }

  kingSideCastle(color) {
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;
    const whiteToMove = this.state.whiteToMove;

    if(color === 'white') {
      boardMap.set('g1', {piece: 'K', color: 'white', moved: true});
      boardMap.set('f1', {piece: 'R', color: 'white', moved: true}); 
      boardMap.set('e1', {piece: '', color: ''});
      boardMap.set('h1', {piece: '', color: ''});
      console.log()
      if(this.isCheck(boardMap, whiteToMove)) {
        return false;
      }

      this.setState({
        history: history.concat([
          {
            board: boardMap
          }
        ]),
        selectedPiece: null
      });

      return true;
    }

    if(color === 'black') {
      boardMap.set('g8', {piece: 'K', color: 'black', moved: true});
      boardMap.set('f8', {piece: 'R', color: 'black', moved: true});
      boardMap.set('e8', {piece: '', color: ''});
      boardMap.set('h8', {piece: '', color: ''});

      if(this.isCheck(boardMap, whiteToMove)) {
        return false;
      }

      this.setState({
        history: history.concat([
          {
            board: boardMap
          }
        ]),
        selectedPiece: null
      });
      return true;
    }
  }

  queenSideCastle(color) {
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;
    const whiteToMove = this.state.whiteToMove;

    if(color === 'white') {
      boardMap.set('c1', {piece: 'K', color: 'white', moved: true});
      boardMap.set('d1', {piece: 'R', color: 'white', moved: true}); 
      boardMap.set('e1', {piece: '', color: ''});
      boardMap.set('a1', {piece: '', color: ''});

      if(this.isCheck(boardMap, whiteToMove)) {
        return false;
      }

      this.setState({
        history: history.concat([
          {
            board: boardMap
          }
        ]),
        selectedPiece: null
      });
      return true;
    }

    if(color === 'black') {
      boardMap.set('c8', {piece: 'K', color: 'black', moved: true});
      boardMap.set('d8', {piece: 'R', color: 'black', moved: true});
      boardMap.set('e8', {piece: '', color: ''});
      boardMap.set('a8', {piece: '', color: ''});

      if(this.isCheck(boardMap, whiteToMove)) {
        return false;
      }

      this.setState({
        history: history.concat([
          {
            board: boardMap
          }
        ]),
        selectedPiece: null
      });
      return true;
    }
  }

  promote() {

  }

  enPassant() {

  }

  getPieceInstance(pieceObj, coordinate) {
    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;

    switch(pieceObj.piece){
      case 'P':
        return new Pawn({
          board: boardMap,
          color: pieceObj.color,
          moved: pieceObj.moved,
          coordinate: coordinate
        });
      case 'N':
        return new Knight({
          board: boardMap,
          color: pieceObj.color,
          coordinate: coordinate
        });
      case 'B':
        return new Bishop({
          board: boardMap,
          color: pieceObj.color,
          coordinate: coordinate
        });
      case 'R':
        return new Rook({
          board: boardMap,
          color: pieceObj.color,
          coordinate: coordinate
        });
      case 'Q':
        return new Queen({
          board: boardMap,
          color: pieceObj.color,
          coordinate: coordinate
        });
      case 'K':
        return new King({
          board: boardMap,
          color: pieceObj.color,
          moved: pieceObj.moved,
          coordinate: coordinate
        });
      default: return;
    }
  }

  movePiece(coordinate) {
    console.log('movePiece()');

    const history = this.state.history.slice(0, 1);
    const current = history[history.length - 1];
    const boardMap = current.board;
    const selectedPiece = this.state.selectedPiece;
    const whiteToMove = this.state.whiteToMove;
    if(selectedPiece.pieceObj.piece === 'K' && !selectedPiece.pieceObj.moved) {
      if(this.isCastle(selectedPiece, coordinate)) {
        return;
      }
    }

    const boardMapCopy = new Map(Array.from(boardMap));
    boardMapCopy.set(coordinate, this.state.selectedPiece.pieceObj);
    boardMapCopy.set(this.state.selectedPiece.coordinate, {piece: '', color: ''});

    if(this.isCheck(boardMapCopy, whiteToMove)) {
      console.log('isCheckIf');
      this.unselect();
      return;
    }
    
    boardMap.set(coordinate, this.state.selectedPiece.pieceObj);
    boardMap.set(this.state.selectedPiece.coordinate, {piece: '', color: ''});
    console.log(boardMap);
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
   
    return (
      <div>
        <Board onClick={(coordinate, piece) => this.handleClick(coordinate, piece)} board={current.board}/>
        <button onClick={() => this.startGame()}>Create Game</button>
      </div>
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
