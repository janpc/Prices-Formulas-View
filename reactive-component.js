export class StatelessComponent {
  #onClick = null;
  components = [];
  haveToRerender = true;

  constructor(props, parent) {
    const { updateProps, ...otherProps } = props;
    this.props = otherProps;
    this.parent = parent;
    this.id = this.props.id;
    this.updatePropsFromProps = updateProps?.fromProps;
    this.updatePropsFromState = updateProps?.fromState;
  }

  addComponent(component, props) {
    const comp = new component(props, this.self);
    this.components.push(comp);
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

  replaceSelf(props) {
    this.props = { ...this.props, ...props };
    if (this.haveToRerender) {
      this.render();
    } else {
      this.components.forEach((component) => {
        const newProps = this.getProps(
          component.updatePropsFromState,
          component.updatePropsFromProps
        );
        const props = this.props;
        component.replaceSelf({ ...props, ...newProps });
      });
    }
  }

  removeSelf() {
    this.#onClick && self.removeEventListener('click', this.#onClick);
    this.#onClick = null;
    this.self && this.self.remove();
  }

  addAttributes(self) {
    this.id && self.setAttribute('id', this.id);
    if (this.props.class) {
      typeof this.props.class === 'string'
        ? self.classList.add(this.props.class)
        : self.classList.add(...this.props.class);
    }
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

  getProps(fromState, fromProps) {
    let newProps = {};
    const s = this.state;
    fromState?.forEach((el) => {
      newProps[el] = s[el];
    });
    fromProps?.forEach((el) => {
      newProps[el] = this.props[el];
    });
    return newProps;
  }
}

export default class ReactiveComponent extends StatelessComponent {
  state = {};

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.replaceSelf();
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
