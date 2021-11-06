import ReactiveComponent from '../reactive-component.js';

import PricesFormulasPage from './PricesFormulasPage.js';
import StandardPage from './StandardPage.js';

export default class MainPage extends ReactiveComponent {
  content = () => {
    return `<main></main>`;
  };

  renderChilds(props) {
    super.renderChilds(props);

    if (this.props.page === 'Prices formulas') {
      this.addComponent(PricesFormulasPage, {
        id: 'pricesFormulasPage',
        class: 'pricesFormulasPage'
      });
    } else {
      this.addComponent(StandardPage, {
        id: 'mainPage',
        updateProps: { fromProps: ['page'] },
        page: this.props.page
      });
    }
  }
}
