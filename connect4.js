/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7
const HEIGHT = 6
let currPlayer = 1 // active player: 1 or 2
const board = [] // array of rows, each row is array of cells  (board[y][x])
let gameOver = false
const resetBtn = document.querySelector('i')
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

resetBtn.addEventListener('click', function (e) {
  location.reload()
})

const makeBoard = () => {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = []
    for (let j = 0; j < WIDTH; j++) {
      board[i][j] = null
    }
  }
  return board
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')

  // TODO: add comment for this code
  // creates a new top <TR> element
  const top = document.createElement('tr')
  top.setAttribute('id', 'column-top')
  top.classList.add(`c${currPlayer}`)
  top.addEventListener('click', handleClick)
  // creates the rest of the table
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td')
    headCell.setAttribute('id', x)
    top.append(headCell)
  }
  htmlBoard.append(top)

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr')

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td')

      cell.setAttribute('id', `${y}-${x}`)

      row.append(cell)
    }
    htmlBoard.append(row)
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // return the y coordinate of the lowest available cell in column x
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (board[i][x] === null) {
      return i
    }
  }
  // if no cells are available, return null
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // Make a div and insert into correct table cell
  const pieceDiv = document.createElement('div')
  const currCell = document.getElementById(`${y}-${x}`)
  pieceDiv.classList.add('piece', `p${currPlayer}`)
  currCell.append(pieceDiv)
}

/** endGame: announce game end */

const endGame = (msg) => {
  // TODO: pop up alert message
  gameOver = true
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // check to see if game is over
  if (gameOver) return
  // get x from ID of clicked cell
  const x = +evt.target.id
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x)
  if (y === null) {
    return
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x)

  board[y][x] = currPlayer

  // check for win
  if (checkForWin()) {
    return endGame(`Game is over and Player ${currPlayer} won!`)
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board[0].every((cell) => cell !== null)) {
    return endGame(`Game is a tie!`)
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1)
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    )
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ]
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ]
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ]
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ]

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true
      }
    }
  }
}

makeBoard()
makeHtmlBoard()
