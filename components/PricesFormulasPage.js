import ReactiveComponent, {
  StatelessComponent
} from '../reactive-component.js';

import ProductList from './ProductList.js';

import { getProducts } from '../utils/data.js';

export default class PricesFormulasPage extends ReactiveComponent {
  haveToRerender = false;
  componentDidMount() {
    this.setState({ products: getProducts() });
    this.renderChilds();
  }

  content = () => {
    return `<div></div>`;
  };

  setProducts(products) {
    this.setState({ products });
  }

  renderChilds() {
    if (this.state.products) {
      super.renderChilds();
      this.addComponent(TopInfo, {
        products: this.state.products,
        updateProps: { fromState: ['products'] },
        id: `${this.props.class}_info`,
        class: `${this.props.class}_info`
      });

      this.addComponent(ProductList, {
        products: this.state.products,
        updateProps: { fromState: ['products'] },
        id: 'products_list',
        class: 'products_list',
        setProducts: this.setProducts.bind(this)
      });
    }
  }
}

class TopInfo extends StatelessComponent {
  content = () => {
    const count = this.props.products?.length;
    const productsText = `Showing ${
      count > 49 ? 50 : count
    } of ${count} products:`;

    return `<div>
              <h1>Apply price formula to my products</h1>
              <p>${productsText}</p>
            </div>`;
  };
}
