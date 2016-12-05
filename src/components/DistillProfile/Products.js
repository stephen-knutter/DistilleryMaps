import React from 'react';

const Products = props => {
  if (props.products) {
    let products = props.products;
    let productsArray = products.split(",");
    return(
      <div className="product-wrap">
        {
          productsArray.map((product) => {
            return(
              <span key={product} className="tag-default tag-pill distill-tag">
                {product}
              </span>
            )
          })
        }
      </div>
    )
  }
  return null;
}

export default Products;
