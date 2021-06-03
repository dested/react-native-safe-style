import {AllProps} from './styleProps';

export type BaseThemeSchema<TColors extends string, TSpacing extends string, TBorderRadii extends string> = {
  colors: {[key in TColors]: string};
  spacing: {[key in TSpacing]: number | string};
  borderRadii: {[key in TBorderRadii]: number};
};

export type StyleStructure<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string
> =
  | AllProps<TColors, TSpacing, TBorderRadii>
  | [...TBaseClassesKeys[]]
  | [...TBaseClassesKeys[], AllProps<TColors, TSpacing, TBorderRadii>];

export type SafeStyleSchema<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
> = {
  colors: {[key in TColors]: string};
  spacing: {[key in TSpacing]: number | string};
  borderRadii: {[key in TBorderRadii]: number};
  defaultClasses: {text?: TBaseClassesKeys; view?: TBaseClassesKeys};
  baseClasses: {
    [className in TBaseClassesKeys]: AllProps<TColors, TSpacing, TBorderRadii>;
  };
  views: {
    [className in TViewsKeys]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>;
  };
  texts: {
    [className in TTextsKeys]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>;
  };
  allKeys: Set<string>;
  baseKeys: Set<string>;
  viewKeys: Set<string>;
  textKeys: Set<string>;
  clearCache: () => void;
};
