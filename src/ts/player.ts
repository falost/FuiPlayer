import { Chimee } from 'chimee'
// import * as chimee from 'chimee'
import hls from 'chimee-kernel-hls'
// import pluginControlbar from 'chimee-plugin-controlbar'
// import pluginControlbar from './plugins/controlbar'

class Player {
  $dom
  $src
  $options
  public $plugins
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
    self.$plugins = []
    // Chimee.install(pluginControlbar)
    // let Controlbar = {
    //   name: pluginControlbar.name,
    //   majorColor: self.$options.majorColor || '#fff', // #de698c
    //   hoverColor: self.$options.hoverColor || '#de698c', // #4c4c4c
    //   children: {
    //     play: {},
    //     progressTime: {},
    //     progressBar: {},
    //     volume: {},
    //     screen: {},
    //     clarity: {}
    //   }
    // }
    // self.$plugins.push(Controlbar)
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