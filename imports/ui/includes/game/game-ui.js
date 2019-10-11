/* Data:
 *  - pieces {Object}
 *  - history {Object}
 *  - turn {String}  'W' || 'B'
 *  - player_type_W {String}  'human' || 'computer'
 *  - player_type_B {String}  'human' || 'computer'
 */

import { isCheck, isCheckMate, isPate } from '../../../lib/chess-rules'
import './game-ui.html'
import './game-ui.less'

Template.GameUI.helpers({
  isCheck(color) {
    let instance = Template.instance()
    return isCheck(instance.data.pieces, instance.data.history, color)
  },
  isCheckMate(color) {
    let instance = Template.instance()
    return isCheckMate(instance.data.pieces, instance.data.history, color)
  },
  isPate(color) {
    let instance = Template.instance()
    return isPate(instance.data.pieces, instance.data.history, color)
  },
})
Template.GameUI.events({
  'change .game-ui .player-type input[type=radio]'(e, instance) {
    if (e.currentTarget.name === 'player-type-B') {
      instance.player_type_B.set(e.currentTarget.value)
    } else {
      instance.player_type_W.set(e.currentTarget.value)
    }
  },
})
