import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';

import InputProductFormula from './InputProductFormula.js';

export default class Product extends ReactiveComponent {
  content = () => {
    return `<article></article>`;
  };

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
      id: `${this.id}_inputContainer`,
      class: `${this.props.class}_input`
    });

    this.addComponent(ProductPreview, {
      product: this.props.product,
      priceText: 'Modified price:',
      updateProps: { fromProps: ['product'] },
      id: `${this.id}-modified`,
      class: `${this.props.class}_preview`
    });
  }
}

class ProductPreview extends StatelessComponent {
  content = () => {
    return `<div>
              <h3>${this.props.product.name}</h3>
              <img alt="${this.props.product.name}" src="${this.props.product.image}" />
              <p class='${this.props.class}_priceText'>${this.props.priceText}</p>
              <p class='${this.props.class}_price'>${this.props.product.initialPrice}€</p>
            </div>`;
  };
}
