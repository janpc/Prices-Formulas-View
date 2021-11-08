import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';
import { aplyFormula } from '../utils/index.js';

import InputProductFormula from './InputProductFormula.js';

export default class Product extends ReactiveComponent {
  haveToRerender = false;

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

    const { product, class: className, saveProduct } = this.props;

    this.addComponent(ProductPreview, {
      product,
      priceText: 'Original price:',
      updateProps: { fromProps: ['product'] },
      id: `${this.id}-original`,
      class: `${className}_preview`
    });

    this.addComponent(InputProductFormula, {
      formula: product.formula,
      id: `${this.id}_inputContainer`,
      updateProps: {
        fromProps: [{ name: 'formula', index: 'formula', stateName: 'product' }]
      },
      class: `${className}_input`,
      aplyFormula: this.handleAplyFormula.bind(this),
      saveProduct: saveProduct,
      productId: product.id
    });

    this.addComponent(ProductPreview, {
      product,
      modifiedPrice: this.state.modifiedPrice,
      priceText: 'Modified price:',
      updateProps: { fromProps: ['product'], fromState: ['modifiedPrice'] },
      id: `${this.id}-modified`,
      class: `${className}_preview`
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

    const { product, class: className, modifiedPrice } = this.props;

    this.addComponent(PricePreview, {
      product,
      modifiedPrice: modifiedPrice,
      updateProps: { fromProps: ['product', 'modifiedPrice'] },
      id: `${this.id}_price`,
      class: `${className}_price`
    });
  }
}

class PricePreview extends StatelessComponent {
  content = () => {
    const { product, modifiedPrice } = this.props;
    return `<p'>${modifiedPrice ? modifiedPrice : product.initialPrice}€</p>`;
  };
}
