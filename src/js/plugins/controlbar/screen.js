import {deepAssign, isObject, addClassName, removeClassName, $} from 'chimee-helper';
import {autobind} from 'toxic-decorators';
import Base from './base.js';

/**
 * Screen 配置
 */

const defaultOption = {
  tag: 'chimee-screen',
  html: `
    <chimee-screen-full>
      <svg t="1526281543273" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5194" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128">
        <path d="M422.648199 431.157895c5.67313 0 8.509695-2.836565 11.346261-5.67313 2.836565-2.836565 5.67313-8.509695 5.67313-11.346261V51.058172c0-2.836565 0-5.67313-2.836565-5.67313h-5.67313L306.34903 170.193906 141.828255 5.67313C138.99169 2.836565 133.31856 0 130.481994 0c-5.67313 0-11.34626 2.836565-14.182825 5.67313L5.67313 116.299169c-2.836565 2.836565-5.67313 8.509695-5.67313 11.34626 0 5.67313 2.836565 11.34626 5.67313 14.182826L170.193906 303.512465l-119.135734 119.135734c-2.836565 2.836565-2.836565 2.836565 0 5.673131 0 2.836565 2.836565 2.836565 5.67313 2.836565h365.916897z m0 156.01108c5.67313 0 8.509695 2.836565 11.346261 5.67313 2.836565 2.836565 5.67313 8.509695 5.67313 11.346261v365.916897c0 2.836565 0 5.67313-2.836565 5.67313h-5.67313L306.34903 850.969529 141.828255 1015.490305c-2.836565 2.836565-8.509695 5.67313-11.346261 5.67313-5.67313 0-8.509695-2.836565-11.34626-5.67313L8.509695 904.864266c-5.67313-2.836565-8.509695-8.509695-8.509695-11.34626s2.836565-8.509695 5.67313-11.346261L170.193906 717.65097l-119.135734-119.135735c-2.836565-2.836565-2.836565-2.836565 0-5.67313 0-2.836565 2.836565-2.836565 5.67313-2.836565l365.916897-2.836565z m175.867036-156.01108c-5.67313 0-8.509695-2.836565-11.34626-5.67313-2.836565-2.836565-5.67313-8.509695-5.67313-11.346261V51.058172c0-2.836565 0-5.67313 2.836565-5.67313h5.67313L714.814404 170.193906 879.33518 5.67313c2.836565-2.836565 8.509695-5.67313 11.34626-5.67313 5.67313 0 8.509695 2.836565 11.346261 5.67313l110.626039 110.626039c5.67313 2.836565 8.509695 8.509695 8.509695 11.34626 0 5.67313-2.836565 8.509695-5.67313 11.346261L850.969529 303.512465l119.135734 119.135734c2.836565 2.836565 2.836565 2.836565 0 5.673131 0 2.836565-2.836565 2.836565-5.67313 2.836565H598.515235z m0 156.01108c-5.67313 0-8.509695 2.836565-11.34626 5.67313-2.836565 2.836565-5.67313 8.509695-5.67313 11.346261v365.916897c0 2.836565 0 5.67313 2.836565 5.67313h5.67313l121.972299-121.972299 164.520776 164.520776c2.836565 2.836565 8.509695 5.67313 11.34626 5.67313 5.67313 0 8.509695-2.836565 11.346261-5.67313l110.626039-110.626039c2.836565-2.836565 5.67313-8.509695 5.67313-11.34626s-2.836565-8.509695-5.67313-11.346261L850.969529 717.65097l119.135734-119.135735c2.836565-2.836565 2.836565-2.836565 0-5.67313 0-2.836565-2.836565-2.836565-5.67313-2.836565l-365.916898-2.836565z" fill="#666666" p-id="5195"></path>
      </svg>
    </chimee-screen-full>
    <chimee-screen-small>
      <svg t="1526281555202" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5456" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128">
        <path d="M80.612481 67.388806c-3.90289 0.044002-7.80578 1.526773-10.770298 4.535293-2.986007 2.963495-4.468778 6.887874-4.468778 10.812254l0.151449 317.510424a5.143137 5.143137 0 0 0 3.140527 4.708232 5.119601 5.119601 0 0 0 5.559622-1.1328l107.331518-106.826004 143.902434 143.277194a15.263635 15.263635 0 0 0 10.813276 4.447288c4.185322 0 8.023744-1.700735 10.770298-4.447288l97.716532-97.276511c2.790556-2.747577 4.490268-6.583952 4.490268-10.857279 0-4.229325-1.699712-8.066723-4.490268-10.857278l-143.80522-143.18919L405.254326 74.233702c1.438769-1.394766 1.917676-3.575432 1.089821-5.582136-0.785899-1.961678-2.703575-3.13848-4.710279-3.13848l-321.021387 1.87572zM80.721975 958.482821c-3.924379 0.044002-7.848759-1.482771-10.83579-4.447289a15.303544 15.303544 0 0 1-4.51278-10.856256l0.151449-320.169996c0-2.004657 1.177825-3.924379 3.140527-4.709255 1.961678-0.827855 4.142343-0.304945 5.559622 1.089821l107.331518 106.867959 143.902434-143.319149a15.255449 15.255449 0 0 1 10.813276-4.447289c4.185322 0 8.023744 1.699712 10.770298 4.447289l97.716532 97.275487a15.288195 15.288195 0 0 1 4.490268 10.857279c0 4.228301-1.699712 8.109702-4.490268 10.856255L300.953841 845.11789l104.387466 103.947444a5.160533 5.160533 0 0 1 1.1328 5.582135c-0.827855 1.961678-2.703575 3.139503-4.708232 3.182482l-321.0439 0.65287zM943.237093 67.388806c3.924379 0.044002 7.804756 1.526773 10.770298 4.535293 3.00852 2.963495 4.490268 6.887874 4.490268 10.812254l-0.173962 317.510424a5.143137 5.143137 0 0 1-3.140527 4.708232c-1.961678 0.785899-4.142343 0.304945-5.53711-1.1328L842.2951 296.997228 698.401876 440.273399c-2.790556 2.746554-6.583952 4.447289-10.813277 4.447288s-8.022721-1.700735-10.813277-4.447288l-97.67253-97.276511c-2.790556-2.747577-4.492314-6.583952-4.492314-10.857279 0-4.229325 1.700735-8.065699 4.492314-10.812253l143.849223-143.234215L618.608551 74.233702c-1.439792-1.394766-1.918699-3.575432-1.090844-5.582136 0.785899-1.961678 2.703575-3.13848 4.710278-3.13848l321.009108 1.87572zM943.150112 958.482821c3.925403 0.044002 7.848759-1.482771 10.812254-4.447289 3.00852-3.007497 4.535293-6.932899 4.535293-10.856256l-0.173962-320.169996c0-2.004657-1.177825-3.924379-3.140527-4.709255-1.961678-0.827855-4.142343-0.304945-5.53711 1.089821L842.2951 726.257805 698.401876 582.938656c-2.790556-2.747577-6.583952-4.447289-10.813277-4.447289s-8.022721 1.699712-10.813277 4.447289l-97.67253 97.275487a15.292288 15.292288 0 0 0-4.492314 10.857279c0 4.228301 1.700735 8.109702 4.492314 10.856255l143.849223 143.18919-104.432491 103.947443a5.161556 5.161556 0 0 0-1.1328 5.582136c0.827855 1.961678 2.703575 3.139503 4.709255 3.182482l321.054133 0.653893z" p-id="5457"></path>
      </svg>
    </chimee-screen-small>
  `,
  defaultEvent: {
    click: 'click'
  }
};

