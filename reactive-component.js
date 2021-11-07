import { areSameObject } from './utils/index.js';

export class StatelessComponent {
  #onClick = null;
  components = [];
  haveToRerender = true;
  stateChanged = false;

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

    comp.firstRender();
  }

  content() {
    return '<p>content not defined</>';
  }

  renderChilds(parent = this.parent) {
    this.parent = parent;
    this.components = [];
  }

  firstRender(parent = this.parent) {
    this.parent = parent;

    this.createSelf();

    this.self = document.getElementById(this.id);
    this.renderChilds();
    this.componentDidMount?.();
  }

  rerender() {
    this.updateSelf();
    this.self = document.getElementById(this.id);
    this.renderChilds();
  }

  replaceSelf(props) {
    if (this.haveToRerender) {
      const newProps =
        props != undefined ? { ...this.props, ...props } : this.props;
      if (!areSameObject(newProps, this.props) || this.stateChanged) {
        this.props = newProps;
        this.rerender();
        this.stateChanged = false;
      }
    } else {
      this.components.forEach((component) => {
        this.props = { ...this.props, ...props };
        const newProps = this.getProps(
          component.updatePropsFromState,
          component.updatePropsFromProps
        );
        component.replaceSelf({ ...component.props, ...newProps });
      });
    }

    this.componentDidUpdate?.();
  }

  addAttributes(self) {
    this.id && self.setAttribute('id', this.id);
    if (this.props.class) {
      typeof this.props.class === 'string'
        ? self.classList.add(this.props.class)
        : self.classList.add(...this.props.class);
    }
    if (this.props.onClick) {
      this.#onClick && self.removeEventListener('click', this.#onClick);
      this.#onClick = self.addEventListener('click', this.props.onClick);
    }
  }

  createSelf() {
    const self = new DOMParser().parseFromString(this.content(), 'text/html')
      .body.firstElementChild;

    this.addAttributes(self);

    this.parent.appendChild(self);
  }

  removeSelf() {
    this.self.remove();
  }

  updateSelf() {
    const self = new DOMParser().parseFromString(this.content(), 'text/html')
      .body.firstElementChild;

    this.addAttributes(self);

    this.self.replaceWith(self);
  }

  getProps(fromState, fromProps) {
    let newProps = {};
    const s = this.state;
    const p = this.props;
    fromState?.forEach((el) => {
      if (typeof el === 'object') {
        newProps[el.name] = s[el.stateName][el.index];
      } else {
        newProps[el] = s[el];
      }
    });
    fromProps?.forEach((el) => {
      if (typeof el === 'object') {
        newProps[el.name] = p[el.stateName][el.index];
      } else {
        newProps[el] = p[el];
      }
    });
    return newProps;
  }
}

export default class ReactiveComponent extends StatelessComponent {
  state = {};

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.stateChanged = true;
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

  updateSelf() {
    const self = new DOMParser().parseFromString(
      this.content(this.state),
      'text/html'
    ).body.firstElementChild;

    this.addAttributes(self);

    this.self.replaceWith(self);
  }
}
