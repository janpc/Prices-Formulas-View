export default class ReactiveComponent {
  #state = {};
  #components = [];

  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    this.#state = { ...this.#state, newState };
  }

  addComponent(component, state) {
    const comp = new component(state);
    this.#components.push(comp);
    return comp.render();
  }

  render() {
    return '<p> not defined </p>';
  }
}
