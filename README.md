# Safe Style

A dependency-less solution to **safely** theme your react native apps.

## Principals
- Strict type safety
- Strong emphases on developer experience
- No erroneous re-renders when there are no style changes (without using memo)
- No external dependencies


## Heavily inspired by
- restyle (https://github.com/Shopify/restyle)
- dripsy (https://github.com/nandorojo/dripsy)

These are both great libraries that have much fancier features that I fully recommend.


## Install

With npm:

```
$ npm install react-native-safe-schema --save
```

With yarn:

```
$ yarn add react-native-safe-schema
```

## Basic Usage

### Define your theme

```ts
export const SafeStyleTheme = startTheme({
  // colors
  colors: {
    primary: '#F47C47',
    grey100: '#F8F8F8',
    grey200: '#EEEEEE',
    grey300: '#E0E0E0',
    grey400: '#BDBDBD',
    grey500: '#9E9E9E',
    grey600: '#757575',
    grey700: '#5a5a5a',
    grey800: '#353535',
    grey900: '#212121',

    bad: '#ff6961',
    dark: '#353535',
    light: '#5a5a5a',
  },
  // margin/padding
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
  },
  // borderRadii
  borderRadii: {
    button: 15,
    card: 6,
  },
})
  // add some base common classes 
  .addBaseClasses({
    fullWidth: {width: '100%'},
    fullHeight: {height: '100%'},
    textCenter: {textAlign: 'center'},
    f1: {flex: 1},
    center: {justifyContent: 'center', alignItems: 'center'},
    alignCenter: {alignItems: 'center'},
    justifyCenter: {justifyContent: 'center'},
    stretch: {alignItems: 'stretch'},
    row: {flexDirection: 'row'},
    m_m: {margin: 'm'},
    mh_m: {marginHorizontal: 'm'},
    mv_m: {marginVertical: 'm'},

    elevation1: {
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    elevation2: {
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },

    rotate90: {transform: [{rotate: '-90deg'}]},

    fRegular: {fontFamily: 'Poppins-Regular'},
    fBold: {fontFamily: 'Poppins-Bold'},

    sizeXs: {fontSize: 12},
    sizeSm: {fontSize: 14},
    sizeBase: {fontSize: 16},
    sizeLg: {fontSize: 18},
    sizeXl: {fontSize: 20},
    size2xl: {fontSize: 24},
    size3xl: {fontSize: 30},

    fColDark: {color: 'dark'},
    fColLight: {color: 'light'},
  })
  // add the default classes you want applied to all views and text elements (if any)
  .addDefaultClasses({text: ['fRegular']})
  
  // add your global classes for views and text elements
  .addClasses(
    {
      bigCard: [
        'elevation2',
        'm_m',
        {
          borderRadius: 'button',
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: 'dark',
        },
      ],
    },
    {
      boldButton: ['sizeBase', 'fColDark', 'fSBold', 'textCenter', {padding: 's', marginVertical: 's'}],
    }
  );
```
## Define your components

```ts
// You can pass any react component and make it safely stylable
export const SView = makeView(SafeStyleTheme, View);
export const SPressable = makeView(SafeStyleTheme, Pressable);
export const SText = makeText(SafeStyleTheme, Text);
export const SImage = makeView(SafeStyleTheme, Image);
export const SYourComponent = makeView(SafeStyleTheme, YourComponent);
/// etc
```

### Use your components

```tsx
// classes are applied as boolean props
<SView bigCard>
  // and can also include inline styles as needed without having to worry rerenders by using style={{marginTop:16}}
  <SText boldButton marginTop={'l'}>Tap Here</SText>
</SView>
```

## How It Works

todo

## Why It's Needed

todo

## API Documentation

- [`todo`](#todo)

### todo

<a name="todo" />

todo

Example:

```ts
todo
```
