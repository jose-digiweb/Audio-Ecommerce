import React from 'react';

import CategoriesSectionItem from './CategoriesSectionItem';

const CategoriesSection = () => {
  return (
    <section className='w-full py-16 tablet:pb-8'>
      <div className='container flex mobile:flex-col'>
        <CategoriesSectionItem
          url='shared/desktop/'
          path='/image-headphones.png'
          text='headphones'
          goTo='/headphones'
          styles='mr-10 tablet:mr-2'
        />

        <CategoriesSectionItem
          url='shared/desktop/'
          path='/image-speakers.png'
          text='speakers'
          goTo='/speakers'
          styles='mr-10 tablet:mr-2'
        />

        <CategoriesSectionItem
          url='shared/desktop/'
          path='/image-earphones.png'
          text='earphones'
          goTo='/earphones'
        />
      </div>
    </section>
  );
};

export default CategoriesSection;
