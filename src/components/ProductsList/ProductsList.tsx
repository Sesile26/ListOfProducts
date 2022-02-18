import React from 'react';
import './ProductsList.scss';

type Props = {
  list: Product[],
  loadProductDetails: (product: Product, index: number) => void,
  changeVisible: (name: string, boolean: boolean) => void,
};

export const ProductsList: React.FC<Props> = React.memo(
  ({ list, loadProductDetails, changeVisible }) => {
    return (
      <>
        <ul className="list">
          {list.map((product, index) => (
            <li key={product.id} className="list__item">
              <div>
                {product.id}
              </div>
              <div>
                {product.name}
              </div>
              <div>
                {product.count}
              </div>
              <div>
                {product.size.width}
              </div>
              <div>
                {product.size.height}
              </div>
              <div>
                {product.weight}
              </div>
              <button
                type="button"
                className="js-modal-trigger button is-primary"
                data-target="modal-js-example"
                onClick={() => {
                  loadProductDetails(product, index);
                  changeVisible('modal', true);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  },
);
