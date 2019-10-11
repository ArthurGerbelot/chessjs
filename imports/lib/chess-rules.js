import { PIECES } from './constants'
import { getNewPosition, getAttackPositions, movePiece } from './chess-utils'


let isCheck = function(pieces, history, color) {
  let king_position = null
  let positions = Object.keys(pieces)

  for (let idx=0; idx<positions.length; idx++) {
    let position = positions[idx]
    if ((pieces[position].type === PIECES.KING) && (pieces[position].color === color)) {
      king_position = position
      break
    }
  }
  return (getAttackPositions(pieces, king_position, color).length > 0)
}

let isCheckMate = function(pieces, history, color) {
  if (!isCheck(pieces, history, color)) {
    return false
  }

  // Do I have a solution ?
  let positions = Object.keys(pieces)
  for (let i=0; i<positions.length; i++) {
    let position = positions[i]
    if (pieces[position].color === color) {
      if (getAvailablePositions(position, pieces, history).length > 0) {
        return false
      }
    }
  }
  return true
}
let isPate = function(pieces, history, color) {
  if (isCheck(pieces, history, color)) {
    return false
  }
  // Do I have a solution ?
  let positions = getAllAvailablePositions(pieces, history, color)
  return (Object.keys(positions).length === 0)
}

// @TODO !EVERY MOVE HAVE TO TEST "DO I PUT MY KING IN DANGER ?!"
let getAvailablePositions = function(position, pieces, history) {
  let piece = pieces[position] || null

  if (!piece) {
    throw Meteor.Error("getAvailablePositions - Not piece at " + position)
    return
  }

  let positions = []

  let isEmptyOrEnemy = function(pos) {
    return (pos && (!pieces[pos] || (pieces[pos].color !== piece.color)))
  }
  // test all case on direction
  let testForward = function(directions) {
    directions.forEach(direction => {
      let pos = position
      while (true) {
        pos = getNewPosition(pos, direction[0], direction[1])
        if (pos) {
          if (isEmptyOrEnemy(pos)) {
            positions.push(pos)
          }
          if (pieces[pos]) {
            break
          }
        }
        else {
          break
        }
      }
    })

  }
  if (piece.type === PIECES.PAWN) {
    let forward_pos = getNewPosition(position, 0, piece.color ? 1 : -1)
    if (!pieces[forward_pos]) {
      positions.push(forward_pos)

      // "First-Double" ?
      if (((piece.color) && position[1] === "2") || ((!piece.color) && position[1] === "7")) {
         let forward_2_pos = getNewPosition(forward_pos, 0, (piece.color) ? 1 : -1)
         if (!pieces[forward_2_pos]) {
           positions.push(forward_2_pos)
         }
      }
    }

    // Eat ?
    let eat_1_pos = getNewPosition(position, 1, (piece.color) ? 1 : -1)
    let eat_2_pos = getNewPosition(position, -1, (piece.color) ? 1 : -1)

    if (eat_1_pos && pieces[eat_1_pos] && (pieces[eat_1_pos].color !== piece.color)) {
      positions.push(eat_1_pos)
    }
    if (eat_2_pos && pieces[eat_2_pos] && (pieces[eat_2_pos].color !== piece.color)) {
      positions.push(eat_2_pos)
    }

    // @TODO: Prise en passant

  }
  else if (piece.type === PIECES.BISHOP || piece.type === PIECES.ROCK || piece.type === PIECES.QUEEN) {
    if (piece.type === PIECES.ROCK || piece.type === PIECES.QUEEN) {
      testForward([[0,1], [0,-1], [1, 0], [-1,0]])
    }
    if (piece.type === PIECES.BISHOP || piece.type === PIECES.QUEEN) {
      testForward([[1,1], [1,-1], [-1, -1], [-1,1]])
    }
  }
  else if (piece.type === PIECES.KNIGHT) {
    // clock sorting
    let knight_moves = [[2,1], [1,2], [-1, 2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1]]
    knight_moves.forEach(knight_move => {
      let pos = getNewPosition(position, knight_move[0],knight_move[1])
      if (isEmptyOrEnemy(pos)) {
        positions.push(pos)
      }
    })
  }
  else if (piece.type === PIECES.KING) {
    let king_moves = [[1,1], [1,0], [1, -1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]]
    king_moves.forEach(king_move => {
      let pos = getNewPosition(position, king_move[0],king_move[1])
      if (isEmptyOrEnemy(pos)) {
        positions.push(pos)
      }
    })

    // @TODO: Rock
  }

  // If I'm check on new position, I can't
  return positions
  .filter(new_pos => {
    let moved = movePiece(pieces, position, new_pos, history)
    return !isCheck(moved.pieces, moved.history, piece.color)
  })
}


let getAllAvailablePositions = function(pieces, history, color) {
  let available = {}

  let positions = Object.keys(pieces)
  for (let i=0; i<positions.length; i++) {
    let position = positions[i]
    if (pieces[position].color === color) {
      let piece_available = getAvailablePositions(position, pieces, history)
      if (piece_available.length) {
        available[position] = piece_available
      }
    }
  }

  return available
}

export { isCheck, isCheckMate, isPate, getAvailablePositions }