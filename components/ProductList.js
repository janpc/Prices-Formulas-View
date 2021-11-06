import { StatelessComponent } from '../reactive-component.js';
import Product from './Product.js';

export default class ProductList extends StatelessComponent {
  haveToRerender = false;

  content = () => {
    return `<section></section>`;
  };

  renderChilds() {
    super.renderChilds();

    this.props.products?.forEach((product) => {
      this.addComponent(Product, {
        product,
        updateProps: { fromProps: ['product'] },
        id: `product-${product.id}`,
        class: 'productItem'
      });
    });
  }
}
