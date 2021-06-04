# Safe Style

A dependency-less solution to **safely** theme your react native apps.

## Principals
- **Strict type safety**
- **Strong emphases on developer experience**
- **No unnecessary re-renders when there are no style changes**
- **No external dependencies**


## Heavily inspired by
- restyle (https://github.com/Shopify/restyle)
- dripsy (https://github.com/nandorojo/dripsy)

These are both great libraries that have much fancier features that I fully recommend.

## Install

With npm:

```bash
$ npm install react-native-safe-schema --save
```

With yarn:

```bash
$ yarn add react-native-safe-schema
```

## Usage

```tsx
<SView bigCard fullWidth={someCondition}>
  <SText boldButton marginTop={'l'}>Tap Here</SText>
</SView>
```

## Basic Usage

### Define your theme

```ts
import {startTheme} from 'react-native-safe-style';
export const SafeStyleTheme = startTheme({
  colors: {
    grey100: '#F8F8F8',
    grey200: '#EEEEEE',
    grey300: '#E0E0E0',
    grey400: '#BDBDBD',
    grey500: '#9E9E9E',
    grey600: '#757575',
    grey700: '#5a5a5a',
    grey800: '#353535',
    grey900: '#212121',

    primary: '#F47C47',
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

    elevation1: { shadowColor: 'black',shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.0,elevation: 1,},
    elevation2: {shadowColor: 'black',shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.2,shadowRadius: 1.41,elevation: 2,},

    rotate90: {transform: [{rotate: '90deg'}]},

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
  
  // add your global classes 
  .addClasses(
    
    // the first parameter is view classes
    {
      bigCard: [
        // base classes can be added here with full intelisense for reusability
        'elevation2',
        'm_m',
        // as well as custom safe styles 
        {
          borderRadius: 'button',
          backgroundColor: 'grey100',
          borderWidth: 2,
          borderColor: 'dark',
        },
      ],
    },
    
    // the second parameter is text classes
    {
      boldButton: ['sizeBase', 'fColDark', 'fSBold', 'textCenter', {padding: 's', marginVertical: 's'}],
      h1: ['size3xk', 'fColDark', 'fSBold'],
    }
  );
```

## Define your components

You can pass any react component and make it safely stylable, even imported components like FastImage and complicated components like Reanimated.View.

You pass your theme into either makeView or makeText to support view styles and text styles respectively. You can name the resulting component however you'd like.  

```ts
import {makeView, makeText} from 'react-native-safe-style';

 
export const SView = makeView(SafeStyleTheme, View);
export const SPressable = makeView(SafeStyleTheme, Pressable);
export const SText = makeText(SafeStyleTheme, Text);
export const SImage = makeView(SafeStyleTheme, Image);
export const SYourComponent = makeView(SafeStyleTheme, YourComponent);

export const SFastImage = makeView(SafeStyleTheme, FastImage);

export const SReanimatedView = makeView(SafeStyleTheme, Reanimated.View);

/// etc
```

### Use your components

Style classes are implemented as boolean props. Typically, you will use the shorthand for true, but you may set it to false to disable the class.

You can also apply inline styles using props instead of the style object, so you do not have to worry about re-renders due to ```style={{marginTop:16}}``` 
```tsx
import {SView, SText} from '../yourThemeFile';

<SView bigCard fullWidth={someCondition}>
  <SText boldButton marginTop={'l'}>Tap Here</SText>
</SView>
```

### Bespoke Styles

Sometimes you have a common set of classes and styles that are only used in a single component. Instead of polluting your global styles you can use the `useBespokeStyles` hook. 

First declare the useBespokeStyle hook by passing your theme into makeUseBespokeStyle:
```tsx theme.ts
import {makeUseBespokeStyle} from 'react-native-safe-style';
export const useBespokeStyle = makeUseBespokeStyle(SafeStyleTheme);
```

Then use your hook by passing a key for the class name, and the same style details you would use in your theme object.
```tsx CustomComponent.tsx
import {useBespokeStyle} from '../yourThemeFile';

function CustomComponent(){
  const bespokeStyle = useBespokeStyle({
    card: [
      'elevation4',
      'f1',
      'alignCenter',
      {
        borderRadius: 'dramatic',
        borderWidth: 5,
        borderColor: 'primary',
        backgroundColor: 'white',
        p: 's',
      },
    ],
  });
  
  return (
    <SView
      {...bespokeStyle.card}
      center
    >
      <BText color={'primary'} size3xl fLight>
        Beautiful!
      </BText>
    </SView>
  )
}
```

### Fully custom components

Occasionally (but rarely) you will want better control over the styles in your custom component, for instance taking in separate class details to style separate parts, like in a button. 

```tsx theme.ts
import {extractSafeStyleProps, makeTextPropsPrefix, makeViewProps, useSafeStyle} from 'react-native-safe-style';


// the safe view style props type
export const SafeStyleViewProps = makeViewProps(SafeStyleTheme);

// the save text style props type, but prefixed with `text_`
export const SafeStyleTextPrefixProps = makeTextPropsPrefix(SafeStyleTheme, 'text_');


type FancyButtonProps = TouchableOpacityProps
  & typeof SafeStyleViewProps 
  & typeof SafeStyleTextPrefixProps;

export const FancyButton = ({onPress, children, ...rest}: FancyButtonProps) => {
  // grab the text and view transformers for your theme
  const {text, view} = useSafeStyle(SafeStyleTheme);

  // grab the `text_` style props passed in
  const {newProps: nonTextProps, keys: textKeys} = extractSafeStyleProps(SafeStyleTheme, rest, 'text', 'text_');

  // grab the other style props passed in
  const {newProps, keys: viewKeys} = extractSafeStyleProps(SafeStyleTheme, nonTextProps, 'view');

  // compute the view style object from the view style props
  let viewStyle = view(viewKeys);

  // compute the text style object from the text style props
  let textStyle = text(textKeys);

  return (
    <TouchableOpacity {...newProps} style={viewStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

```

Which can be used like this:

```tsx
<FancyButton
  // style props are passed to the TouchableOpacity  
  f1 
  margin={'m'} 
  
  // text_ props are passed to the Text
  text_size2xl 
  text_color={'primary'} 
  
  // all remaining props are spread into TouchableOpacity 
  
  onPress={...}
  activeOpacity={0.9}
/>
```
 
## How It Works

SafeStyle maintains a list of all the style based props that can be passed in and plucks them off the props object, spreading the remainder into the passed in component. It keeps a running cache of the computed styles to ensure it will never rerender unnecessarily. 

## Why It's Needed

I was constantly running into cases of hundreds of different margins, colors, and common classes that had to live somewhere in the project, but nothing felt right from a DX standpoint. Stylesheet.create was always cumbersome and didn't solve the theming or common classes problem.

## Contributing

Reach out in the issues if you have problems or features you would like added. PRs welcome!

## License

MIT
