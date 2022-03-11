import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
import VIntersection from "@/directives/VIntersection";
import directives from '@/directives';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.directive('intersection', VIntersection)

app
    .use(router)
    .mount('#app');


//console.log(components);
//createApp(App).mount('#app')


import "bootstrap/dist/js/bootstrap.js"
import router from "@/router/router";