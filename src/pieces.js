import React from 'react';

export function getLegalVector(potentialVector, props) {
    let vector = [];
    const boardMap = props.board;
    let pieceObj;
    for(let i = 0; i < potentialVector.length; i++) {
        pieceObj = boardMap.get(potentialVector[i]);

        if(pieceObj.piece && pieceObj.color === props.color) {
            return vector;
        }

        if(pieceObj.piece && pieceObj.color !== props.color) {
            vector[i] = potentialVector[i];
            return vector;
        }

        if(!pieceObj.piece) {
            vector[i] = potentialVector[i];
        }
    }

    return vector.filter(element => element);
}

export function vectorSquaresHit(potentialVector, props) {
  let vector = [];
  const boardMap = props.board;
  let pieceObj;
  
  for(let i = 0; i < potentialVector.length; i++) {
      pieceObj = boardMap.get(potentialVector[i]);

      if(pieceObj.piece) {
          vector[i] = potentialVector[i];
          return vector;
      }

      if(!pieceObj.piece) {
          vector[i] = potentialVector[i];
      }
  }

  return vector.filter(element => element);
}

class Pawn extends React.Component {
    squaresHit(coordinate) {
      const file = coordinate.substring(0, 1);
      const squaresHit = this.calculatePotentialMoves(coordinate).filter(element => !element.includes(file));
      console.log(file);
      console.log(this.calculatePotentialMoves(coordinate));
      console.log(squaresHit);
      return squaresHit;
    }
    getLegalMoves(coordinate, potentialMoves) {
      const boardMap = this.props.board;
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      let legalMoves = [];
      let pieceObj;

      if(this.props.color === 'white') {
        for(let i = 0; i < potentialMoves.length; i++) {
          pieceObj = boardMap.get(potentialMoves[i]);
  
          if(potentialMoves[i].substring(0, 1) !== file && pieceObj.piece) {
            if(pieceObj.color !== this.props.color) legalMoves[i] = potentialMoves[i];
            continue;
          }
  
          if(potentialMoves[i] === file + (Number.parseInt(rank)+1) && pieceObj.piece) {
            return legalMoves;
          }
  
          if(potentialMoves[i] === file + (Number.parseInt(rank)+1) && !pieceObj.piece) {
            legalMoves[i] = potentialMoves[i];
          }
  
          if(potentialMoves[i] === file + (Number.parseInt(rank)+2) && !pieceObj.piece) {
            legalMoves[i] = potentialMoves[i];
          }
        }
        const enPassant = this.props.enPassant;
        const enPassantFile = enPassant.substring(0, 1);
        const enPassantRank =  Number.parseInt(enPassant.substring(1));
        const captureSquare = enPassantFile + (enPassantRank+1);

        if(this.props.enPassant) legalMoves.push(captureSquare);
      }

      if(this.props.color === 'black') {
        for(let i = 0; i < potentialMoves.length; i++) {
          pieceObj = boardMap.get(potentialMoves[i]);
  
          if(potentialMoves[i].substring(0, 1) !== file && pieceObj.piece) {
            if(pieceObj.color !== this.props.color) legalMoves[i] = potentialMoves[i];
            continue;
          }
  
          if(potentialMoves[i] === file + (Number.parseInt(rank)-1) && pieceObj.piece) {
            return legalMoves;
          }
  
          if(potentialMoves[i] === file + (Number.parseInt(rank)-1) && !pieceObj.piece) {
            legalMoves[i] = potentialMoves[i];
          }
  
          if(potentialMoves[i] === file + (Number.parseInt(rank)-2) && !pieceObj.piece) {
            legalMoves[i] = potentialMoves[i];
          }
        }
        const enPassant = this.props.enPassant;
        const enPassantFile = enPassant.substring(0, 1);
        const enPassantRank =  Number.parseInt(enPassant.substring(1));
        const captureSquare = enPassantFile + (enPassantRank-1);

        if(this.props.enPassant) legalMoves.push(captureSquare);
  
        
      } 

      return legalMoves.filter(element => element);
    }
  
