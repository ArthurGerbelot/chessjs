

let BOARD_LINES = ['1', '2', '3', '4', '5', '6', '7', '8']
let BOARD_COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
let PIECES = {
  'PAWN': 'PAWN',
  'ROCK': 'ROCK',
  'KNIGHT': 'KNIGHT',
  'BISHOP': 'BISHOP',
  'QUEEN': 'QUEEN',
  'KING': 'KING',
}

// let INITIAL_POSITION = {
//   A1: { type: PIECES.ROCK, color: true, already_moved: false },
//   B1: { type: PIECES.KNIGHT, color: true },
//   C1: { type: PIECES.BISHOP, color: true },
//   D1: { type: PIECES.QUEEN, color: true },
//   E1: { type: PIECES.KING, color: true, already_moved: false },
//   F1: { type: PIECES.BISHOP, color: true },
//   G1: { type: PIECES.KNIGHT, color: true },
//   H1: { type: PIECES.ROCK, color: true, already_moved: false },

//   A2: { type: PIECES.PAWN, color: true },
//   B2: { type: PIECES.PAWN, color: true },
//   C2: { type: PIECES.PAWN, color: true },
//   D2: { type: PIECES.PAWN, color: true },
//   E2: { type: PIECES.PAWN, color: true },
//   F2: { type: PIECES.PAWN, color: true },
//   G2: { type: PIECES.PAWN, color: true },
//   H2: { type: PIECES.PAWN, color: true },

//   A7: { type: PIECES.PAWN, color: false },
//   B7: { type: PIECES.PAWN, color: false },
//   C7: { type: PIECES.PAWN, color: false },
//   D7: { type: PIECES.PAWN, color: false },
//   E7: { type: PIECES.PAWN, color: false },
//   F7: { type: PIECES.PAWN, color: false },
//   G7: { type: PIECES.PAWN, color: false },
//   H7: { type: PIECES.PAWN, color: false },

//   A8: { type: PIECES.ROCK, color: false, already_moved: false },
//   B8: { type: PIECES.KNIGHT, color: false },
//   C8: { type: PIECES.BISHOP, color: false },
//   D8: { type: PIECES.QUEEN, color: false },
//   E8: { type: PIECES.KING, color: false, already_moved: false },
//   F8: { type: PIECES.BISHOP, color: false },
//   G8: { type: PIECES.KNIGHT, color: false },
//   H8: { type: PIECES.ROCK, color: false, already_moved: false },
// }

let INITIAL_POSITION = {
  E5: { type: PIECES.KING, color: true, already_moved: false },
  A1: { type: PIECES.ROCK, color: true, already_moved: false },


  D8: { type: PIECES.QUEEN, color: false },
  E8: { type: PIECES.KING, color: false, already_moved: false },
  F8: { type: PIECES.BISHOP, color: false },
  G8: { type: PIECES.KNIGHT, color: false },
  H8: { type: PIECES.ROCK, color: false, already_moved: false },
}

export { BOARD_LINES, BOARD_COLS, PIECES, INITIAL_POSITION }