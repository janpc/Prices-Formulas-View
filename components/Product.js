import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';
import { aplyFormula } from '../utils/index.js';

import InputProductFormula from './InputProductFormula.js';

export default class Product extends ReactiveComponent {
  haveToRerender = false;

  constructor(props, parent) {
    super(props, parent);
  }
  state = {
    modifiedPrice: aplyFormula(
      this.props.product.initialPrice,
      this.props.product.formula
    ),
    inputValue: this.props.formula
  };
  content = () => {
    return `<article></article>`;
  };

  handleAplyFormula(formula) {
    this.setState({
      modifiedPrice: aplyFormula(this.props.product.initialPrice, formula)
    });
  }

  renderChilds() {
    super.renderChilds();

    this.addComponent(ProductPreview, {
      product: this.props.product,
      priceText: 'Original price:',
      updateProps: { fromProps: ['product'] },
      id: `${this.id}-original`,
      class: `${this.props.class}_preview`
    });

    this.addComponent(InputProductFormula, {
      formula: this.props.product.formula,
      id: `${this.id}_inputContainer`,
      updateProps: {
        fromProps: [{ name: 'formula', index: 'formula', stateName: 'product' }]
      },
      class: `${this.props.class}_input`,
      aplyFormula: this.handleAplyFormula.bind(this),
      saveProduct: this.props.saveProduct,
      productId: this.props.product.id
    });

    this.addComponent(ProductPreview, {
      product: this.props.product,
      modifiedPrice: this.state.modifiedPrice,
      priceText: 'Modified price:',
      updateProps: { fromProps: ['product'], fromState: ['modifiedPrice'] },
      id: `${this.id}-modified`,
      class: `${this.props.class}_preview`
    });
  }
}

class ProductPreview extends StatelessComponent {
  haveToRerender = false;
  content = () => {
    const { product, modifiedPrice, priceText, class: className } = this.props;
    return `<div>
              <h3>${product.name}</h3>
              <img alt="${product.name}" src="${product.image}" />
              <p class='${className}_priceText'>${priceText}</p>
            </div>`;
  };

  renderChilds() {
    super.renderChilds();

    this.addComponent(PricePreview, {
      product: this.props.product,
      modifiedPrice: this.props.modifiedPrice,
      updateProps: { fromProps: ['product', 'modifiedPrice'] },
      id: `${this.id}_price`,
      class: `${this.props.class}_price`
    });
  }
}

class PricePreview extends StatelessComponent {
  content = () => {
    const { product, modifiedPrice } = this.props;
    return `<p'>${modifiedPrice ? modifiedPrice : product.initialPrice}€</p>`;
  };
}
