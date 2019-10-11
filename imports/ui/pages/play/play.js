import { BOARD_LINES, BOARD_COLS, PIECES, INITIAL_POSITION } from '../../../lib/constants'
import { getAvailablePositions } from '../../../lib/chess-rules'
import { movePiece } from '../../../lib/chess-utils'

import '../../includes/game/game-board';
import '../../includes/game/game-ui';
import '../../includes/game/game-panel';

import './play.html';
// import './play.less';

Template.Play.onCreated(function() {
  let instance = this

  instance.pieces = new ReactiveVar(JSON.parse(JSON.stringify(INITIAL_POSITION)))
  instance.history = new ReactiveVar([])
  instance.turn = new ReactiveVar(true)

  instance.player_type_W = new ReactiveVar('human')
  instance.player_type_B = new ReactiveVar('human')

  // Flow
  instance.select_position = new ReactiveVar(null)
  instance.available_positions = new ReactiveVar([])

  // Panel
  instance.is_game_panel_displayed = new ReactiveVar(true)
})


Template.Play.helpers({
  getGameBoardContext() {
    let instance = Template.instance()
    return {
      pieces: instance.pieces.get(),
      turn: instance.turn.get(),
      select_position: instance.select_position.get(),
      available_positions: instance.available_positions.get(),
      onClickCase(position) {
        // Move ?
        if (instance.select_position.get() && instance.available_positions.get().indexOf(position) !== -1) {
          return move(instance, position)
        }
        // Unselect
        if (instance.select_position.get() === position) {
          return unSelect(instance)
        }
        // Select ?
        let piece =  instance.pieces.get()[position] || null
        if (piece && (piece.color === instance.turn.get()) && getColorType(instance, piece.color) === 'human' ) {
          return selectPiece(instance, position, piece)
        }
      },
    }
  },
  getGameUIContext() {
    let instance = Template.instance()
    return {
      pieces: instance.pieces.get(),
      history: instance.history.get(),
      turn: instance.turn.get(),
      player_type_W: instance.player_type_W.get(),
      player_type_B: instance.player_type_B.get(),
    }
  },
})

let getColorType = function(instance, color) {
  if (color) {
    return instance.player_type_W.get()
  }
  return instance.player_type_B.get()
}

let selectPiece = function(instance, position, piece) {
  if (instance.select_position.get() === position) {
    unSelect(instance)
    return // Skip: Select the same, don't recompute
  }
  instance.select_position.set(position)
  instance.available_positions.set(getAvailablePositions(position, instance.pieces.get(), instance.history.get()))
}

let unSelect = function(instance) {
  instance.select_position.set(null)
  instance.available_positions.set([])
}

let move = function(instance, new_position) {
  let moved =  movePiece(instance.pieces.get(), instance.select_position.get(), new_position, instance.history.get())

  instance.pieces.set(moved.pieces)
  instance.history.set(moved.history)

  console.log("instance.pieces", instance.pieces.get())

  instance.turn.set(!instance.turn.get())
  unSelect(instance)
}