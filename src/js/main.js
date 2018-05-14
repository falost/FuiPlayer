import 'babel-polyfill'

import Player from './player'
console.log('----------------')
console.log('hello falost')
console.log('------ End------')

class FuiPlayer extends Player {
  super(options) {

  }
}

// 暴露类

(function (global, factory) {
  if (global) {
    global.FuiPlayer = factory
  } else {
  }
})(window, FuiPlayer)
// export = FuiPlayer
// export default FuiPlayer