import ReactiveComponent from './reactive-component.js';

import SideBar from './components/SideBar.js';
import MainPage from './components/MainPage.js';

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
    return '<div ></div>';
  };

  renderChilds(props) {
    super.renderChilds(props);

    this.addComponent(SideBar, {
      id: 'sidebar',
      page: this.state.page,
      updateProps: { fromState: ['page'] },
      changePage: this.changePage.bind(this)
    });
    this.addComponent(MainPage, {
      id: 'mainPage',
      updateProps: { fromState: ['page'] },
      page: this.state.page
    });
  }
}

const root = document.querySelector('#root');
const main = new Main({ id: 'fullPage', class: 'fullPage' }, root);
main.firstRender();
