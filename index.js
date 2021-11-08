import ReactiveComponent from './reactive-component.js';

import SideBar from './components/SideBar.js';
import MainPage from './components/MainPage.js';
import MobileHeadre from './components/MobileHeader.js';

class Main extends ReactiveComponent {
  haveToRerender = false;

  state = {
    page: 'My products',
    isShownSidebar: false
  };

  componentDidUpdate() {
    const sidebar = document.getElementById('sidebar');
    if (this.state.isShownSidebar) {
      sidebar?.classList?.add('show');
    } else {
      sidebar?.classList?.remove('show');
    }
  }

  changePage(page) {
    this.setState({ page });
  }

  toggleSidebarVisibility() {
    this.setState({ isShownSidebar: !this.state.isShownSidebar });
  }

  content = () => {
    return '<div ></div>';
  };

  renderChilds(props) {
    super.renderChilds(props);

    this.addComponent(MobileHeadre, {
      id: 'mobileHeader',
      class: 'mobile-header',
      toggleSidebarVisibility: this.toggleSidebarVisibility.bind(this),
      isShownSidebar: this.state.isShownSidebar,
      updateProps: { fromState: ['isShownSidebar'] }
    });
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
