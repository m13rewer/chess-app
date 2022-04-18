import './App.css';
import React from 'react';
import { PiecePicker, Pawn, Knight, Bishop, Rook, Queen, King, NoPiece } from './pieces';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import {
  PrivateRoute,
  User,
  Register,
  Login
} from './auth.js';
import io from 'socket.io-client';

import Game from './Game.js';

class Square extends React.Component {

  renderPiece(pieceObj) {

    const color = pieceObj.color;
    const pieceName = pieceObj.piece;
    const moved = pieceObj.moved;
    const enPassant = pieceObj.enPassant;

    const pieceMap =
      new Map([
        ['PP', <PiecePicker board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} onPromote={(coordinate, pieceObj) => this.props.onPromote(coordinate, pieceObj)} />],
        ['P', <Pawn board={this.props.board} color={color} moved={moved} coordinate={this.props.coordinate} enPassant={enPassant} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} />],
        ['N', <Knight board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} />],
        ['B', <Bishop board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} />],
        ['R', <Rook board={this.props.board} color={color} moved={moved} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} />],
        ['Q', <Queen board={this.props.board} color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} />],
        ['K', <King board={this.props.board} color={color} moved={moved} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} />],
        ['', <NoPiece color={color} coordinate={this.props.coordinate} onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)} />]
      ]);

    return (
      pieceMap.get(pieceName)
    );
  }

  render() {

    return (
      <div className={"overflow " + this.props.color + "-square square"} id={this.props.coordinate}>
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
        color={(bool) ? "light" : "dark"}
        coordinate={coordinate}
        piece={piece}
        board={this.props.board}
        onClick={(coordinate, pieceObj) => this.props.onClick(coordinate, pieceObj)}
        onPromote={(coordinate, pieceObj) => this.props.onPromote(coordinate, pieceObj)} />
    );
  }

  render() {
    const renderBoard = () => {
      console.log('renderBoard()');
      const board = this.props.board;
      let bool = false;
      let squares = [];
      let i = 0;

      for (const entry of board) {
        if (entry[0].substring(0, 1) === "a") bool = !bool;
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

      while (rank > 0) {
        ranks[i] = <div className={"rank-" + rank}>{squares.slice(start, end)}</div>;
        start = end;
        end += 8;
        rank--;
        i++;
      }

      return ranks;
    }

    return (
      <div id="board">{ranks(renderBoard())}</div>
    );
  }
}

const blankBoard = new Map([
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
]);


const boardCopy = new Map(Array.from(blankBoard));
const initialState =
{
  history: [
    {
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
    }
  ],
  player: { color: '', isMyTurn: false, status: '', opponent: '' },
  selectedPiece: null,
  //moves: [],
  //pieces: [],
  whiteToMove: true,
  matchObject: null,
  message: null,
  username: "",
  socket: null
  //socket: io('http://localhost:3000/')
}


function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Home() {

  return (
    <div>
      <Game user={User} />
    </div>
  );
}



export default App;
