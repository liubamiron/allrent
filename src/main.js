import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
const app = createApp(App)
components.forEach(component => {
    app.component(component.name, component)
})
app.mount('#app');


//console.log(components);
//createApp(App).mount('#app')


import "bootstrap/dist/js/bootstrap.js"