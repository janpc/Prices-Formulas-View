export function saveProducts(products) {
  localStorage.setItem('PricesFormulaView-data', JSON.stringify(products));
  return products;
}

export function getProducts() {
  var data = localStorage.getItem('PricesFormulaView-data');

  if (data) {
    return JSON.parse(data);
  }

  return [
    {
      id: 1,
      name: 'HUAWEI WATCH GT 2 Marrón 46mm',
      initialPrice: 139.0,
      formula: '(x+(x^2) + 2) + (x/2)',
      image:
        'https://img01.huaweifile.com/eu/es/huawei/pms/product/6901443320080/800_800_542DBFA46777EB3A9DF03BBCCAA3C81375B32AC530BECBE8mp.png'
    },
    {
      id: 2,
      name: 'iPhone X',
      initialPrice: 357.0,
      formula: 'x - (15*x)/100',
      image:
        'https://www.backmarket.es/cdn-cgi/image/format=auto,quality=75,width=1920/https://d1eh9yux7w8iql.cloudfront.net/product_images/36834_efd45da5-a374-4c62-8b7b-7ceb2c86c0ae.jpg'
    },
    {
      id: 3,
      name: 'Apple Watch',
      initialPrice: 529.0,
      formula: 'x + 0.21*x',
      image:
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKU83_VW_34FR+watch-41-alum-midnight-cell-7s_VW_34FR_WF_CO?wid=700&hei=700&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171038000,1631661170000'
    },
    {
      id: 4,
      name: 'Galaxy S10e',
      initialPrice: 255.0,
      formula: 'x',
      image:
        'https://www.backmarket.es/cdn-cgi/image/format=auto,quality=75,width=1920/https://d1eh9yux7w8iql.cloudfront.net/product_images/1588250988.5906856.jpg'
    }
  ];
}
