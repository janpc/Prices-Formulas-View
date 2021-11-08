import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';

export default class MobileHeadre extends ReactiveComponent {
  haveToRerender = false;

  content = () => {
    return `<header><img src='https://www.netrivals.com/wp-content/uploads/2020/11/logo-positiu-1-1.png'/></header>`;
  };

  renderChilds() {
    super.renderChilds();
    this.addComponent(Button, {
      onClick: () => this.props.toggleSidebarVisibility(),
      id: this.props.id + '_button',
      class: this.props.class + '_button',
      isShownSidebar: this.props.isShownSidebar,
      updateProps: { fromProps: ['isShownSidebar'] }
    });
  }
}

class Button extends StatelessComponent {
  content = () => {
    const text = this.props.isShownSidebar ? 'Close' : 'Menu';
    return `<button>${text}</button>`;
  };
}
