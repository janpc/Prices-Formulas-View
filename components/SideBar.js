import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';

export default class Sidebar extends ReactiveComponent {
  addSideBarButton(name) {
    this.addComponent(Button, {
      class: 'sidebar-button',
      text: name,
      onClick: () => this.props.changePage(name),
      id: name
    });
  }

  render() {
    this.content = () => {
      return `<div class="sidebar"><p>${this.props?.page}</p></div>`;
    };
    super.render();
    this.addSideBarButton('My products');
    this.addSideBarButton('Prices formulas');
    this.addSideBarButton('Market Position');
    this.addSideBarButton('Settings');
  }
}

class Button extends StatelessComponent {
  render() {
    this.content = () => {
      return `<button>${this.props.text}</button>`;
    };
    super.render();
  }
}