    calculatePotentialMoves(coordinate) {
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      let potentialMoves = [];
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const indexOfFile = files.indexOf(file);
      const indexOfRank = ranks.indexOf(rank);

      if(this.props.color === 'white') {
        potentialMoves[0] = '' + files[indexOfFile+1] + ranks[indexOfRank+1];
        potentialMoves[1] = '' + files[indexOfFile-1] + ranks[indexOfRank+1];
        potentialMoves[2] = '' + file + ranks[indexOfRank+1];
        if(!this.props.moved) potentialMoves[3] = '' + file + ranks[indexOfRank+2];
      }

      if(this.props.color === 'black') {
        potentialMoves[0] = '' + files[indexOfFile+1] + ranks[indexOfRank-1];
        potentialMoves[1] = '' + files[indexOfFile-1] + ranks[indexOfRank-1];
        potentialMoves[2] = '' + file + ranks[indexOfRank-1];
        if(!this.props.moved) potentialMoves[3] = '' + file + ranks[indexOfRank-2];
      }
  
      potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
      
      return potentialMoves;
    }
  
    handleClick(){
      console.log("handlePawnClick")
      const legalMoves = this.getLegalMoves(this.props.coordinate, this.calculatePotentialMoves(this.props.coordinate));
      console.log(legalMoves);
      this.props.onClick(this.props.coordinate, 
        {
          piece: 'P', color: this.props.color, legalMoves: legalMoves, moved: this.props.moved, enPassant: this.props.enPassant
        });
    }
  