class Screen extends Base {
  constructor (parent, option) {
    super(parent);
    this.state = 'small';
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    this.$dom = $(this.$dom);
    this.changeState(this.state);
    // addClassName(this.$dom, 'flex-item');
    this.$dom.addClass('chimee-flex-component');

    this.$full = this.$dom.find('chimee-screen-full');
    this.$small = this.$dom.find('chimee-screen-small');
    // 判断是否是默认或者用户提供 icon
    if(this.option.icon && this.option.icon.full && this.option.icon.small) {
      // if((!this.option.icon.play && this.option.icon.puase) || (this.option.icon.play && !this.option.icon.puase)) {
      //   console.warn(`Please provide a play and pause icon！If you can't, we will use default icon!`);
      // }
      this.$full.html(this.option.icon.full);
      this.$small.html(this.option.icon.small);
    }else if(this.option.bitmap) {
      this.$full.html('');
      this.$small.html('');
    }
  }

  changeState (state) {
    const removeState = state === 'small' ? 'full' : 'small';
    addClassName(this.parent.$dom, state);
    removeClassName(this.parent.$dom, removeState);
  }

  click () {
    let full = false;
    if(this.state === 'small') {
      this.state = 'full';
      full = true;
    }else{
      this.state = 'small';
      full = false;
    }
    this.changeState(this.state);
    this.parent.$fullscreen(full, 'container');
    if(full) {
      this.watch_screen = this.parent.$watch('isFullscreen', this.screenChange);
    }else{
      this.watch_screen();
    }
  }
  @autobind
  screenChange () {
    if(!this.parent.fullscreenElement) return;
    this.state = 'small';
    this.changeState('small');
    this.parent.$fullscreen(false, 'container');
  }
}
export default Screen