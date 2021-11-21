import React from 'react';
import { useMediaQuery } from 'react-responsive';

import ProductShow from '../../../reusables/ProductShow';

const ProductsSection = ({ products }) => {
  const desktopViewport = useMediaQuery({ minWidth: 1280 });
  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const smallViewport = useMediaQuery({ maxWidth: 500 });

  if (!products) return null;

  let imageUrl;
  if (desktopViewport) {
    imageUrl = `categories/speakers/desktop`;
  }
  if (tabletViewport) {
    imageUrl = 'categories/speakers/tablet';
  }
  if (smallViewport) {
    imageUrl = 'categories/speakers/mobile';
  }

  let toggleProductSide = 'no';
  const toggleSide = () => {
    let order;
    if (toggleProductSide === 'no') {
      order = '';
      toggleProductSide = 'yes';
      return order;
    }
    if (toggleProductSide === 'yes') {
      order = 'ml-32 order-1';
      toggleProductSide = 'no';
      return order;
    }
  };

  const renderProducts = () => {
    return products?.map(product => (
      <ProductShow
        key={product._id}
        url={imageUrl}
        path={`${product.name
          .toLowerCase()
          .split(product.category.slice(-1))[0]
          .trim()
          .split(' ')
          .join('-')}.jpg`}
        title={product?.name
          ?.split(' ')
          .join('')
          .split(product?.category[0].toUpperCase())}
        category={product?.name.split(' ')[1]}
        description={product?.description}
        order={toggleSide()}
        goTo={`/product/${product?.slug}`}
      />
    ));
  };

  return (
    <section className='w-full'>
      <div className='container'>{renderProducts()}</div>
    </section>
  );
};

export default ProductsSection;