    render() {
      return (
        <i onClick={()=>this.handleClick()} className={"fas fa-chess-pawn "+this.props.color}></i>
      );
    }
  }

  class Knight extends React.Component {
    squaresHit(coordinate) {
      return this.calculatePotentialMoves(coordinate);
    }

    getLegalMoves(potentialMoves) {
      const boardMap = this.props.board;
      let legalMoves = [];
      let pieceObj;

      for(let i = 0; i < potentialMoves.length; i++) {
        pieceObj = boardMap.get(potentialMoves[i]);

        if(!pieceObj.piece) {
          legalMoves[i] = potentialMoves[i];
        }

        if(pieceObj.piece && pieceObj.color !== this.props.color) {
          legalMoves[i] = potentialMoves[i];
        }
      } 

      return legalMoves.filter(element => element);
    }
  
    calculatePotentialMoves(coordinate) {
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      let potentialMoves = [];
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const indexOfFile = files.indexOf(file);
      const indexOfRank = ranks.indexOf(rank);
  
      potentialMoves[0] = '' + files[indexOfFile+1] + ranks[indexOfRank+2];
      potentialMoves[1] = '' + files[indexOfFile+1] + ranks[indexOfRank-2];
      potentialMoves[2] = '' + files[indexOfFile-1] + ranks[indexOfRank+2];
      potentialMoves[3] = '' + files[indexOfFile-1] + ranks[indexOfRank-2];
      potentialMoves[4] = '' + files[indexOfFile+2] + ranks[indexOfRank+1];
      potentialMoves[5] = '' + files[indexOfFile+2] + ranks[indexOfRank-1];
      potentialMoves[6] = '' + files[indexOfFile-2] + ranks[indexOfRank+1];
      potentialMoves[7] = '' + files[indexOfFile-2] + ranks[indexOfRank-1];

      console.log(potentialMoves);
  
      potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
      return potentialMoves;
    }
  
    handleClick(){
      const potentialMoves = this.getLegalMoves(this.calculatePotentialMoves(this.props.coordinate));
      this.props.onClick(this.props.coordinate, 
        {
          piece: 'N', color: this.props.color, legalMoves: potentialMoves
        });
    }
  
    render() {
      return (
        <i onClick={()=>this.handleClick()} className={"fas fa-chess-knight "+this.props.color}></i>
      );
    }
  }
  
  class Bishop extends React.Component {
    squaresHit(coordinate) {
      
      let potentialMoves = this.calculatePotentialMoves(coordinate);
      
      for(let i = 0; i < potentialMoves.length; i++) {
        potentialMoves[i] = vectorSquaresHit(potentialMoves[i], this.props);
      }

      const squaresHit = potentialMoves.filter(element => element.length > 0);
      console.log(squaresHit);
      return squaresHit;
    }

    getLegalMoves(potentialMoves) {

        for(let i = 0; i < potentialMoves.length; i++) {
            potentialMoves[i] = getLegalVector(potentialMoves[i], this.props);
        }

        const legalMoves = potentialMoves.filter(element => element.length > 0);
        console.log(legalMoves);
        return legalMoves;
  
    }
  
    calculatePotentialMoves(coordinate) {
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      let potentialMoves = [];
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const indexOfFile = files.indexOf(file);
      const indexOfRank = ranks.indexOf(rank);
  
      let traverseFiles = indexOfFile+1;
      let traverseRanks = indexOfRank+1;
      let vectorOne = [];
      let vectorTwo = [];
      let vectorThree = [];
      let vectorFour = [];
      
      let i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorOne[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks++;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorTwo[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles--;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile+1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorThree[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank+1;
  
      i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorFour[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles--;
        traverseRanks++;
        i++;
      }
  
      potentialMoves[0] = vectorOne;
      potentialMoves[1] = vectorTwo;
      potentialMoves[2] = vectorThree;
      potentialMoves[3] = vectorFour;
      
      return potentialMoves;
    }
  
    handleClick(){
      const legalMoves = this.getLegalMoves(this.calculatePotentialMoves(this.props.coordinate));
      this.props.onClick(this.props.coordinate, 
        {
          piece: 'B', color: this.props.color, legalMoves: legalMoves.flat()
        });
    }
  
    render() {
      return (
        <i onClick={()=>this.handleClick()} className={"fas fa-chess-bishop "+this.props.color}></i>
      );
    }
  }
  
  class Rook extends React.Component {
    squaresHit(coordinate) {
      let potentialMoves = this.calculatePotentialMoves(coordinate);
      for(let i = 0; i < potentialMoves.length; i++) {
        potentialMoves[i] = vectorSquaresHit(potentialMoves[i], this.props);
      }

      const squaresHit = potentialMoves.filter(element => element.length > 0);
      console.log(squaresHit);
      return squaresHit;
    }
    getLegalMoves(potentialMoves) {

        for(let i = 0; i < potentialMoves.length; i++) {
            potentialMoves[i] = getLegalVector(potentialMoves[i], this.props);
        }

        const legalMoves = potentialMoves.filter(element => element.length > 0);
        console.log(legalMoves);
        return legalMoves;
    }
  
    calculatePotentialMoves(coordinate) {
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      let potentialMoves = [];
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const indexOfFile = files.indexOf(file);
      const indexOfRank = ranks.indexOf(rank);
  
      let traverseFiles = indexOfFile+1;
      let traverseRanks = indexOfRank+1;
      let vectorOne = [];
      let vectorTwo = [];
      let vectorThree = [];
      let vectorFour = [];
  
      let i = 0;

      while(files[traverseFiles]) {
        vectorOne[i] = files[traverseFiles] + rank;
        traverseFiles++;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      i = 0;
      while(files[traverseFiles]) {
        vectorTwo[i] = files[traverseFiles] + rank;
        traverseFiles--;
        i++;
      }
  
      i = 0;
      while(ranks[traverseRanks]) {
        vectorThree[i] = file + ranks[traverseRanks];
        traverseRanks++;
        i++;
      }
  
      traverseRanks = indexOfRank-1;
      i = 0;
      while(ranks[traverseRanks]) {
        vectorFour[i] = file + ranks[traverseRanks];
        traverseRanks--;
        i++;
      }
  
      potentialMoves[0] = vectorOne;
      potentialMoves[1] = vectorTwo;
      potentialMoves[2] = vectorThree;
      potentialMoves[3] = vectorFour;
    
      return potentialMoves;
    }
  
    handleClick(){
      const legalMoves = this.getLegalMoves(this.calculatePotentialMoves(this.props.coordinate));
      this.props.onClick(this.props.coordinate, 
        {
          piece: 'R', color: this.props.color, legalMoves: legalMoves.flat()
        });
    }
  
    render() {
      return (
        // <p onClick={()=>this.handleClick()}>R</p>
        <i onClick={()=>this.handleClick()} className={"fas fa-chess-rook "+this.props.color}></i>
      );
    }
  }
  
  class Queen extends React.Component {
    squaresHit(coordinate) {
      let potentialMoves = this.calculatePotentialMoves(coordinate);
      for(let i = 0; i < potentialMoves.length; i++) {
        potentialMoves[i] = vectorSquaresHit(potentialMoves[i], this.props);
      }

      const squaresHit = potentialMoves.filter(element => element.length > 0);
      console.log(squaresHit);
      return squaresHit;
    }

    getLegalMoves(potentialMoves) {

      for(let i = 0; i < potentialMoves.length; i++) {
          potentialMoves[i] = getLegalVector(potentialMoves[i], this.props);
      }

      const legalMoves = potentialMoves.filter(element => element.length > 0);
      console.log(legalMoves);
      return legalMoves;
    }

    calculatePotentialMoves(coordinate) {
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      let potentialMoves = [];
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const indexOfFile = files.indexOf(file);
      const indexOfRank = ranks.indexOf(rank);
  
      let traverseFiles = indexOfFile+1;
      let traverseRanks = indexOfRank+1;
  
      let vectorOne = [];
      let vectorTwo = [];
      let vectorThree = [];
      let vectorFour = [];
      let vectorFive = [];
      let vectorSix = [];
      let vectorSeven = [];
      let vectorEight = [];
      
      let i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorOne[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks++;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorTwo[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles--;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile+1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorThree[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank+1;
  
      i = 0;
      while(files[traverseFiles] && ranks[traverseRanks]) {
        vectorFour[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles--;
        traverseRanks++;
        i++;
      }
  
      traverseFiles = indexOfFile+1;
      i = 0;
      while(files[traverseFiles]) {
        vectorFive[i] = files[traverseFiles] + rank;
        traverseFiles++;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      i = 0;
      while(files[traverseFiles]) {
        vectorSix[i] = files[traverseFiles] + rank;
        traverseFiles--;
        i++;
      }
  

      traverseRanks = indexOfRank+1;
      i = 0;
      while(ranks[traverseRanks]) {
        vectorSeven[i] = file + ranks[traverseRanks];
        traverseRanks++;
        i++;
      }
  
      traverseRanks = indexOfRank-1;
      i = 0;
      while(ranks[traverseRanks]) {
        vectorEight[i] = file + ranks[traverseRanks];
        traverseRanks--;
        i++;
      }
  
      potentialMoves[0] = vectorOne;
      potentialMoves[1] = vectorTwo;
      potentialMoves[2] = vectorThree;
      potentialMoves[3] = vectorFour;
      potentialMoves[4] = vectorFive;
      potentialMoves[5] = vectorSix;
      potentialMoves[6] = vectorSeven;
      potentialMoves[7] = vectorEight;
      
      return potentialMoves;
    }
  
    handleClick(){
      const legalMoves = this.getLegalMoves(this.calculatePotentialMoves(this.props.coordinate));
      this.props.onClick(this.props.coordinate, 
        {
          piece: 'Q', color: this.props.color, legalMoves: legalMoves.flat()
        });
    }
  
    render() {
      return (
        //<p onClick={()=>this.handleClick()}>Q</p>
        <i onClick={()=>this.handleClick()} className={"fas fa-chess-queen "+this.props.color}></i>
      );
    }
  }
  
  class King extends React.Component {
    squaresHit(coordinate) {
      //I think i can take out this filter
      const squaresHit = this.calculatePotentialMoves(coordinate).filter(element => !element.includes('Castle'));
      return squaresHit;
    }
    getLegalMoves(potentialMoves) {
      const allSquaresHit = this.getAllSquaresHit();
      const potentialMovesNotHit = potentialMoves.filter(element => !allSquaresHit.includes(element));
      
      const legalMovesWithoutCastles = potentialMovesNotHit.filter(element => this.props.board.get(element).color !== this.props.color);
      const castles = this.canCastle(this.props.color);
      const legalMoves = legalMovesWithoutCastles.concat(castles);
      return legalMoves;
    }
    
    canCastle(color) {
      let castles = [];
      const boardMap = this.props.board;
      if(this.props.moved) {
        return [];
      }
      if(color === 'white') {
        if(!boardMap.get('g1').piece && !boardMap.get('f1').piece && !boardMap.get('h1').moved) {
          castles[0] = 'g1';
        }
        if(!boardMap.get('b1').piece && !boardMap.get('c1').piece && !boardMap.get('a1').moved) {
          castles[1] = 'c1';
        }
        
        return castles;
      }

      if(color === 'black') {
        if(!boardMap.get('g8').piece && !boardMap.get('f8').piece && !boardMap.get('h8').moved) {
          castles[0] = 'g8';
        }
        if(!boardMap.get('b8').piece && !boardMap.get('c8').piece && !boardMap.get('a8').moved) {
          castles[1] = 'c8';
        }
        return castles;
      }

    }
    getAllSquaresHit() {
      const boardMap = this.props.board;
      let allSquaresHit = [];
      
      boardMap.forEach((value, key) => {
        if(value.piece && value.color !== this.props.color) {
          switch(value.piece){
            case 'P':

              allSquaresHit = allSquaresHit.concat(new Pawn({
                board: boardMap,
                color: value.color,
                moved: value.moved,
                coordinate: key
              }).squaresHit(key));
              
              break;
            case 'N':
              allSquaresHit = allSquaresHit.concat(new Knight({
                board: boardMap,
                color: value.color,
                coordinate: key
              }).squaresHit(key));
              break;
            case 'B':
              allSquaresHit = allSquaresHit.concat(new Bishop({
                board: boardMap,
                color: value.color,
                coordinate: key
              }).squaresHit(key).flat());
              break;
            case 'R':
              allSquaresHit = allSquaresHit.concat(new Rook({
                board: boardMap,
                color: value.color,
                coordinate: key
              }).squaresHit(key).flat());
              break;
            case 'Q':
              allSquaresHit = allSquaresHit.concat(new Queen({
                board: boardMap,
                color: value.color,
                coordinate: key
              }).squaresHit(key).flat());
              break;
            case 'K':
              allSquaresHit = allSquaresHit.concat(new King({
                board: boardMap,
                color: value.color,
                moved: value.moved,
                coordinate: key
              }).squaresHit(key));
              break;
          }
          
        }
      })
      console.log(allSquaresHit);
      return allSquaresHit;
    }
  
    calculatePotentialMoves(coordinate) {
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      
      let potentialMoves = [];
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const indexOfFile = files.indexOf(file);
      const indexOfRank = ranks.indexOf(rank);
      potentialMoves[0] = '' + file+ranks[indexOfRank+1];
      potentialMoves[1] = '' + file+ranks[indexOfRank-1];
      potentialMoves[2] = '' + files[indexOfFile+1]+ranks[indexOfRank+1];
      potentialMoves[3] = '' + files[indexOfFile+1]+ranks[indexOfRank-1];
      potentialMoves[4] = '' + files[indexOfFile-1]+ranks[indexOfRank-1];
      potentialMoves[5] = '' + files[indexOfFile-1]+ranks[indexOfRank+1];
      potentialMoves[6] = '' + files[indexOfFile+1]+rank;
      potentialMoves[7] = '' + files[indexOfFile-1]+rank;
      // potentialMoves[8] = 'K-Castle';
      // potentialMoves[9] = 'Q-Castle';
      potentialMoves = potentialMoves.filter(element => !element.includes('undefined'));
      
      console.log(potentialMoves);
      
      return potentialMoves;
    }
  
    handleClick(){
      const legalMoves = this.getLegalMoves(this.calculatePotentialMoves(this.props.coordinate));
      console.log(legalMoves);
      this.props.onClick(this.props.coordinate, 
        {
          piece: 'K', color: this.props.color, legalMoves: legalMoves
        });
    }
  
    render() {
      return (
        <i onClick={()=>this.handleClick()} className={"fas fa-chess-king "+this.props.color}></i>
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

  export {Pawn, Knight, Bishop, Rook, Queen, King, NoPiece};