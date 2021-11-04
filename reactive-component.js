export default class ReactiveComponent {
  #state = {};
  #components = [];
  content = '<p>content not defined</>';

  constructor(props, parent, id) {
    this.props = props;
    this.parent = parent;
    this.id = id;
  }

  setState(newState) {
    this.#state = { ...this.#state, newState };
  }

  addComponent(component, props, id) {
    const comp = new component(props, this.self, id);
    this.#components.push(comp);
    comp.render();
  }

  render() {
    const self = new DOMParser().parseFromString(this.content, 'text/html').body
      .firstElementChild;
    self.setAttribute('id', this.id);
    this.parent.appendChild(self);
    this.self = document.getElementById(this.id);
  }
}
