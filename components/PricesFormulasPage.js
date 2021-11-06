import ReactiveComponent from '../reactive-component.js';

import ProductList from './ProductList.js';

import getProducts from '../utils/data.js';

export default class PricesFormulasPage extends ReactiveComponent {
  componentDidMount() {
    this.setState({ products: getProducts() });
  }

  content = () => {
    const count = this.state.products?.length;
    const productsText = `Showing ${
      count > 49 ? 50 : count
    } of ${count} products:`;

    return `<div>
              <div class='${this.props.class}_info'>
                <h1>Apply price formula to my products</h1>
                <p>${productsText}</p>
              </div>
            </div>`;
  };

  renderChilds() {
    super.renderChilds();
    this.addComponent(ProductList, {
      products: this.state.products,
      updateProps: { fromState: ['products'] },
      id: 'products_list',
      class: 'products_list'
    });
  }
}
