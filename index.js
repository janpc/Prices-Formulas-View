import ReactiveComponent from './reactive-component.js';

import SideBar from './components/SideBar.js';
import StandardPage from './components/StandardPage.js';

class Main extends ReactiveComponent {
  haveToRerender = false;
  constructor(props, parent) {
    super(props, parent);
    this.setState({ page: 'My products' });
  }

  changePage(page) {
    this.setState({ page });
  }

  content = () => {
    return '<main ></main>';
  };

  renderChilds(props) {
    super.renderChilds(props);

    this.addComponent(SideBar, {
      id: 'sidebar',
      page: this.state.page,
      updateProps: { fromState: ['page'] },
      changePage: this.changePage.bind(this)
    });

    this.addComponent(StandardPage, {
      id: 'mainPage',
      updateProps: { fromState: ['page'] },
      page: this.state.page
    });
  }
}

const root = document.querySelector('#root');
const main = new Main({ id: 'main', class: 'main' }, root);
main.firstRender();
