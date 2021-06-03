import {FlexStyle, TextStyle, TransformsStyle, ViewStyle} from 'react-native';
import {safeKeys} from './utils';
import {BaseThemeSchema} from './schema';

const spacingProperties = {
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  marginHorizontal: true,
  marginVertical: true,
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingHorizontal: true,
  paddingVertical: true,
};
const spacingPropertiesShorthand = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mh: 'marginHorizontal',
  mv: 'marginVertical',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  ph: 'paddingHorizontal',
  pv: 'paddingVertical',
};

const typographyProperties = {
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  letterSpacing: true,
  lineHeight: true,
  textAlign: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textTransform: true,
};

const layoutProperties = {
  width: true,
  height: true,
  minWidth: true,
  maxWidth: true,
  minHeight: true,
  maxHeight: true,
  overflow: true,
  aspectRatio: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  justifyContent: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
};

const positionProperties = {
  position: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
  zIndex: true,
};

const borderProperties = {
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStyle: true,
  borderTopWidth: true,
  borderWidth: true,
};

const borderRadiusProperties = {
  borderRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
};

const borderColorProperties = {
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderLeftColor: true,
  borderBottomColor: true,
};

const shadowProperties = {
  shadowOpacity: true,
  shadowOffset: true,
  shadowRadius: true,
  elevation: true,
};

const textShadowProperties = {
  textShadowOffset: true,
  textShadowRadius: true,
};
const tintColorProperties = {
  tintColor: true,
};

type RawColor = `#${string}` | `hsl(${string})` | `rgba(${string})`;

export interface ColorProps<TColors extends string> {
  color?: TColors | RawColor;
}
export interface OpacityProps {
  opacity?: number;
}

export interface VisibleProps {
  visible?: boolean;
}

export interface BackgroundColorProps<TColors extends string> {
  backgroundColor?: TColors | RawColor;
}

export type SpacingProps<TSpacing extends string> = {
  [Key in keyof typeof spacingProperties | keyof typeof spacingPropertiesShorthand]?: TSpacing | number | `%${number}`;
};

export type TypographyProps = {
  [Key in keyof typeof typographyProperties]?: TextStyle[Key];
};

export type LayoutProps = {
  [Key in keyof typeof layoutProperties]?: FlexStyle[Key];
};

export type PositionProps = {
  [Key in keyof typeof positionProperties]?: FlexStyle[Key];
};

export type BorderProps<TColors extends string, TBorderRadii extends string> = {
  [Key in keyof typeof borderProperties]?: ViewStyle[Key];
} &
  {
    [Key in keyof typeof borderColorProperties]?: TColors | RawColor;
  } &
  {
    [Key in keyof typeof borderRadiusProperties]?: TBorderRadii | number;
  };

export type ShadowProps<TColors extends string> = {
  [Key in keyof typeof shadowProperties]?: ViewStyle[Key];
} & {
  shadowColor?: TColors | RawColor;
};

export type TextShadowProps<TColors extends string> = {
  [Key in keyof typeof textShadowProperties]?: TextStyle[Key];
} & {
  textShadowColor?: TColors | RawColor;
};
export type TintColorProps<TColors extends string> = {
  [Key in keyof typeof tintColorProperties]?: TColors | RawColor;
};

export const transformProperty: {
  [key: string]: (theme: BaseThemeSchema<any, any, any>, value: string) => number | string;
} = {};
export const transformPropertyKey: {[key: string]: string} = {};
transformProperty['textShadowColor'] = (theme: BaseThemeSchema<any, any, any>, value: string) =>
  theme.colors[value] ?? value;
transformProperty['shadowColor'] = (theme: BaseThemeSchema<any, any, any>, value: string) =>
  theme.colors[value] ?? value;
transformProperty['backgroundColor'] = (theme: BaseThemeSchema<any, any, any>, value: string) =>
  theme.colors[value] ?? value;
transformProperty['color'] = (theme: BaseThemeSchema<any, any, any>, value: string) => theme.colors[value] ?? value;
for (const key of safeKeys(borderRadiusProperties)) {
  transformProperty[key] = (theme: BaseThemeSchema<any, any, any>, value: string) => theme.borderRadii[value] ?? value;
}
for (const key of safeKeys(spacingProperties)) {
  transformProperty[key] = (theme: BaseThemeSchema<any, any, any>, value: string) => theme.spacing[value] ?? value;
}
for (const key of safeKeys(spacingPropertiesShorthand)) {
  transformProperty[key] = (theme: BaseThemeSchema<any, any, any>, value: string) => theme.spacing[value] ?? value;
  transformPropertyKey[key] = spacingPropertiesShorthand[key];
}
for (const key of safeKeys(borderColorProperties)) {
  transformProperty[key] = (theme: BaseThemeSchema<any, any, any>, value: string) => theme.colors[value] ?? value;
}
for (const key of safeKeys(tintColorProperties)) {
  transformProperty[key] = (theme: BaseThemeSchema<any, any, any>, value: string) => theme.colors[value] ?? value;
}
export const transformKeys = new Set(safeKeys(transformProperty));

export const allProperties = new Set([
  ...safeKeys(spacingProperties),
  ...safeKeys(typographyProperties),
  ...safeKeys(layoutProperties),
  ...safeKeys(positionProperties),
  ...safeKeys(borderProperties),
  ...safeKeys(borderRadiusProperties),
  ...safeKeys(borderColorProperties),
  ...safeKeys(shadowProperties),
  ...safeKeys(textShadowProperties),
  ...safeKeys(tintColorProperties),
  ...Array.from(transformKeys),
]);

export type AllProps<TColors extends string, TSpacing extends string, TBorderRadii extends string> =
  BackgroundColorProps<TColors> &
    ColorProps<TColors> &
    OpacityProps &
    SpacingProps<TSpacing> &
    TypographyProps &
    LayoutProps &
    PositionProps &
    BorderProps<TColors, TBorderRadii> &
    ShadowProps<TColors> &
    TextShadowProps<TColors> &
    TintColorProps<TColors> &
    TransformsStyle;
