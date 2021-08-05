import { TransformsStyle, TextStyle, ViewStyle } from 'react-native';
import { AllProps } from './styleProps';
import { SafeStyleSchema, StyleStructure } from './schema';
export declare function startTheme<TColors extends string, TSpacing extends string, TBorderRadii extends string>(theme: {
    colors: {
        [key in TColors]: string;
    };
    spacing: {
        [key in TSpacing]: number | string;
    };
    borderRadii: {
        [key in TBorderRadii]: number;
    };
}): {
    addBaseClasses: <TBaseClassesKeys extends string>(baseClasses: { [className in TBaseClassesKeys]: AllProps<TColors, TSpacing, TBorderRadii>; }) => {
        addDefaultClasses: (defaultClasses: {
            text?: TBaseClassesKeys[] | undefined;
            view?: TBaseClassesKeys[] | undefined;
        }) => {
            addClasses: <TViewsKeys extends string, TTextsKeys extends string>(views: { [className_1 in TViewsKeys]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>; }, texts: { [className_2 in TTextsKeys]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>; }) => SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>;
        };
    };
};
declare type ClassKey = {
    key: string;
    property: string;
    value: any;
};
export declare function useSafeStyle<TColors extends string, TSpacing extends string, TBorderRadii extends string, TBaseClassesKeys extends string, TViewsKeys extends string, TTextsKeys extends string>(theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>): {
    spacing: (spacing: TSpacing) => number | string;
    color: (color: TColors) => string;
    text: (classes: (TTextsKeys | TBaseClassesKeys | ClassKey)[], debugStyle?: boolean) => TextStyle;
    view: (classes: (TViewsKeys | TBaseClassesKeys | ClassKey)[], debugStyle?: boolean) => ViewStyle;
};
export declare function SafeStyleProvider({ children, theme }: any): any;
export declare type SafeStyleProps<TSafeStyleKeys extends string, TColor extends string, TSpacing extends string, TBorderRadii extends string> = {
    [key in TSafeStyleKeys]?: boolean;
} & {
    [key in keyof AllProps<TColor, TSpacing, TBorderRadii>]?: AllProps<TColor, TSpacing, TBorderRadii>[key];
};
export declare type SafeStylePropsNoBespoke<TSafeStyleKeys extends string, TColor extends string, TSpacing extends string, TBorderRadii extends string> = {
    [key in TSafeStyleKeys]?: boolean;
};
export declare type SafeStylePropsPrefix<TPrefix extends string, TSafeStyleKeys extends string, TColor extends string, TSpacing extends string, TBorderRadii extends string> = {
    [key in TSafeStyleKeys as `${TPrefix}${TSafeStyleKeys}`]?: boolean;
} & {
    [key in keyof AllProps<TColor, TSpacing, TBorderRadii> as `${TPrefix}${key}`]?: AllProps<TColor, TSpacing, TBorderRadii>[key];
};
export declare function makeTextProps<TColors extends string, TSpacing extends string, TBorderRadii extends string, TBaseClassesKeys extends string, TViewsKeys extends string, TTextsKeys extends string>(safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>): SafeStyleProps<TTextsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii>;
export declare function makeViewPropsPrefix<TPrefix extends string, TColors extends string, TSpacing extends string, TBorderRadii extends string, TBaseClassesKeys extends string, TViewsKeys extends string, TTextsKeys extends string>(safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>, prefix: TPrefix): SafeStylePropsPrefix<TPrefix, TViewsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii>;
export declare function makeTextPropsPrefix<TPrefix extends string, TColors extends string, TSpacing extends string, TBorderRadii extends string, TBaseClassesKeys extends string, TViewsKeys extends string, TTextsKeys extends string>(safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>, prefix: TPrefix): SafeStylePropsPrefix<TPrefix, TTextsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii>;
export declare function makeViewProps<TColors extends string, TSpacing extends string, TBorderRadii extends string, TBaseClassesKeys extends string, TViewsKeys extends string, TTextsKeys extends string>(safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>): SafeStyleProps<TViewsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii>;
export declare function extractSafeStyleProps<T extends {
    [key: string]: any;
}, TType extends 'view' | 'text', TColors extends string, TSpacing extends string, TBorderRadii extends string, TBaseClassesKeys extends string, TViewsKeys extends string, TTextsKeys extends string>(safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>, props: T, type: TType, prefix?: string): {
    newProps: T;
    keys: (ClassKey | ([TType] extends ["view"] ? TBaseClassesKeys | TViewsKeys : TBaseClassesKeys | TTextsKeys))[];
};
export declare function makeUseBespokeStyle<TColors extends string, TSpacing extends string, TBorderRadii extends string, TBaseClassesKeys extends string, TViewsKeys extends string, TTextsKeys extends string, TBespokeClasses extends string>(theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>): <TBespokeStyles extends string>(classes: { [key in TBespokeStyles]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>; }) => { [key_1 in TBespokeStyles]: ({ [e in TBespokeStyles]: true; } & import("./styleProps").BackgroundColorProps<TColors> & import("./styleProps").ColorProps<TColors> & import("./styleProps").OpacityProps & import("./styleProps").SpacingProps<TSpacing> & import("./styleProps").TypographyProps & import("./styleProps").LayoutProps & import("./styleProps").PositionProps & {
    borderBottomWidth?: number | undefined;
    borderLeftWidth?: number | undefined;
    borderRightWidth?: number | undefined;
    borderStyle?: "solid" | "dotted" | "dashed" | undefined;
    borderTopWidth?: number | undefined;
    borderWidth?: number | undefined;
} & {
    borderColor?: import("./styleProps").RawColor | TColors | undefined;
    borderTopColor?: import("./styleProps").RawColor | TColors | undefined;
    borderRightColor?: import("./styleProps").RawColor | TColors | undefined;
    borderLeftColor?: import("./styleProps").RawColor | TColors | undefined;
    borderBottomColor?: import("./styleProps").RawColor | TColors | undefined;
} & {
    borderRadius?: number | TBorderRadii | undefined;
    borderBottomLeftRadius?: number | TBorderRadii | undefined;
    borderBottomRightRadius?: number | TBorderRadii | undefined;
    borderTopLeftRadius?: number | TBorderRadii | undefined;
    borderTopRightRadius?: number | TBorderRadii | undefined;
} & {
    shadowOpacity?: number | undefined;
    shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    shadowRadius?: number | undefined;
    elevation?: number | undefined;
} & {
    shadowColor?: import("./styleProps").RawColor | TColors | undefined;
} & {
    textShadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    textShadowRadius?: number | undefined;
} & {
    textShadowColor?: import("./styleProps").RawColor | TColors | undefined;
} & import("./styleProps").TintColorProps<TColors> & TransformsStyle)[]; };
export {};
