import ReactiveComponent from '../reactive-component.js';

export default class StandardPage extends ReactiveComponent {
  content = () => {
    return `<p>${this.props.page}</p>`;
  };
}
