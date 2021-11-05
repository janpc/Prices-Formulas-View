import ReactiveComponent from '../reactive-component.js';

export default class StandardPage extends ReactiveComponent {
  render() {
    this.content = () => {
      return `<p>${this.props.page}</p>`;
    };
    super.render();
  }
}
