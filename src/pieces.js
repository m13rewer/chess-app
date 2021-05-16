import React from 'react';

export function getLegalVector(potentialVector, boardMap) {
    let vector = [];
    let pieceObj;
    for(let i = 0; potentialVector.length; i++) {
        pieceObj = boardMap.get(potentialVector[i]);

        if(pieceObj.piece && pieceObj.color === this.props.color) {
            return vector;
        }

        if(pieceObj.piece && pieceObj.color !== this.props.color) {
            vector[i] = potentialVector[i];
            continue;
        }

        if(!pieceObj.piece) {
            vector[i] = potentialVector[i];
        }
    }

    return vector;
}

class Pawn extends React.Component {

    calculateLegalMoves(coordinate) {
  
    }
  
    calculatePotentialMoves(coordinate) {
      const file = coordinate.substring(0, 1);
      const rank = coordinate.substring(1);
      let potentialMoves = [];
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const indexOfFile = files.indexOf(file);
      const indexOfRank = ranks.indexOf(rank);
  
      potentialMoves[0] = '' + files[indexOfFile+1] + rank;
      potentialMoves[1] = '' + files[indexOfFile-1] + rank;
      potentialMoves[2] = '' + file + ranks[indexOfRank+1];
      potentialMoves[3] = '' + file + ranks[indexOfRank+2];
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
    calculateLegalMoves(coordinate) {
  
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
    calculateLegalMoves(coordinate) {
  
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
      while(files[traverseFiles] || files[traverseRanks]) {
        vectorOne[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks++;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] || files[traverseRanks]) {
        vectorTwo[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles--;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile+1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] || files[traverseRanks]) {
        vectorThree[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank+1;
  
      i = 0;
      while(files[traverseFiles] || files[traverseRanks]) {
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
    calculateLegalMoves(potentialMoves) {
        const boardMap = this.props.board;

        for(let i = 0; i < potentialMoves.length; i++) {
            potentialMoves[i] = getLegalVector(potentialMoves[i], boardMap);
        }

        const legalMoves = potentialMoves.filter(element => element);
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
      while(files[traverseFiles]) {
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
  
    calculateLegalMoves(coordinate) {
  
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
      while(files[traverseFiles] || files[traverseRanks]) {
        vectorOne[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks++;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] || files[traverseRanks]) {
        vectorTwo[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles--;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile+1;
      traverseRanks = indexOfRank-1;
  
      i = 0;
      while(files[traverseFiles] || files[traverseRanks]) {
        vectorThree[i] = files[traverseFiles] + ranks[traverseRanks];
        traverseFiles++;
        traverseRanks--;
        i++;
      }
  
      traverseFiles = indexOfFile-1;
      traverseRanks = indexOfRank+1;
  
      i = 0;
      while(files[traverseFiles] || files[traverseRanks]) {
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
        vectorSix[i] = files[traverseFiles];
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
      while(files[traverseFiles]) {
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
  
    calculateLegalMoves(coordinate) {
  
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

  export {Pawn, Knight, Bishop, Rook, Queen, King, NoPiece};