import ReactiveComponent from './reactive-component.js';

class Main extends ReactiveComponent {}

document.querySelector('#root').innerHTML = Main.render();
