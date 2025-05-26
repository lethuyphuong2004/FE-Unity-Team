import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoon, faSun, faKeyboard, faBars, faTimes, faArrowLeft  } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons'


library.add(faMoon, faSun, faKeyboard, faBars, faTimes, faArrowLeft, faFacebookF, faInstagram, faLinkedinIn, faYoutube)


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
