import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';

export default class Sidebar extends ReactiveComponent {
  haveToRerender = false;

  addSideBarButton(name) {
    this.addComponent(SideButton, {
      page: this.props.page,
      updateProps: { fromProps: ['page'] },
      text: name,
      onClick: () => this.props.changePage(name),
      id: name
    });
  }

  content = () => {
    return `<aside class="sidebar"><img src='https://www.netrivals.com/wp-content/uploads/2020/11/logo-positiu-1-1.png'/></aside>`;
  };

  renderChilds() {
    super.renderChilds();
    this.addSideBarButton('My products');
    this.addSideBarButton('Prices formulas');
    this.addSideBarButton('Market Position');
    this.addSideBarButton('Settings');
  }
}

class SideButton extends StatelessComponent {
  content = () => {
    const { text, page } = this.props;

    this.props.class =
      text == page ? ['selected', 'sidebar_button'] : 'sidebar_button';

    return `<button>${text}</button>`;
  };
}
