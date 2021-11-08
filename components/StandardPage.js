import ReactiveComponent from '../reactive-component.js';

export default class StandardPage extends ReactiveComponent {
  content = () => {
    return `<h1>${this.props.page}</h1>`;
  };
}
