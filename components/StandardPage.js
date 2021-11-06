import ReactiveComponent from '../reactive-component.js';

export default class StandardPage extends ReactiveComponent {
  content = () => {
    console.log(this.props.page);
    return `<h1>${this.props.page}</h1>`;
  };
}
