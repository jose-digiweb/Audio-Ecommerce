import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import ImageRender from '../../../reusables/ImageRender';

const SuggestionSection = ({ products }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const desktopViewport = useMediaQuery({ minWidth: 1280 });
  const tabletViewport = useMediaQuery({ minWidth: 501, maxWidth: 1279 });
  const smallViewport = useMediaQuery({ maxWidth: 500 });

  let imageURL;
  let imageTransform;
  if (desktopViewport) {
    imageTransform = { radius: 10 };
    imageURL = 'desktop';
  }
  if (tabletViewport) {
    imageTransform = { width: '223px', height: '318px', radius: 10 };
    imageURL = 'tablet';
  }
  if (smallViewport) {
    imageTransform = { radius: 10 };
    imageURL = 'mobile';
  }

  if (!products) return <div>Loading</div>;

  const headphone1 = products.filter(product => product.category === 'headphones')[
    Math.floor(Math.random() * 3)
  ];
  const headphone2 = products.filter(product => product.category === 'headphones')[
    Math.floor(Math.random() * 3)
  ];
  const speaker = products.filter(speaker => speaker.category === 'speakers')[
    Math.floor(Math.random() * 2)
  ];

  const headphoneUrl1 = headphone1?.name.split(' ').join('-').toLowerCase();
  const headphoneUrl2 = headphone2?.name.split(' ').join('-').toLowerCase();
  const speakerUrl = speaker?.name.split(' ').join('-').toLowerCase();

  return (
    <section className='w-full mb-16 mobile:mb-20'>
      <MediaQuery minWidth={500}>
        <h3 className='uppercase text-center mb-10'>you may also like</h3>
      </MediaQuery>

      <MediaQuery maxWidth={499}>
        <h5 className='uppercase text-center mb-10'>you may also like</h5>
      </MediaQuery>

      <div className='container flex justify-between mobile:flex-col'>
        <div className='w-full mr-4 tablet:mr-2 rounded mobile:mb-16'>
          <div className='bg-gray w-full mb-8'>
            <ImageRender
              url={`shared/${imageURL}`}
              path={`/${headphoneUrl1}.jpg`}
              transform={imageTransform}
            />
          </div>

          <h5 className='text-center mb-8'>
            {headphone1.name
              .toLowerCase()
              .split('headphones')[0]
              .trim()
              .toUpperCase()}
          </h5>

          <div className='flex justify-center'>
            <Link to={`/product/${headphone1.slug}`}>
              <button type='button' className='btn-primary flex'>
                see product
              </button>
            </Link>
          </div>
        </div>

        <div className='w-full mr-4 tablet:mr-2 rounded mobile:mb-16'>
          <div className='bg-gray w-full mb-8'>
            <ImageRender
              url={`shared/${imageURL}`}
              path={`/${headphoneUrl2}.jpg`}
              transform={imageTransform}
            />
          </div>

          <h5 className='text-center mb-8'>
            {headphone2.name
              .toLowerCase()
              .split('headphones')[0]
              .trim()
              .toUpperCase()}
          </h5>

          <div className='flex justify-center'>
            <Link to={`/product/${headphone2.slug}`}>
              <button type='button' className='btn-primary flex'>
                see product
              </button>
            </Link>
          </div>
        </div>

        <div className='w-full rounded'>
          <div className='bg-gray w-full mb-8'>
            <ImageRender
              url={`shared/${imageURL}`}
              path={`/${speakerUrl}.jpg`}
              transform={imageTransform}
            />
          </div>

          <h5 className='text-center mb-8'>
            {`${speaker.name
              .toLowerCase()
              .split('speaker')[0]
              .trim()} speakers`.toUpperCase()}
          </h5>

          <div className='flex justify-center'>
            <Link to={`/product/${speaker.slug}`}>
              <button type='button' className='btn-primary flex'>
                see product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggestionSection;
