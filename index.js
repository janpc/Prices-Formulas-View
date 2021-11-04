import ReactiveComponent from './reactive-component';

class Main extends ReactiveComponent {}

document.querySelector('#root').innerHTML = Main.render();
