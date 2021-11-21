import React from 'react';

import FeaturedOne from '../SubSections/FeaturedOne';
import FeaturedTwo from '../SubSections/FeaturedTwo';
import FeaturedThree from '../SubSections/FeaturedThree';

const FeaturedSection = ({ products }) => {
  return (
    <section className='w-full pb-20 mb-20 tablet:mb-8 mobile:mb-10'>
      <FeaturedOne products={products} />
      <FeaturedTwo products={products} />
      <FeaturedThree products={products} />
    </section>
  );
};

export default FeaturedSection;
