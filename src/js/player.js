import Chimee from 'chimee'
import hls from 'chimee-kernel-hls'
import pluginControlbar from './plugins/controlbar'

class Player {
  constructor(options) {
    console.log('----------------')
    console.log(options)
    console.log('------ End------')
    this.$options = { ...this.$options, ...options }
    this.$src = options.src
    this.$dom = document.querySelector(options.vm)
    this.installPlugin()
    this.created()
  }
  installPlugin() {
    let self = this
    self.$plugins = [] // 插件集合
    // 控制条
    Chimee.install(pluginControlbar)
    let Controlbar = {
      name: pluginControlbar.name,
      majorColor: self.$options.majorColor || '#b7b7b7', // #de698c
      hoverColor: self.$options.hoverColor || '#f56628', // #4c4c4c
      children: {
        // 播放按钮
        play: {
          icon: {
            play: '<svg t="1526284079117" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5579" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><defs><style type="text/css"></style></defs><path d="M928 512c0 35.2-20.352 65.92-50.624 82.624l0 0-624.704 415.36c-0.256 0.192-0.576 0.32-0.832 0.448l-0.384 0.256 0 0C236.096 1019.136 218.176 1024 199.04 1024c-56.896 0-103.04-43.008-103.04-96l0 0 0-832 0 0C96 43.008 142.144 0 199.04 0c19.136 0 37.056 4.864 52.416 13.376l0 0 0.384 0.192c0.256 0.192 0.512 0.32 0.832 0.448l624.704 415.36 0 0C907.648 446.08 928 476.8 928 512z" p-id="5580"></path></svg>',
            pause: '<svg t="1526284088102" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5702" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><defs><style type="text/css"></style></defs><path d="M133.019608 115.887686c0-59.843765 48.12298-108.411817 108.53898-108.411817 59.964235 0 108.662797 48.887634 108.662798 108.411817v796.357438a108.256209 108.256209 0 0 1-31.809255 76.783268A108.279634 108.279634 0 0 1 241.556915 1020.653595c-59.855477-0.105412-108.364967-48.558013-108.53898-108.408471V115.887686z m542.748444 0c0-59.843765 48.186562-108.411817 108.600889-108.411817 59.902327 0 108.532288 48.887634 108.532288 108.411817v796.357438A108.272941 108.272941 0 0 1 784.368941 1020.653595c-59.877229-0.065255-108.428549-48.534588-108.600889-108.408471V115.887686z m0 0" p-id="5703"></path></svg>'
          }
        },
        // 播放时间
        progressTime: {},
        // 进度条
        progressBar: {
          layout: 'top'
        },
        // 清晰度
        clarity: {
          list: self.$options.clarityList || [],
          width: '6em',
          duration: 0,
          increment: 0
        },
        // 倍数
        playbackrate: {
          list: [
            {name: '0.5x', value: 0.5},
            {name: '1.0x', value: 1, default: true},
            {name: '1.5x', value: 1.5},
            {name: '2.0x', value: 2}
          ]
        },
        // 音量
        volume: {
          layout: 'vertical'
        },
        // 全屏
        screen: {}
      }
    }
    self.$plugins.push(Controlbar)
    // 右键
    console.log('----------------')
    console.log('安装插件中')
    console.log('------ End------')
  }
  created() {
    console.log('----------------')
    console.log('开始创建播放器')
    console.log('------ End------')
    let self = this
    let plugins = self.$plugins
    let wrapper = document.createElement('div')
    wrapper.id = 'fui-player'
    wrapper.className = 'fui-player'
    
    let player = new Chimee({
      wrapper: wrapper,
      src: self.$src,
      plugin: plugins,
      kernels: {
        hls
      },
      crossOrigin: 'true',
      controls: true,
      autoplay: true
    })
    
    self.$dom.appendChild(wrapper)
  }
}
export default Player