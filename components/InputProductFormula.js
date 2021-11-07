import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';
import { validateFormula } from '../utils/index.js';

export default class InputProductFormula extends ReactiveComponent {
  state = {
    mode: 'display',
    inputValue: this.props.formula,
    error: null
  };

  addInputButton(name, onClick) {
    this.addComponent(FormulaButton, {
      text: name,
      class: [`input_button`, `input_button_${name}`],
      onClick: () => onClick(),
      id: name
    });
  }

  changeMode(mode) {
    return () => {
      this.setState({ error: null, mode, inputValue: this.props.formula });
    };
  }

  cancelChanges() {
    this.state.inputValue = this.props.formula;
    this.changeMode('display')();
  }

  aplyChanges() {
    const formula = document.getElementById(`${this.id}_input`).value;

    this.state.inputValue = formula;

    if (validateFormula(formula)) {
      this.setState({ error: null });
      this.props.aplyFormula(formula);
    } else {
      this.setState({ error: 'Incorrect formula!' });
    }
  }

  saveChanges() {
    const f = document.getElementById(`${this.id}_input`).value;

    if (validateFormula(f)) {
      this.setState({ error: null, mode: 'display' });
      if (this.props.saveProduct(f, this.props.productId)) {
        this.props.aplyFormula(f);
      }
    } else {
      this.setState({ error: 'Incorrect formula!' });
    }
  }

  content = () => {
    const formula =
      this.state.mode === 'display'
        ? `<p>${this.props.formula}</p>`
        : `<input id='${this.id}_input' type="text" value='${this.state.inputValue}'/>`;
    const error =
      this.state.error != null
        ? `<p class='${this.props.class}_error'>${this.state.error}</p>`
        : '';

    return `<div>
              <div class='${this.props.class}_inputContainer'>
                <span>f(x)=</span>
                ${formula}
              </div>
              ${error}
            </div>`;
  };

  renderChilds() {
    super.renderChilds();
    if (this.state.mode === 'display') {
      this.addInputButton('Edit', this.changeMode('edit').bind(this));
    } else {
      this.addInputButton('Cancel', this.cancelChanges.bind(this));
      this.addInputButton('Aply', this.aplyChanges.bind(this));
      this.addInputButton('Save', this.saveChanges.bind(this));
    }
  }
}

class FormulaButton extends StatelessComponent {
  haveToRerender = true;

  content = () => {
    return `<button>${this.props.text}</button>`;
  };
}
