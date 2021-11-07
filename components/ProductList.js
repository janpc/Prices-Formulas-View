import { StatelessComponent } from '../reactive-component.js';
import Product from './Product.js';

import { saveProducts } from '../utils/data.js';

export default class ProductList extends StatelessComponent {
  haveToRerender = false;

  content = () => {
    return `<section></section>`;
  };

  constructor(props, parent) {
    super(props, parent);
  }

  handleSaveProduct(formula, id) {
    const products = [];
    this.props.products.forEach((p) => {
      const product = { ...p };
      if (p.id === id) {
        product.formula = formula;
      }
      products.push(product);
    });
    const newProducts = saveProducts(products);

    if (newProducts) {
      this.props.setProducts(newProducts);
      return true;
    } else {
      return false;
    }
  }

  renderChilds() {
    super.renderChilds();

    this.props.products?.forEach((product, index) => {
      this.addComponent(Product, {
        product,
        updateProps: {
          fromProps: [{ name: 'product', index, stateName: 'products' }]
        },
        id: `product_${product.id}`,
        class: 'productItem',
        saveProduct: this.handleSaveProduct.bind(this)
      });
    });
  }
}
