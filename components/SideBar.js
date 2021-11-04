import ReactiveComponent from '../reactive-component.js';

export default class Sidebar extends ReactiveComponent {
  addSideBarButton(name) {
    this.addComponent(
      Button,
      {
        class: 'sidebar-button',
        text: name,
        onClick: () => console.log(name)
      },
      name
    );
  }
  render() {
    this.content = `<div class="sidebar"></div>`;
    super.render();
    this.addSideBarButton('My products');
    this.addSideBarButton('Prices formulas');
    this.addSideBarButton('Market Position');
    this.addSideBarButton('Settings');
  }
}

class Button extends ReactiveComponent {
  render() {
    this.content = `<button class="${this.props.class}">${this.props.text}</button>`;
    super.render();
    this.self.addEventListener('click', this.props.onClick);
  }
}
