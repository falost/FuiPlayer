import {deepAssign, isObject, addClassName, removeClassName, $} from 'chimee-helper';
import Base from './base.js';

/**
 * play 配置
 */

const defaultOption = {
  tag: 'chimee-control-state',
  html: `
    <chimee-control-state-play></chimee-control-state-play>
    <chimee-control-state-pause></chimee-control-state-pause>
  `,
  animate: {
    icon: `
      <svg viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g fill="#ffffff" stroke="#ffffff">
          <path class="left"></path>
          <path class="right"></path>
        </g>
      </svg>
    `,
    path: {
      play: {
        left: 'M0.921875,0.265625L0.921875,197.074852L95.7890625,149L96.2929688,49Z',
        // right: 'M928 512c0 35.2-20.352 65.92-50.624 82.624l0 0-624.704 415.36c-0.256 0.192-0.576 0.32-0.832 0.448l-0.384 0.256 0 0C236.096 1019.136 218.176 1024 199.04 1024c-56.896 0-103.04-43.008-103.04-96l0 0 0-832 0 0C96 43.008 142.144 0 199.04 0c19.136 0 37.056 4.864 52.416 13.376l0 0 0.384 0.192c0.256 0.192 0.512 0.32 0.832 0.448l624.704 415.36 0 0C907.648 446.08 928 476.8 928 512z'
        right: 'M90.3142151,45.9315226L90.3142151,151.774115L201.600944,99.9938782L201.600944,98.0237571Z'
      },
      pause: {
        left: 'M0.921875,1.265625L0.921875,198.074852L79.3611677,198.074852L79.3611677,0.258923126Z',
        // right: 'M133.019608 115.887686c0-59.843765 48.12298-108.411817 108.53898-108.411817 59.964235 0 108.662797 48.887634 108.662798 108.411817v796.357438a108.256209 108.256209 0 0 1-31.809255 76.783268A108.279634 108.279634 0 0 1 241.556915 1020.653595c-59.855477-0.105412-108.364967-48.558013-108.53898-108.408471V115.887686z m542.748444 0c0-59.843765 48.186562-108.411817 108.600889-108.411817 59.902327 0 108.532288 48.887634 108.532288 108.411817v796.357438A108.272941 108.272941 0 0 1 784.368941 1020.653595c-59.877229-0.065255-108.428549-48.534588-108.600889-108.408471V115.887686z m0 0'
        right: 'M126.921875,1.265625L126.921875,198.074852L205.361168,198.074852L205.361168,0.258923126Z'
      }
    }
  },
  defaultEvent: {
    click: 'click'
  }
};

export default class Play extends Base {
  constructor (parent, option) {
    super(parent);
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.animate = false;
    this.init();
  }

  init () {
    // 创建 html ／ 绑定事件
    super.create();
    this.$dom = $(this.$dom);
    this.$dom.addClass('chimee-flex-component');

    // 判断是否是默认或者用户提供 icon
    if(this.option.icon && this.option.icon.play && this.option.icon.pause) {
      this.$play = this.$dom.find('chimee-control-state-play');
      this.$pause = this.$dom.find('chimee-control-state-pause');
      this.$play.html(this.option.icon.play);
      this.$pause.html(this.option.icon.pause);
    }else if(!this.option.bitmap) {
      this.animate = true;
      this.option.animate.path = this.option.path ? this.option.path : this.option.animate.path;
      this.$dom.html(this.option.animate.icon);
      this.$left = this.$dom.find('.left');
      this.$right = this.$dom.find('.right');
    }
    this.changeState('pause');
  }

  changeState (state) {
    const nextState = state === 'play' ? 'pause' : 'play';
    this.state = state;
    addClassName(this.parent.$dom, nextState);
    removeClassName(this.parent.$dom, state);
    this.animate && this.setPath(nextState);
  }

  setPath (state) {
    const path = this.option.animate.path;
    if(state === 'play') {
      this.$left.attr('d', path.play.left);
      this.$right.attr('d', path.play.right);
    }else{
      this.$left.attr('d', path.pause.left);
      this.$right.attr('d', path.pause.right);
    }
  }

  click (e) {
    const nextState = this.state === 'play' ? 'pause' : 'play';
    this.changeState(nextState);
    this.parent.$emit(nextState);
  }
}
