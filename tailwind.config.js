const { opacity } = require('@cloudinary/url-gen/actions/adjust');
const { fadeIn } = require('@cloudinary/url-gen/actions/effect');
const { background } = require('@cloudinary/url-gen/qualifiers/focusOn');
const { none } = require('@cloudinary/url-gen/qualifiers/progressive');
const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twilight: {
          100: '#edefff',
          200: '#dbdfff',
          300: '#a8b1ff',
          400: '#7583ff',
          500: '#4255ff',
          600: '#423ed8',
          700: '#1f1c8b',
          800: '#14125c',
          900: '#0a092d'
        },
        gray: {
          100: '#fff',
          200: '#f6f7fb',
          300: '#edeff4',
          400: '#d9dde8',
          500: '#939bb4',
          600: '#586380',
          700: '#2e3856',
          800: '#282e3e',
          900: '#1a1d28'
        },
        lemon: {
          100: '#fdffe9',
          200: '#faffbb',
          300: '#f5ff7d',
          400: '#ebff03',
          500: '#d4e603'
        },
        sky: {
          100: '#eaf9ff',
          200: '#cbf1ff',
          300: '#98e3ff',
          400: '#51cfff',
          500: '#008ec4'
        },
        sunset: {
          100: '#fff9e3',
          200: '#ffedab',
          300: '#ffdc62',
          400: '#ffcd1f',
          500: '#970'
        },
        lilac: {
          100: '#fcf0ff',
          200: '#f7d9ff',
          300: '#eaf',
          400: '#e372ff',
          500: '#9900be',
        },
        mint: {
          100: '#e6fcf4',
          200: '#c7f7e6',
          300: '#98f1d1',
          400: '#59e8b5',
          500: '#18ae79',
          600: '#12815a'
        },
        sherbert: {
          100: '#fff6ef',
          200: '#ffe8d8',
          300: '#ffc38c',
          400: '#ff983a',
          500: '#d05700'
        },
        error: {
          100: '#ff7873',
          200: '#da4543',
          300: '#b00020'
        },
        success: {
          400: '#22bb33'
        }
      },
      fontFamily: {
        'sans': ['hurme_no2-webfont', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        base: ['0.875rem', {
          lineHeight: '1.5'
        }],
        small: ['1rem', {
          lineHeight: '1.5'
        }],
        medium: ['1.5rem', {
          lineHeight: '1.5'
        }],
        large: ['2rem', {
          lineHeight: '1.5'
        }],
        xl: ['3rem', {
          lineHeight: '1.5'
        }],
        xxl: ['4rem', {
          lineHeight: '1.5'
        }],
        xxxl: ['5.5rem', {
          lineHeight: '1.5'
        }],
      },
      borderRadius: {
        small: '0.25rem',
        medium: '0.5rem',
        large: '1rem',
        xl: '1.5rem',
        full: '12.5rem'
      },
      spacing: {
        xxsmall: '0.25rem',
        xsmall: '0.5rem',
        small: '1rem',
        medium: '1.5rem',
        large: '2rem',
        xl: '3rem',
        xxl: '4rem'
      },
      transitionDuration: {
        'base': '120ms',
      },
      transitionTimingFunction: {
        'base': 'cubic-bezier(0.47, 0, 0.745, 0.715)'
      },
      boxShadow: {
        'small': '0 .25rem 1rem 0 #282e3e1f',
        'base': '0 .125rem .25rem 0 #282e3e1f',
        'large': '0 0 2rem 0 #282e3e1f',
      },
      borderWidth: {
        xxsmall: '0.0625rem',
      },
      maxWidth: {
        30: '30rem',
        35: '35rem',
        52.5: '52.5rem',
        64: '64rem',
        45: '45rem',
        90: '90rem'
      },
      height: {
        25: '25rem',
        31.25: '31.25rem',
        45: '45rem',
        37.5: '37.5rem'
      },
      width: {
        18: '4.5rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1252px',
          '2xl': '1252px',
        },
      },
      animation: {
        'zoomIn': "zoomIn 150ms ease-in-out 1",
        'fadeIn': "fadeIn 250ms linear 1",
        'fadeOut': "fadeOut 250ms linear 1 forwards",
        'fadeInRight': "fadeInRight 200ms linear 1",
        'fadeInLeft': "fadeInLeft 200ms linear 1",
        'fadeInDown': "fadeInDown 100ms linear 1",
        'fadeOutUp': "fadeOutUp 200ms linear 1 forwards",
        'fadeInOverlay': "fadeInOverlay 200ms linear 1 forwards",
        'fadeOutOverlay': "fadeOutOverlay 200ms linear 1",
      },
      keyframes: {
        zoomIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0,0)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1,1)'
          }
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        fadeOut: {
          '0%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(-100%)'
          }
        },
        fadeInRight: {
          '0%': {
            transform: 'rotateX(15deg) rotateY(10deg) translateX(15%)'
          },
          '100%': {
            transform: 'rotateX(0) rotateY(0) translateX(0)'
          }
        },
        fadeInLeft: {
          '0%': {
            transform: 'rotateX(-15deg) rotateY(10deg) translateX(-15%)'
          },
          '100%': {
            transform: 'rotateX(0) rotateY(0) translateX(0)'
          }
        },
        fadeInDown: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-150%)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        fadeOutUp: {
          '0%': {
            opacity: 1,
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(-150%)'
          }
        },
        fadeInOverlay: {
          '0%': {
            background: none
          },
          '100%': {
            background: "rgba(0, 0, 0, 0.5)"
          }
        },
        fadeOutOverlay: {
          '0%': {
            background: "rgba(0, 0, 0, 0.5)"
          },
          '100%': {
            background: none
          }
        },
      },
    }
  },
  plugins: [],
}