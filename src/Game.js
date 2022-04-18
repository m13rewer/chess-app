import io from 'socket.io-client';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }
  
    startGame() {
      this.connectToGameServer((color) => {
        this.flipBoard(color);
      });
  
    }
  
    flipBoard(color) {
      console.log("flipBoard()");
      if (color !== 'black') {
        return;
      }
      const board = document.getElementById('board');
      board.classList.add('flip');
      const children = Array.prototype.slice.call(board.children);
      
      let squares;
  
      for (let i = 0; i < children.length; i++) {
        squares = Array.prototype.slice.call(children[i].children);
        
        for (let e = 0; e < squares.length; e++) {
          squares[e].classList.add('flip');
        }
      }
  
    }
  
    connectToGameServer(flipBoard) {
      console.log('connectToGameServer');
      if (this.state.player.status === 'playing') return;
  
      const socket = io('http://ec2-18-144-155-135.us-west-1.compute.amazonaws.com:80', { autoConnect: false });
      const username = "m13rewer" + Math.floor((Math.random() * 500));
  
      socket.auth = { username: username };
      socket.connect();
      const state = initialState;
      state.history = [{
        board: new Map([
          ['a8', { piece: 'R', color: 'black', moved: false }], ['b8', { piece: 'N', color: 'black' }], ['c8', { piece: 'B', color: 'black' }],
          ['d8', { piece: 'Q', color: 'black' }], ['e8', { piece: 'K', color: 'black', moved: false }], ['f8', { piece: 'B', color: 'black' }],
          ['g8', { piece: 'N', color: 'black' }], ['h8', { piece: 'R', color: 'black', moved: false }],
          ['a7', { piece: 'P', color: 'black', moved: false, enPassant: '' }], ['b7', { piece: 'P', color: 'black', moved: false, enPassant: '' }],
          ['c7', { piece: 'P', color: 'black', moved: false, enPassant: '' }], ['d7', { piece: 'P', color: 'black', moved: false, enPassant: '' }],
          ['e7', { piece: 'P', color: 'black', moved: false, enPassant: '' }], ['f7', { piece: 'P', color: 'black', moved: false, enPassant: '' }],
          ['g7', { piece: 'P', color: 'black', moved: false, enPassant: '' }], ['h7', { piece: 'P', color: 'black', moved: false, enPassant: '' }],
          ['a6', { piece: '', color: '' }], ['b6', { piece: '', color: '' }], ['c6', { piece: '', color: '' }], ['d6', { piece: '', color: '' }],
          ['e6', { piece: '', color: '' }], ['f6', { piece: '', color: '' }], ['g6', { piece: '', color: '' }], ['h6', { piece: '', color: '' }],
          ['a5', { piece: '', color: '' }], ['b5', { piece: '', color: '' }], ['c5', { piece: '', color: '' }], ['d5', { piece: '', color: '' }],
          ['e5', { piece: '', color: '' }], ['f5', { piece: '', color: '' }], ['g5', { piece: '', color: '' }], ['h5', { piece: '', color: '' }],
          ['a4', { piece: '', color: '' }], ['b4', { piece: '', color: '' }], ['c4', { piece: '', color: '' }], ['d4', { piece: '', color: '' }],
          ['e4', { piece: '', color: '' }], ['f4', { piece: '', color: '' }], ['g4', { piece: '', color: '' }], ['h4', { piece: '', color: '' }],
          ['a3', { piece: '', color: '' }], ['b3', { piece: '', color: '' }], ['c3', { piece: '', color: '' }], ['d3', { piece: '', color: '' }],
          ['e3', { piece: '', color: '' }], ['f3', { piece: '', color: '' }], ['g3', { piece: '', color: '' }], ['h3', { piece: '', color: '' }],
          ['a2', { piece: 'P', color: 'white', moved: false, enPassant: '' }], ['b2', { piece: 'P', color: 'white', moved: false, enPassant: '' }],
          ['c2', { piece: 'P', color: 'white', moved: false, enPassant: '' }], ['d2', { piece: 'P', color: 'white', moved: false, enPassant: '' }],
          ['e2', { piece: 'P', color: 'white', moved: false, enPassant: '' }], ['f2', { piece: 'P', color: 'white', moved: false, enPassant: '' }],
          ['g2', { piece: 'P', color: 'white', moved: false, enPassant: '' }], ['h2', { piece: 'P', color: 'white', moved: false, enPassant: '' }],
          ['a1', { piece: 'R', color: 'white', moved: false }], ['b1', { piece: 'N', color: 'white' }], ['c1', { piece: 'B', color: 'white' }],
          ['d1', { piece: 'Q', color: 'white' }], ['e1', { piece: 'K', color: 'white', moved: false }], ['f1', { piece: 'B', color: 'white' }],
          ['g1', { piece: 'N', color: 'white' }], ['h1', { piece: 'R', color: 'white', moved: false }]
        ])
      }];
      state.username = username;
      state.socket = socket;
  
      this.setState(state);
  
      const context = this;
  
      socket.on('private message', function (msg) {
        console.log('private message');
  
        const content = msg.content;
        const piece = content.piece;
        const coordinate = content.coordinate;
  
        context.movePiece(coordinate, piece);
        context.switchTurns();
      });
  
      socket.on('chat message', function (msg) {
        console.log("chat message");
  
        const content = msg.content;
        const playerObj = content.player1.username == username ? content.player1 : content.player2;
  
        context.setState(
          {
            matchObject: msg,
            player: {
              color: playerObj.color,
              isMyTurn: playerObj.color === 'white' ? true : false,
              status: 'playing',
              opponent: !(content.player1.username === username) ? content.player1 : content.player2
            },
            selectedPiece: null,
            whiteToMove: playerObj.color === 'white' ? true : false,
          }
        );
  
        flipBoard(playerObj.color);
      });
  
      socket.on('end game', function () {
        console.log("end game");
        context.endGame();
      });
  
    }
  
    sendMoves(coordinate, piece) {
      console.log('sendMoves()');
  
      const socket = this.state.socket;
      const room = this.state.matchObject.room;
      const opponent = this.state.player.opponent;
  
      socket.emit("private message", {
        content:
        {
          coordinate: coordinate,
          piece: piece
        },
        room: room,
        to: opponent.socketID,
      });
    }
  
    fakeApiCall() {
      const wb = Math.floor(Math.random() * 2) === 0;
      this.setState({
        player: { color: 'white', status: 'playing', isMyTurn: true }
      });
    }
  
    pieceSelection(coordinate, pieceObj) {
      console.log("pieceSelection")
      if (pieceObj.piece) {
        this.setState(
          {
            selectedPiece: { coordinate: coordinate, pieceObj: pieceObj }
          }
        );
      }
    }
  
    endGame() {
      this.setState(
        {
          matchObject: null,
          gameStatus: 'checkmate',
          player: { color: '', status: '', isMyTurn: false }
  
        }
      );
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
  
      const player = this.state.player;
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
      const whiteToMove = this.state.whiteToMove;
      const colorOfTurn = whiteToMove ? 'white' : 'black';
      const selectedPiece = this.state.selectedPiece;
  
  
      if (!selectedPiece) {
        this.pieceSelection(coordinate, pieceObj);
        return;
      }
  
      if (selectedPiece && !selectedPiece.pieceObj.legalMoves.includes(coordinate)) {
        this.pieceSelection(coordinate, pieceObj);
        return;
      }
  
      if (selectedPiece.pieceObj.color !== player.color) {
        this.unselect();
        return;
      }
  
      let legalMoves;
  
      const isCheck = this.isCheck(boardMap, whiteToMove);
  
      if (isCheck && selectedPiece.pieceObj.piece === 'K') {
        legalMoves = selectedPiece.pieceObj.legalMoves;
        this.setState({
          check: null,
          sourcesOfCheck: null
        });
      }
      else if (isCheck && selectedPiece.pieceObj.piece !== 'K') {
        const kingCoordinate = this.findKing(colorOfTurn, boardMap);
        const sourcesOfCheck = this.piecesHittingCoordinate(kingCoordinate, colorOfTurn);
  
        this.setState({
          check: colorOfTurn,
          sourcesOfCheck: sourcesOfCheck
        });
  
        legalMoves = this.getInCheckLegalMoves(sourcesOfCheck);
        legalMoves = selectedPiece.pieceObj.legalMoves.filter(element => legalMoves.includes(element));
  
        if (legalMoves.length === 0) {
          this.unselect();
          return;
        }
      }
      else {
        legalMoves = selectedPiece.pieceObj.legalMoves;
        this.setState({
          check: null,
          sourcesOfCheck: null
        });
      }
  
      if (legalMoves.includes(coordinate) && player.isMyTurn) {
  
        if (!this.movePiece(coordinate, selectedPiece)) {
          return;
        }
        this.sendMoves(coordinate, selectedPiece);
        this.switchTurns();
  
        return;
      }
  
      this.unselect();
  
    }
  
    switchTurns() {
      const whiteToMove = this.state.whiteToMove;
      const player = this.state.player;
      this.setState({
        whiteToMove: !whiteToMove,
        player: { color: player.color, status: player.status, isMyTurn: !player.isMyTurn, opponent: player.opponent }
      });
    }
  
    getInCheckLegalMoves(checkSources) {
      const sourcesOfCheck = checkSources;
      const eliminateSourceOfCheckMove = [];
      let captureAndBlockingMoves = [];
  
      if (sourcesOfCheck.length === 1) {
        eliminateSourceOfCheckMove.unshift(sourcesOfCheck[0].coordinate);
        captureAndBlockingMoves = eliminateSourceOfCheckMove.concat(sourcesOfCheck[0].path);
      }
  
      const inCheckLegalMoves = captureAndBlockingMoves;
  
      return inCheckLegalMoves;
    }
  
    isCheckmate(whitesMove) {
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
      const whiteToMove = whitesMove;
  
      const color = whiteToMove ? 'white' : 'black';
      const coordinate = this.findKing(color, boardMap);
  
      const king = new King({
        board: boardMap,
        color: color,
        moved: false,
        coordinate: coordinate
      });
  
      const legalKingMoves = king.getLegalMoves(king.calculatePotentialMoves(coordinate));
      const sourcesOfCheck = this.piecesHittingCoordinate(coordinate, color);
  
      const potentialBlocksOrCaptures = this.getInCheckLegalMoves(sourcesOfCheck);
      let pieceCanCapture = false;
      if (sourcesOfCheck.length === 1) {
        pieceCanCapture = potentialBlocksOrCaptures.forEach(element => {
          if (this.piecesHittingCoordinate(element, color).length > 0) return true;
          return false;
        });
      }
  
      if (legalKingMoves.length === 0 && !pieceCanCapture) {
        console.log('isCheckmate');
        return true;
      }
  
      return false;
    }
  
    piecesHittingCoordinate(kingCoordinate, colorInCheck) {
      console.log('sourcesOfCheck()');
      const sourcesOfCheck = this.rookPath(kingCoordinate, colorInCheck)
        .concat(this.bishopPath(kingCoordinate, colorInCheck)
          .concat(this.knightPath(kingCoordinate, colorInCheck)
            .concat(this.pawnPath(kingCoordinate, colorInCheck))
          )
        ).filter(element => element);
      console.log(sourcesOfCheck);
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
  
      let traverseFiles = indexOfFile + 1;
      let traverseRanks = indexOfRank + 1;
      let piecesFound = [];
      let path = [];
      let pathIncrement = 0;
      let squareChecked;
      let coordCheck;
  
      let i = 0;
  
      while (files[traverseFiles]) {
        coordCheck = files[traverseFiles] + rank;
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
          break;
        }
  
        traverseFiles++;
        i++;
        pathIncrement++;
      }
  
      pathIncrement = 0;
      path = [];
      traverseFiles = indexOfFile - 1;
  
      while (files[traverseFiles]) {
        coordCheck = files[traverseFiles] + rank;
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
          break;
        }
  
        traverseFiles--;
        i++;
        pathIncrement++;
      }
  
      pathIncrement = 0;
      path = [];
      while (ranks[traverseRanks]) {
        coordCheck = file + ranks[traverseRanks];
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
          break;
        }
  
        traverseRanks++;
        i++;
        pathIncrement++;
      }
  
      pathIncrement = 0;
      path = [];
      traverseRanks = indexOfRank - 1;
  
      while (ranks[traverseRanks]) {
        coordCheck = file + ranks[traverseRanks];
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'R' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
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
  
      potentialKnights[0] = '' + files[indexOfFile + 1] + ranks[indexOfRank + 2];
      potentialKnights[1] = '' + files[indexOfFile + 1] + ranks[indexOfRank - 2];
      potentialKnights[2] = '' + files[indexOfFile - 1] + ranks[indexOfRank + 2];
      potentialKnights[3] = '' + files[indexOfFile - 1] + ranks[indexOfRank - 2];
      potentialKnights[4] = '' + files[indexOfFile + 2] + ranks[indexOfRank + 1];
      potentialKnights[5] = '' + files[indexOfFile + 2] + ranks[indexOfRank - 1];
      potentialKnights[6] = '' + files[indexOfFile - 2] + ranks[indexOfRank + 1];
      potentialKnights[7] = '' + files[indexOfFile - 2] + ranks[indexOfRank - 1];
  
      potentialKnights = potentialKnights.filter(element => !element.includes('undefined'));
      let piecesFound = [];
      let squareChecked;
  
      potentialKnights.forEach(element => {
        squareChecked = boardMap.get(element);
        if (squareChecked.piece === 'N' && squareChecked.color !== colorInCheck) {
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
  
      let piecesFound = [];
      let squareChecked;
  
      if (colorInCheck === 'black') {
        let potentialWhitePawns = [];
        potentialWhitePawns[0] = '' + files[indexOfFile + 1] + ranks[indexOfRank - 1];
        potentialWhitePawns[1] = '' + files[indexOfFile - 1] + ranks[indexOfRank - 1];
        potentialWhitePawns = potentialWhitePawns.filter(element => !element.includes('undefined'));
  
        potentialWhitePawns.forEach(element => {
          squareChecked = boardMap.get(element);
          if (squareChecked.piece === 'P' && squareChecked.color !== colorInCheck) {
            piecesFound.unshift(squareChecked);
          }
        });
  
        return piecesFound;
      }
  
      if (colorInCheck === 'white') {
        let potentialBlackPawns = [];
        potentialBlackPawns[0] = '' + files[indexOfFile + 1] + ranks[indexOfRank - 1];
        potentialBlackPawns[1] = '' + files[indexOfFile - 1] + ranks[indexOfRank - 1];
        potentialBlackPawns = potentialBlackPawns.filter(element => !element.includes('undefined'));
  
        potentialBlackPawns.forEach(element => {
          squareChecked = boardMap.get(element);
          if (squareChecked.piece === 'P' && squareChecked.color !== colorInCheck) {
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
  
      let traverseFiles = indexOfFile + 1;
      let traverseRanks = indexOfRank + 1;
      let piecesFound = [];
      let path = [];
      let pathIncrement = 0;
      let squareChecked;
      let coordCheck;
      let i = 0;
  
      while (files[traverseFiles] && ranks[traverseRanks]) {
        coordCheck = files[traverseFiles] + ranks[traverseRanks];
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
          break;
        }
  
        traverseFiles++;
        traverseRanks++;
        i++;
        pathIncrement++;
      }
  
      pathIncrement = 0;
      path = [];
      traverseFiles = indexOfFile - 1;
      traverseRanks = indexOfRank - 1;
  
      while (files[traverseFiles] && ranks[traverseRanks]) {
        coordCheck = files[traverseFiles] + ranks[traverseRanks];
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
          break;
        }
  
        traverseFiles--;
        traverseRanks--;
        i++;
        pathIncrement++;
      }
  
      pathIncrement = 0;
      path = [];
      traverseFiles = indexOfFile + 1;
      traverseRanks = indexOfRank - 1;
  
      while (files[traverseFiles] && ranks[traverseRanks]) {
        coordCheck = files[traverseFiles] + ranks[traverseRanks];
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
          break;
        }
  
        traverseFiles++;
        traverseRanks--;
        i++;
        pathIncrement++;
      }
  
      pathIncrement = 0;
      path = [];
      traverseFiles = indexOfFile - 1;
      traverseRanks = indexOfRank + 1;
  
      while (files[traverseFiles] && ranks[traverseRanks]) {
        coordCheck = files[traverseFiles] + ranks[traverseRanks];
        squareChecked = boardMap.get(coordCheck);
        path[pathIncrement] = coordCheck;
  
        if (squareChecked.piece && squareChecked.color === colorInCheck) break;
        if ((squareChecked.piece === 'B' || squareChecked.piece === 'Q') && squareChecked.color !== colorInCheck) {
          piecesFound[i] = { pieceObj: squareChecked, coordinate: coordCheck, path: path };
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
  
      if (allSquaresHit.includes(coordinate)) return true;
  
      return false;
  
    }
  
    findKing(color, board) {
      const boardMap = board;
      let coordinate;
  
      boardMap.forEach((value, key) => {
        if (value.piece === 'K' && value.color === color) {
          coordinate = key;
        }
      });
  
      return coordinate;
    }
  
    isCastle(selectedPiece, coordinate) {
      if (selectedPiece.pieceObj.color === 'white' && coordinate === 'g1') return this.kingSideCastle('white');
      if (selectedPiece.pieceObj.color === 'white' && coordinate === 'c1') return this.queenSideCastle('white');
      if (selectedPiece.pieceObj.color === 'black' && coordinate === 'g8') return this.kingSideCastle('black');
      if (selectedPiece.pieceObj.color === 'black' && coordinate === 'c8') return this.queenSideCastle('black');
  
      return false;
    }
  
    kingSideCastle(color) {
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
      const whiteToMove = this.state.whiteToMove;
  
      if (color === 'white') {
        boardMap.set('g1', { piece: 'K', color: 'white', moved: true });
        boardMap.set('f1', { piece: 'R', color: 'white', moved: true });
        boardMap.set('e1', { piece: '', color: '' });
        boardMap.set('h1', { piece: '', color: '' });
        
        if (this.isCheck(boardMap, whiteToMove)) {
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
  
      if (color === 'black') {
        boardMap.set('g8', { piece: 'K', color: 'black', moved: true });
        boardMap.set('f8', { piece: 'R', color: 'black', moved: true });
        boardMap.set('e8', { piece: '', color: '' });
        boardMap.set('h8', { piece: '', color: '' });
  
        if (this.isCheck(boardMap, whiteToMove)) {
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
  
      if (color === 'white') {
        boardMap.set('c1', { piece: 'K', color: 'white', moved: true });
        boardMap.set('d1', { piece: 'R', color: 'white', moved: true });
        boardMap.set('e1', { piece: '', color: '' });
        boardMap.set('a1', { piece: '', color: '' });
  
        if (this.isCheck(boardMap, whiteToMove)) {
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
  
      if (color === 'black') {
        boardMap.set('c8', { piece: 'K', color: 'black', moved: true });
        boardMap.set('d8', { piece: 'R', color: 'black', moved: true });
        boardMap.set('e8', { piece: '', color: '' });
        boardMap.set('a8', { piece: '', color: '' });
  
        if (this.isCheck(boardMap, whiteToMove)) {
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
  
    isEnPassant(coordinate) {
      console.log('isEnPassant()');
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
  
      if (!boardMap.get(coordinate).piece) {
        return true;
      }
  
      return false;
    }
  
    isPawnCapture(coordinate, selectedPiece) {
      console.log('isPawnCapture()');
      const file = coordinate.substring(0, 1);
      const selectedPieceFile = selectedPiece.coordinate.substring(0, 1);
  
      if (file !== selectedPieceFile) return true;
      return false;
    }
  
    canEnPassant(coordinate) {
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const indexOfFile = files.indexOf(file);
  
      const potentialPawnsEnPassant = [];
      const squareOne = '' + files[indexOfFile + 1] + rank;
      const squareTwo = '' + files[indexOfFile - 1] + rank;
  
      if (!squareOne.includes('undefined')) potentialPawnsEnPassant.push({ coordinate: squareOne, pieceObj: boardMap.get(squareOne) });
      if (!squareTwo.includes('undefined')) potentialPawnsEnPassant.push({ coordinate: squareTwo, pieceObj: boardMap.get(squareTwo) });
  
      const pawnsEnPassant = potentialPawnsEnPassant.filter(element => element.pieceObj.piece === 'P');
  
      return pawnsEnPassant;
    }
  
    isBigPawnPush(coordinate, piece) {
      const selectedPiece = piece;
      const selectedPieceCoordinate = selectedPiece.coordinate;
      const rank = Number.parseInt(coordinate.substring(1));
      const selectedPieceRank = Number.parseInt(selectedPieceCoordinate.substring(1));
  
      if (Math.abs(rank - selectedPieceRank) === 2) return true;
      return false;
  
    }
  
    getPieceInstance(pieceObj, coordinate) {
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
  
      switch (pieceObj.piece) {
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
  
    movePiece(coordinate, piece) {
      console.log("movePiece()");
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
      const selectedPiece = piece;
      const whiteToMove = this.state.whiteToMove;
  
      if (selectedPiece.pieceObj.piece === 'K' && !selectedPiece.pieceObj.moved) {
        if (this.isCastle(selectedPiece, coordinate)) return true;
      }
  
      const boardMapCopy = new Map(Array.from(boardMap));
      boardMapCopy.set(coordinate, selectedPiece.pieceObj);
      boardMapCopy.set(selectedPiece.coordinate, { piece: '', color: '' });
  
      if (this.isCheck(boardMapCopy, whiteToMove)) {
        this.unselect();
        return false;
      }
  
      if (selectedPiece.pieceObj.piece === 'K' || selectedPiece.pieceObj.piece === 'R' || selectedPiece.pieceObj.piece === 'P') {
        selectedPiece.pieceObj.moved = true;
      }
  
      if (selectedPiece.pieceObj.piece === 'P' && this.isPawnCapture(coordinate, selectedPiece)) {
        if (this.isEnPassant(coordinate)) {
          const file = coordinate.substring(0, 1);
          const rank = Number.parseInt(coordinate.substring(1));
          selectedPiece.pieceObj.enPassant = '';
          if (selectedPiece.pieceObj.color === 'white') {
            boardMap.set(file + (rank - 1), { piece: '', color: '' });
          }
          if (selectedPiece.pieceObj.color === 'black') {
            boardMap.set(file + (rank + 1), { piece: '', color: '' });
          }
        }
      }
  
      boardMap.set(coordinate, selectedPiece.pieceObj);
      boardMap.set(selectedPiece.coordinate, { piece: '', color: '' });
  
      if (selectedPiece.pieceObj.piece === 'P' && this.isBigPawnPush(coordinate, selectedPiece)) {
        const enPassantPawns = this.canEnPassant(coordinate);
  
        if (enPassantPawns.length > 0) {
          enPassantPawns.forEach(element => {
            element.pieceObj.enPassant = coordinate;
            boardMap.set(element.coordinate, element.pieceObj);
          });
        }
      }
  
      if (selectedPiece.pieceObj.piece === 'P' && (coordinate.substring(1) === '1' || coordinate.substring(1) === '8')) {
        boardMap.set(coordinate, { piece: 'PP', color: whiteToMove ? 'white' : 'black' });
        this.setState({
          history: history.concat([
            {
              board: boardMap
            }
          ]),
          selectedPiece: null
        });
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
  
      const isCheck = this.isCheck(boardMap, !whiteToMove);
      
      if (isCheck && this.isCheckmate(!whiteToMove)) {
  
        this.setState({
          history: history.concat([
            {
              board: boardMap
            }
          ]),
          selectedPiece: null
        });
        this.endGame();
      }
  
  
      return true;
    }
  
    handlePromotion(coordinate, piece) {
      console.log('handlePromotion');
      const history = this.state.history.slice(0, 1);
      const current = history[history.length - 1];
      const boardMap = current.board;
  
      boardMap.set(coordinate, piece);
      history[history.length - 1].board = boardMap;
  
      this.setState({
        history: history,
        selectedPiece: null
      });
      this.switchTurns();
    }
  
    render() {
      console.log('render()');
      
      const historyLength = this.state.history.length;
  
      const current = this.state.history[historyLength - 1];
      return (
        <div>
          <Board onClick={(coordinate, piece) => this.handleClick(coordinate, piece)}
            board={current.board}
            onPromote={(coordinate, piece) => this.handlePromotion(coordinate, piece)} />
          <button id="create-game" onClick={() => this.startGame()}>Create Game</button>
        </div>
      );
    }
  }

  export {Game};
  