module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      manrope: ['Manrope', 'sans-serif'],
    },
    fontWeight: {
      overline: 400,
      body: 500,
      bold: 700,
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      xxs: '0.55rem',

      'mobile-header': [
        '2.25rem',
        {
          lineHeight: '2.5rem',
          letterSpacing: '0.081rem',
        },
      ],

      'desktop-header': [
        '3.5rem',
        {
          letterSpacing: '0.125rem',
          lineHeight: '3.625rem',
        },
      ],

      'cart-name': [
        '0.938rem',
        {
          letterSpacing: '0.1',
          lineHeight: '1.563rem',
        },
      ],

      'cart-pop': [
        '0.5rem',
        {
          letterSpacing: '0.1',
          lineHeight: '0.1',
        },
      ],

      body: ['0.938rem', '1.563rem'],
      subTitle: [
        '0.813rem',
        {
          letterSpacing: '0.063rem',
          lineHeight: '1.563rem',
        },
      ],
      overline: [
        '0.875rem',
        {
          letterSpacing: '0.625rem',
          lineHeight: '1.188rem',
        },
      ],
      navLink: [
        '0.813rem',
        {
          letterSpacing: '0.125rem',
          lineHeight: '1.563rem',
        },
      ],
      button: [
        '0.813rem',
        {
          letterSpacing: '0.063rem',
        },
      ],
      h1: [
        '3.5rem',
        {
          letterSpacing: '0.125rem',
          lineHeight: '3.625rem',
        },
      ],
      h2: [
        '2.5rem',
        {
          letterSpacing: '0.094rem',
          lineHeight: '2.75rem',
        },
      ],
      h3: [
        '2rem',
        {
          letterSpacing: '0.072rem',
          lineHeight: '2.25rem',
        },
      ],
      h4: [
        '1.75rem',
        {
          letterSpacing: '0.125rem',
          lineHeight: '2.375rem',
        },
      ],
      h5: [
        '1.5rem',
        {
          letterSpacing: '0.106rem',
          lineHeight: '2.063rem',
        },
      ],
      h6: [
        '1.125rem',
        {
          letterSpacing: '0.081rem',
          lineHeight: '1.5rem',
        },
      ],
    },

    container: {
      center: true,
    },
    screens: {
      xxs: '320px', // => @media (min-width: 640px)

      xs: '375px', // => @media (min-width: 640px)

      sm: '640px', // => @media (min-width: 640px)

      md: '768px', // => @media (min-width: 768px)

      lg: '1280px', // => @media (min-width: 1024px)

      xl: '1280px', // => @media (min-width: 1280px)

      '2xl': '1536px', // => @media (min-width: 1536px)

      largeContainer: { min: '1280px' },
      tabletContainer: { min: '700px', max: '1279px' },
      mediumContainer: { min: '501px', max: '699px' },
      smallContainer: { min: '375px', max: '500px' },
      smallerContainer: { max: '374px' },

      mobile: { max: '500px' },
      tablet: { min: '501px', max: '1279px' },
      desktop: { min: '1280px' },
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      larger: '0.5rem',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '50%': '50%',
      16: '58rem',
      10: '20rem',
      mobilePatternSize: '35rem',
    },
    backgroundPosition: {
      bottom: 'bottom',
      'bottom-4': 'center bottom 4rem',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      'left-top-1': 'left -9rem top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
      topMobilePattern: 'center top -7rem',
      'top-4': 'center top 1rem',
    },

    extend: {
      animation: 'spin 1s linear infinite',
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      margin: {
        'cart-top': '5.6rem',
      },

      padding: {
        'cart-pop-y': '0.4rem',
        'cart-pop-x': '0.2rem',
      },

      colors: {
        primary: { DEFAULT: '#D87D4A', light: '#FBAF85' },
        black: { DEFAULT: '#000000', light: '#101010', heroBg: '#191919' },
        gray: { DEFAULT: '#f1f1f1', light: '#FAFAFA', dark: '#4C4C4C' },
        white: { DEFAULT: '#FFFFFF' },
      },
      backgroundImage: {
        'hero-desktop':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/home/desktop/hero-desktop.jpg')",
        'hero-tablet':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/home/tablet/hero-tablet.jpg')",
        'hero-mobile':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/home/mobile/hero-mobile.jpg')",

        'auth-img1':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/shared/desktop/authLong.jpg?updatedAt=1636986604044')",
        'auth-img2':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/shared/desktop/authLong-1.jpg?updatedAt=1636986582791')",
        'auth-img3':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/shared/desktop/authSquare.jpg?updatedAt=1636986622359')",

        'featured-sec-2-desktop':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/home/desktop/image-speaker-zx7.jpg')",
        'featured-sec-2-tablet':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/home/tablet/image-speaker-zx7.jpg')",
        'featured-sec-2-mobile':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/home/mobile/image-speaker-zx7.jpg')",

        'pattern-circle':
          "url('https://ik.imagekit.io/beevfgcytiq/Audiophile/home/desktop/pattern-circles.svg')",

        'radial-G':
          'radial-gradient(circle, rgba(85,85,85,0.5) 0%, rgba(0,0,0,1) 80%)',
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '80%',
        97: '45rem',
      },

      minWidth: {
        '1/4': '25%',
        profileProduct: '1rem',
        '1/2': '50%',
        '3/4': '75%',
        1: '20rem',
      },

      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'desk-cont': '69.375rem',
        'tab-cont': '43.063rem',
        'middle-cont': '35.063rem',
        'mob-cont': '20.438rem',
        'sm-mob-cont': '18.75rem',
        'tv-cont': '90rem',
        'dash-cont': '57.5rem',
        2: '29.5rem',
        3: '20rem',
        4: '41.5rem',
      },
    },
  },
  variants: {
    extend: {
      outline: ['hover', 'active', 'focus'],
      cursor: ['hover', 'disabled'],
      backgroundColor: ['checked', 'active', 'disabled'],
      borderColor: ['checked', 'active'],
      borderWidth: ['hover'],
      opacity: ['hover'],
      ringColor: ['hover', 'active', 'checked'],
      ringWidth: ['hover', 'active', 'checked'],
      ringOffsetWidth: ['hover', 'active', 'checked'],
      ringOffsetColor: ['hover', 'active', 'checked'],
    },

    opacity: ['disabled'],
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
};
