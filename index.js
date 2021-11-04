import ReactiveComponent from './reactive-component.js';

import SideBar from './components/SideBar.js';

class Main extends ReactiveComponent {
  render() {
    this.content = '<main ></main>';
    super.render();
    this.addComponent(SideBar);
  }
}

const root = document.querySelector('#root');
const main = new Main({}, root, 'main');
main.render();
