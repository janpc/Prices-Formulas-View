import ReactiveComponent from './reactive-component.js';

import SideBar from './components/SideBar.js';

class Main extends ReactiveComponent {
  constructor(props, parent) {
    super(props, parent);
    this.setState({ page: 'hola' });
  }

  changePage(page) {
    console.log(this);
    this.setState({ page });
  }
  render(props) {
    this.content = () => {
      return '<main ></main>';
    };
    super.render(props);
    this.addComponent(SideBar, {
      id: 'sidebar',
      page: this.state.page,
      changePage: this.changePage.bind(this)
    });
  }
}

const root = document.querySelector('#root');
const main = new Main({ id: 'main' }, root);
main.render();
