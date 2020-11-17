// import something here
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, Vue}) => {
  // something to do
  Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
}
