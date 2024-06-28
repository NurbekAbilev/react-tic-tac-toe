import { useState } from 'react';
import './App.css';
// import MyButton from './MyButton';

function App() {
  return (
    <>
      <TickTackToe/>
    </>
  );
}

function TickTackToe() {
  let [matrix, setMatrix] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])

  let [turn, setTurn] = useState(false) // false = X turn, true = 0 turn

  function clickHandler(row, col) {
    return function() {
      if ((matrix[row][col] === 1 && turn) || (matrix[row][col] === 0 && !turn)) {
        return
      }

      let val = 1
      if (turn) {
        val = 0
        turn = setTurn(false)
      } else {
        turn = setTurn(true)
      }

      const newMatrix = matrix.map(row => row.slice())
      newMatrix[row][col] = val
      
      checkMatrix(newMatrix, turn)
      setMatrix(newMatrix)
    }
  }

  const grid = matrix.map((row, rowIndex) => {

    return (<div class='grid-row' key={rowIndex}>
      {row.map((cell, collIndex) => {
        return <Square key={rowIndex*3+collIndex} value={matrix[rowIndex][collIndex]} onClick={clickHandler(rowIndex, collIndex)}></Square>
      })}
    </div>
    )
  }) 


  return (
    <>
      {grid}
    </>
  )
}

function checkMatrix(matrix, turn) {
  // horizontal
  for(let i=0;i<3;i++) {
    // debugger;
    let checkVal = matrix[i][0]
    let validCount = 0
    for(let j=0;j<3;j++) {
      if (matrix[i][j] === checkVal && matrix[i][j] !== null) {
        validCount++
      }
    }
    if (validCount === 3) {
      alertWon(turn)
      return
    }
  }

  // vertical
  for(let i=0;i<3;i++) {
    // debugger;
    let checkVal = matrix[0][i]
    let validCount = 0
    for(let j=0;j<3;j++) {
      if (matrix[j][i] === checkVal && matrix[j][i] !== null) {
        validCount++
      }
    }
    if (validCount === 3) {
      alertWon(turn)
      return
    }
  }
  // diagonal
  let val = matrix[0][0]
  if (val === null) {
    return
  }

  if (val === matrix[1][1] && val === matrix[2][2]) {
    alertWon(turn)
  }
}

function alertWon(turn) {
  alert(!turn?'X WON!':'0 WON')
}

function Square({value, onClick}) {
  let text = ''
  // debugger;
  if (value != null) {
    text = value === 1 ? 'X':'0'
  }

  const styles = {
    // display:'inline-block',
    width: '50px',
    height: '50px',
    margin: 0,
    padding: 0,
  }

  return (
    <button style={styles} onClick={onClick}>{text}</button>
  )
}

export default App;

