import React from 'react';

const SecondSection = ({ product }) => {
  if (!product) return null;
  const features = product?.features.split('\\n\\n');

  return (
    <section className='w-full mb-36 mobile:mb-20'>
      <div className='container flex tablet:flex-col mobile:flex-col'>
        <div className='max-w-4 mr-28 tablet:w-full tablet:mb-24 mobile:w-full mobile:mb-20'>
          <h4 className='uppercase mb-6'>features</h4>
          <p>
            {features[0]}
            <br />
            <br />
            {features[1]}
          </p>
        </div>
        <div className='tablet:flex'>
          <h4 className='uppercase mb-6 tablet:mr-32'>in the box</h4>

          <ul>
            {product.includes.map(item => (
              <li key={item._id} className='mb-2'>
                <div>
                  <span className='mr-6 text-primary font-bold'>{`${item.quantity}x`}</span>
                  <span className='opacity-70'>{item.item.trim()}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
