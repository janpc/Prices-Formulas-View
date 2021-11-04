export class StatelessComponent {
  #onClick = null;

  constructor(props, parent) {
    this.props = props;
    this.parent = parent;
    this.id = this.props.id;
  }

  addComponent(component, props) {
    const comp = new component(props, this.self);
    comp.render();
  }

  content() {
    return '<p>content not defined</>';
  }

  render(parent = this.parent) {
    this.parent = parent;

    this.removeSelf();
    this.createSelf();

    this.self = document.getElementById(this.id);
  }

  removeSelf() {
    this.#onClick && self.removeEventListener('click', this.#onClick);
    this.#onClick = null;
    this.self && this.self.remove();
  }

  addAttributes(self) {
    this.id && self.setAttribute('id', this.id);
    this.props.style && self.classList.add(this.props.style);
    if (this.props.onClick) {
      this.#onClick = self.addEventListener('click', this.props.onClick);
    }
  }

  createSelf() {
    const self = new DOMParser().parseFromString(this.content(), 'text/html')
      .body.firstElementChild;

    this.addAttributes(self);

    this.parent.appendChild(self);
  }
}

export default class ReactiveComponent extends StatelessComponent {
  state = {};

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  createSelf() {
    const self = new DOMParser().parseFromString(
      this.content(this.state),
      'text/html'
    ).body.firstElementChild;

    this.addAttributes(self);

    this.parent.appendChild(self);
  }
}
