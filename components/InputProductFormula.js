import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';

export default class InputProductFormula extends ReactiveComponent {
  state = { mode: 'display', inputValue: 'hola' };

  addInputButton(name, onClick) {
    this.addComponent(FormulaButton, {
      text: name,
      class: [`input_button`, `input_button_${name}`],
      onClick: () => onClick(),
      id: name
    });
  }

  changeMode(mode) {
    return () => this.setState({ mode });
  }

  saveChanges() {
    const value = document.getElementById(`${this.id}_input`).value;
    this.setState({ inputValue: value });
    this.changeMode('display')();
  }

  content = () => {
    const formula =
      this.state.mode === 'display'
        ? `<p>${this.state.inputValue}</p>`
        : `<input id='${this.id}_input' type="text" value='${this.state.inputValue}'/>`;

    return `<div>
              <div class='${this.props.class}_inputContainer'>
                <span>f(x)=</span>
                ${formula}
              </div>
            </div>`;
  };

  renderChilds() {
    super.renderChilds();
    if (this.state.mode === 'display') {
      this.addInputButton('Edit', this.changeMode('edit').bind(this));
    } else {
      this.addInputButton('Cancel', this.changeMode('display').bind(this));
      this.addInputButton('Aply');
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
