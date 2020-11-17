// import something here
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue }) => {
  // something to do
  Vue.use(VueVideoPlayer)
}
