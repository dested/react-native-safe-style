import { FlexStyle, TextStyle, TransformsStyle, ViewStyle } from 'react-native';
import { BaseThemeSchema } from './schema';
declare const spacingProperties: {
    margin: boolean;
    marginTop: boolean;
    marginRight: boolean;
    marginBottom: boolean;
    marginLeft: boolean;
    marginHorizontal: boolean;
    marginVertical: boolean;
    padding: boolean;
    paddingTop: boolean;
    paddingRight: boolean;
    paddingBottom: boolean;
    paddingLeft: boolean;
    paddingHorizontal: boolean;
    paddingVertical: boolean;
};
declare const spacingPropertiesShorthand: {
    m: string;
    mt: string;
    mr: string;
    mb: string;
    ml: string;
    mh: string;
    mv: string;
    p: string;
    pt: string;
    pr: string;
    pb: string;
    pl: string;
    ph: string;
    pv: string;
};
declare const typographyProperties: {
    fontFamily: boolean;
    fontSize: boolean;
    fontStyle: boolean;
    fontWeight: boolean;
    letterSpacing: boolean;
    lineHeight: boolean;
    textAlign: boolean;
    textDecorationLine: boolean;
    textDecorationStyle: boolean;
    textTransform: boolean;
};
declare const layoutProperties: {
    width: boolean;
    height: boolean;
    minWidth: boolean;
    maxWidth: boolean;
    minHeight: boolean;
    maxHeight: boolean;
    overflow: boolean;
    aspectRatio: boolean;
    alignContent: boolean;
    alignItems: boolean;
    alignSelf: boolean;
    justifyContent: boolean;
    flex: boolean;
    flexBasis: boolean;
    flexDirection: boolean;
    flexGrow: boolean;
    flexShrink: boolean;
    flexWrap: boolean;
};
declare const positionProperties: {
    position: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
    zIndex: boolean;
};
declare const borderProperties: {
    borderBottomWidth: boolean;
    borderLeftWidth: boolean;
    borderRightWidth: boolean;
    borderStyle: boolean;
    borderTopWidth: boolean;
    borderWidth: boolean;
};
declare const borderRadiusProperties: {
    borderRadius: boolean;
    borderBottomLeftRadius: boolean;
    borderBottomRightRadius: boolean;
    borderTopLeftRadius: boolean;
    borderTopRightRadius: boolean;
};
declare const borderColorProperties: {
    borderColor: boolean;
    borderTopColor: boolean;
    borderRightColor: boolean;
    borderLeftColor: boolean;
    borderBottomColor: boolean;
};
declare const shadowProperties: {
    shadowOpacity: boolean;
    shadowOffset: boolean;
    shadowRadius: boolean;
    elevation: boolean;
};
declare const textShadowProperties: {
    textShadowOffset: boolean;
    textShadowRadius: boolean;
};
declare const tintColorProperties: {
    tintColor: boolean;
};
export declare type RawColor = `#${string}` | `hsl(${string})` | `rgba(${string})` | `rgb(${string})`;
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
export declare type SpacingProps<TSpacing extends string> = {
    [Key in keyof typeof spacingProperties | keyof typeof spacingPropertiesShorthand]?: TSpacing | number | `%${number}`;
};
export declare type TypographyProps = {
    [Key in keyof typeof typographyProperties]?: TextStyle[Key];
};
export declare type LayoutProps = {
    [Key in keyof typeof layoutProperties]?: FlexStyle[Key];
};
export declare type PositionProps = {
    [Key in keyof typeof positionProperties]?: FlexStyle[Key];
};
export declare type BorderProps<TColors extends string, TBorderRadii extends string> = {
    [Key in keyof typeof borderProperties]?: ViewStyle[Key];
} & {
    [Key in keyof typeof borderColorProperties]?: TColors | RawColor;
} & {
    [Key in keyof typeof borderRadiusProperties]?: TBorderRadii | number;
};
export declare type ShadowProps<TColors extends string> = {
    [Key in keyof typeof shadowProperties]?: ViewStyle[Key];
} & {
    shadowColor?: TColors | RawColor;
};
export declare type TextShadowProps<TColors extends string> = {
    [Key in keyof typeof textShadowProperties]?: TextStyle[Key];
} & {
    textShadowColor?: TColors | RawColor;
};
export declare type TintColorProps<TColors extends string> = {
    [Key in keyof typeof tintColorProperties]?: TColors | RawColor;
};
export declare const transformProperty: {
    [key: string]: (theme: BaseThemeSchema<any, any, any>, value: string) => number | string;
};
export declare const transformPropertyKey: {
    [key: string]: string;
};
export declare const transformKeys: Set<string>;
export declare const allProperties: Set<string>;
export declare type AllProps<TColors extends string, TSpacing extends string, TBorderRadii extends string> = BackgroundColorProps<TColors> & ColorProps<TColors> & OpacityProps & SpacingProps<TSpacing> & TypographyProps & LayoutProps & PositionProps & BorderProps<TColors, TBorderRadii> & ShadowProps<TColors> & TextShadowProps<TColors> & TintColorProps<TColors> & TransformsStyle;
export {};
