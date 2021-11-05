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

  render() {
    this.content = () => {
      return `<div class="sidebar"><img src='../img/logo.png'/></div>`;
    };
    super.render();
    this.addSideBarButton('My products');
    this.addSideBarButton('Prices formulas');
    this.addSideBarButton('Market Position');
    this.addSideBarButton('Settings');
  }

  addChilds() {}
}

class SideButton extends StatelessComponent {
  haveToRerender = true;
  render() {
    this.props.class =
      this.props.text == this.props.page
        ? ['selected', 'sidebar_button']
        : 'sidebar_button';

    this.content = () => {
      return `<button>${this.props.text}</button>`;
    };

    super.render();
  }
}
