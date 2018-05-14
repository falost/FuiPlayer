import {deepAssign, isObject, formatTime, $, addEvent, removeEvent, setStyle} from 'chimee-helper';
import {autobind} from 'toxic-decorators';
import Base from './base.js';

const defaultOption = {
  tag: 'chimee-progressbar',
  html: `
    <chimee-progressbar-wrap>
      <chimee-progressbar-bg class="chimee-progressbar-line"></chimee-progressbar-bg>
      <chimee-progressbar-buffer class="chimee-progressbar-line"></chimee-progressbar-buffer>
      <chimee-progressbar-all class="chimee-progressbar-line">
        <chimee-progressbar-ball></chimee-progressbar-ball>
      </chimee-progressbar-all>
      <chimee-progressbar-tip></chimee-progressbar-tip>
    </chimee-progressbar-wrap>
  `
};

export default class ProgressBar extends Base {
  constructor (parent, option) {
    super(parent);
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.visiable = option !== false;
    this.init();
  }

  init () {
    super.create();
    let self = this
    // 延迟加载，否则获取不到元素高度
    setTimeout(() => {
      self.$dom = $(self.$dom);
      self.$wrap = self.$dom.find('chimee-progressbar-wrap');
      self.$buffer = self.$dom.find('chimee-progressbar-buffer');
      self.$all = self.$dom.find('chimee-progressbar-all');
      self.$tip = self.$dom.find('chimee-progressbar-tip');
      self.$track = self.$dom.find('chimee-progressbar-track');
      self.$line = self.$dom.find('.chimee-progressbar-line');
      self.$ball = self.$dom.find('chimee-progressbar-ball');
      self.$dom.addClass('chimee-flex-component');

      // css 配置
      !self.visiable && self.$dom.css('visibility', 'hidden');
      // self.$line.css({
      //   top: self.$wrap.
      // });
      // 进度条居中布局，还是在上方
      if(self.option.layout === 'top') {
        self.$dom.addClass('progressbar-layout-top');
        self.$wrap.css({
          // left: -self.$dom[0].offsetLeft + 'px',
          top: -self.$ball[0].offsetHeight + 'px',
          // height: self.$ball[0].offsetHeight * 2 + 'px'
        });
        // self.$line.css({
        //   top: self.$ball[0].offsetHeight + 'px'
        // })
        setStyle(self.parent.$wrap, 'paddingTop', self.$ball[0].offsetHeight + 'px');
      }
      self.addWrapEvent();
    }, 500);
  }
  destroy () {
    this.removeWrapEvent();
    // 解绑全屏监听事件
    this.watch_screen && this.watch_screen();
    super.destroy();
  }
  addWrapEvent () {
    this.$wrap.on('mousedown', this.mousedown);
    this.$wrap.on('mousemove', this.tipShow);
    this.$wrap.on('mouseleave', this.tipEnd);
  }
  removeWrapEvent () {
    this.$wrap.off('mousedown', this.mousedown);
    this.$wrap.off('mousemove', this.tipShow);
    this.$wrap.off('mouseleave', this.tipEnd);
  }

  /**
   * 缓存进度条更新 progress 事件
   */
  progress () {
    let buffer = 0;
    try{
      buffer = this.parent.buffered.end(0);
    }catch (e) {}
    const bufferWidth = buffer / this.parent.duration * 100 + '%';
    this.$buffer.css('width', bufferWidth);
  }

  /**
   * requestAnimationFrame 来更新进度条, timeupdate 事件
   */
  update () {
    // const allWidth = this.$wrap[0].offsetWidth - this.$ball[0].offsetWidth;
    const time = this._currentTime !== undefined ? this._currentTime : this.parent.currentTime;
    const timePer = time ? time / this.parent.duration : 0;
    // const timeWidth = timePer * allWidth;
    this.$all.css('width', `calc(${timePer * 100}% - ${this.$ball[0].offsetWidth / 2}px`);
  }
  @autobind
  mousedown (e) {
    // const ballRect = this.$ball[0].getClientRects()[0];
    // const ballLeft = ballRect.left;
    // const ballRight = ballRect.left + ballRect.width;
    // this.inBall = e.clientX <= ballRight && e.clientX >= ballLeft;
    if(e.target === this.$tip[0]) return;
    this._currentTime = e.offsetX / this.$wrap[0].offsetWidth * this.parent.duration;
    // if(!this.inBall) this.update();
    this.startX = e.clientX;
    this.startTime = this._currentTime;
    addEvent(window, 'mousemove', this.draging);
    addEvent(window, 'mouseup', this.dragEnd);
    addEvent(window, 'contextmenu', this.dragEnd);
  }

  /**
   * 开始拖拽
   * @param {EventObject} e 鼠标事件
   */
  @autobind
  draging (e) {
    this.endX = e.clientX;
    const dragTime = (this.endX - this.startX) / this.$wrap[0].offsetWidth * this.parent.duration;
    const dragAfterTime = +(this.startTime + dragTime).toFixed(2);
    this._currentTime = dragAfterTime < 0 ? 0 : dragAfterTime > this.parent.duration ? this.parent.duration : dragAfterTime;
    this.update();
  }

  /**
   * 结束拖拽
   */
  @autobind
  dragEnd () {
    this.update();
    this.startX = 0;
    this.startTime = 0;
    // if(!this.inBall) {
    this.parent.currentTime = this._currentTime;
    // this.inBall = false;
    // }
    this._currentTime = undefined;
    removeEvent(window, 'mousemove', this.draging);
    removeEvent(window, 'mouseup', this.dragEnd);
    removeEvent(window, 'contextmenu', this.dragEnd);
  }

  @autobind
  tipShow (e) {
    if(e.target === this.$tip[0] || e.target === this.$ball[0]) {
      this.$tip.css('display', 'none');
      return;
    };
    let time = e.offsetX / this.$wrap[0].offsetWidth * this.parent.duration;
    time = time < 0 ? 0 : time > this.parent.duration ? this.parent.duration : time;
    const tipContent = formatTime(time);
    let left = e.offsetX - this.$tip[0].offsetWidth / 2;
    const leftBound = this.$wrap[0].offsetWidth - this.$tip[0].offsetWidth;
    left = left < 0 ? 0 : left > leftBound ? leftBound : left;
    this.$tip.text(tipContent);
    this.$tip.css('display', 'inline-block');
    this.$tip.css('left', `${left}px`);
  }
  @autobind
  tipEnd () {
    this.$tip.css('display', 'none');
  }
}
