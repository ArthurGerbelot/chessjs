/* Data:
 *  - pieces {Object}
 *  - turn {Boolean}
 *  (- select_position {String} Position Ex: 'A1', 'B5')
 *  (- available_positions {Array} Position available (ui) Ex: ['A1', 'B5'])
 *  (- onClickCase)
 */

import './game-board.html';
import './game-board.less';

import { BOARD_LINES, BOARD_COLS, PIECES } from '../../../lib/constants'
import { movePiece } from '../../../lib/chess-utils'

Template.GameBoard.onCreated(function() {
  let instance = this
  instance.view_as_white = new ReactiveVar(true)
})

Template.GameBoard.helpers({
  getLine() {
    if (Template.instance().view_as_white.get()) {
      return BOARD_LINES.slice().reverse()
    }
    return BOARD_LINES
  },
  getCol() {
    if (!Template.instance().view_as_white.get()) {
      return BOARD_COLS.slice().reverse()
    }
    return BOARD_COLS
  },
  getPiece(col, line) {
    let instance = Template.instance()
    return instance.data.pieces[col+line] || null
  },
  displayPiece(piece, col, line) {
    if (!piece) { // When refresh isn't done fast enough
      return
    }
    // Use only plain pieces
    if (piece.type === PIECES.KING) { return "&#9818;" }
    if (piece.type === PIECES.QUEEN) { return "&#9819;" }
    if (piece.type === PIECES.ROCK) { return "&#9820;" }
    if (piece.type === PIECES.BISHOP) { return "&#9821;" }
    if (piece.type === PIECES.KNIGHT) { return "&#9822;" }
    if (piece.type === PIECES.PAWN) { return "&#9823;" }

    // Use bordered for white and plain for black
    // if (piece.type === PIECES.KING && piece.color === true) { return "&#9812;" }
    // if (piece.type === PIECES.QUEEN && piece.color === true) { return "&#9813;" }
    // if (piece.type === PIECES.ROCK && piece.color === true) { return "&#9814;" }
    // if (piece.type === PIECES.BISHOP && piece.color === true) { return "&#9815;" }
    // if (piece.type === PIECES.KNIGHT && piece.color === true) { return "&#9816;" }
    // if (piece.type === PIECES.PAWN && piece.color === true) { return "&#9817;" }
    // if (piece.type === PIECES.KING && piece.color === false) { return "&#9818;" }
    // if (piece.type === PIECES.QUEEN && piece.color === false) { return "&#9819;" }
    // if (piece.type === PIECES.ROCK && piece.color === false) { return "&#9820;" }
    // if (piece.type === PIECES.BISHOP && piece.color === false) { return "&#9821;" }
    // if (piece.type === PIECES.KNIGHT && piece.color === false) { return "&#9822;" }
    // if (piece.type === PIECES.PAWN && piece.color === false) { return "&#9823;" }
  },
  isSelectedCase(col, line) {
    return (Template.instance().data.select_position === col + line)
  },
  isInAvailableCase(col, line) {
    return (Template.instance().data.available_positions.indexOf(col + line) !== -1)
  },
})
Template.GameBoard.events({
  'click .reverse-view'(e, instance) {
    e.preventDefault()
    instance.view_as_white.set(!instance.view_as_white.get())
  },

  'click .board-case'(e, instance) {
    let position = e.currentTarget.getAttribute('data-position')
    instance.data.onClickCase(position)
  },

})
