import { BOARD_LINES, BOARD_COLS, PIECES } from './constants'
import { getAvailablePositions } from './chess-rules'

/*
  - position {String} 'B4'
  - col_move {Int} 2 (when col_move>0: A->H)
  - line_move {Int} -1 (when line_move>0: W attack)
    => D3
*/
let getNewPosition = function(position, col_move, line_move) {
  let pos_idx = {
    col: BOARD_COLS.indexOf(position[0]) + col_move,
    line: BOARD_LINES.indexOf(position[1])+line_move
  }
  if (pos_idx.col < 0 || pos_idx.col > 7 || pos_idx.line < 0 || pos_idx.line > 7) {
    return null // Out of board
  }
  return BOARD_COLS[pos_idx.col] + BOARD_LINES[pos_idx.line]
}

let getAttackPositionsForwardDirections = function(pieces, position, color, directions, matches_pieces) {
  let attacked_by = []
  directions.forEach(direction => {
    let pos = position
    while (true) {
      pos = getNewPosition(pos, direction[0], direction[1])
      if (pos) {
        if (pieces[pos]) {
          if ((pieces[pos].color !== color) && (matches_pieces.indexOf(pieces[pos].type) !== -1)) {
            attacked_by.push(pos)
          }
          break
        }
      }
      else {
        break
      }
    }
  })
  return attacked_by
}

let getAttackPositionsFromPositions = function (pieces, position, color, positions, matches_pieces) {
  let attacked_by = []
  positions.forEach(pos => {
    let match_pos = getNewPosition(position, pos[0], pos[1])
    if (pieces[match_pos]) {
      if ((pieces[match_pos].color !== color) && (matches_pieces.indexOf(pieces[match_pos].type) !== -1)) {
        attacked_by.push(match_pos)
      }
    }
  })
  return attacked_by
}


let getAttackPositions = function(pieces, position, color) {
  // Faster to test all enemies pieces available position, look on all directions arround the targeted position
  return [
    ...getAttackPositionsForwardDirections(pieces, position, color, [[0,1], [0,-1], [1, 0], [-1,0]], [PIECES.QUEEN, PIECES.ROCK]),
    ...getAttackPositionsForwardDirections(pieces, position, color, [[1,1], [1,-1], [-1, -1], [-1,1]], [PIECES.QUEEN, PIECES.BISHOP]),
    ...getAttackPositionsFromPositions(pieces, position, color, [[2,1], [1,2], [-1, 2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1]], [PIECES.KNIGHT]),
    ...getAttackPositionsFromPositions(pieces, position, color, [[-1, (color) ? 1 : -1], [1, (color) ? 1 : -1]], [PIECES.PAWN]),
    ...getAttackPositionsFromPositions(pieces, position, color, [[1,1], [1,0], [1, -1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]], [PIECES.KING]),
  ]
}


// @TODO: En passant have to "Remove another position than new pos"
// @TODO:  Promotion
let movePiece = function(pieces, position, new_position, history) {
  // Dont move original
  pieces = JSON.parse(JSON.stringify(pieces))
  history = JSON.parse(JSON.stringify(history))

  pieces[new_position] = pieces[position]
  delete pieces[position]
  return {
    pieces: pieces,
    history: history,
  }
}



export { getNewPosition, getAttackPositions, movePiece }