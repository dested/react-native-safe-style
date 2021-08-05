import {TransformsStyle, FlexStyle, TextStyle, ViewStyle, StyleProp} from 'react-native';
import {useEffect} from 'react';
import {allProperties, AllProps, transformKeys, transformProperty, transformPropertyKey} from './styleProps';
import {fromEntries, safeEntries} from './utils';
import {SafeStyleSchema, StyleStructure} from './schema';

export function startTheme<TColors extends string, TSpacing extends string, TBorderRadii extends string>(theme: {
  colors: {[key in TColors]: string};
  spacing: {[key in TSpacing]: number | string};
  borderRadii: {[key in TBorderRadii]: number};
}) {
  return {
    addBaseClasses: <TBaseClassesKeys extends string>(
      baseClasses: {
        [className in TBaseClassesKeys]: AllProps<TColors, TSpacing, TBorderRadii>;
      }
    ) => {
      return {
        addDefaultClasses: (defaultClasses: {text?: TBaseClassesKeys[]; view?: TBaseClassesKeys[]}) => {
          return {
            addClasses: <TViewsKeys extends string, TTextsKeys extends string>(
              views: {
                [className in TViewsKeys]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>;
              },
              texts: {
                [className in TTextsKeys]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>;
              }
            ): SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys> => {
              let baseKeys = new Set(Object.keys(baseClasses));
              let viewKeys = new Set(Object.keys(views));
              let textKeys = new Set(Object.keys(texts));
              return {
                borderRadii: theme.borderRadii,
                colors: theme.colors,
                spacing: theme.spacing,
                defaultClasses,
                baseClasses,
                views,
                texts,
                baseKeys: baseKeys,
                viewKeys: viewKeys,
                textKeys: textKeys,
                allKeys: new Set([...Array.from(baseKeys), ...Array.from(textKeys), ...Array.from(viewKeys)]),
                clearCache,
              };
            },
          };
        },
      };
    },
  };
}

let vStyleCache: Map<string, ViewStyle> = new Map<string, ViewStyle>();
let tStyleCache: Map<string, TextStyle> = new Map<string, TextStyle>();

let vClassCache: Map<string, Map<string, any>> = undefined!;
let tClassCache: Map<string, Map<string, any>> = undefined!;
let baseClassCache: Map<string, Map<string, any>> = undefined!;

function clearCache() {
  vStyleCache = new Map<string, ViewStyle>();
  tStyleCache = new Map<string, TextStyle>();
  vClassCache = undefined!;
}

function buildClassCache<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>) {
  try {
    vClassCache = new Map();
    tClassCache = new Map();
    baseClassCache = new Map();

    for (const baseClassKey in theme.baseClasses) {
      baseClassCache.set(baseClassKey, new Map());
      const baseClass = theme.baseClasses[baseClassKey];
      for (const cssProperty in baseClass) {
        if (transformKeys.has(cssProperty)) {
          const cssKey = transformPropertyKey[cssProperty] || cssProperty;
          baseClassCache
            .get(baseClassKey)!
            .set(cssKey, transformProperty[cssProperty](theme, baseClass[cssProperty] as unknown as string));
        } else {
          baseClassCache.get(baseClassKey)!.set(cssProperty, baseClass[cssProperty]);
        }
      }
    }

    for (const viewKey in theme.views) {
      vClassCache.set(viewKey, parseStyleStructure(theme, theme.views[viewKey]));
    }

    for (const textKey in theme.texts) {
      tClassCache.set(textKey, parseStyleStructure(theme, theme.texts[textKey]));
    }
  } catch (ex) {
    console.error(ex);
  }
}

function parseStyleStructure<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>,
  styleStructure: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>
) {
  const classCache = new Map();

  const pieces = Array.isArray(styleStructure) ? styleStructure : [styleStructure];

  for (const piece of pieces) {
    if (typeof piece === 'string') {
      baseClassCache.get(piece)!.forEach((value, key) => {
        classCache.set(key, value);
      });
    } else {
      for (const cssProperty in piece) {
        if (transformKeys.has(cssProperty)) {
          const cssKey = transformPropertyKey[cssProperty] || cssProperty;
          classCache.set(cssKey, transformProperty[cssProperty](theme, (piece as any)[cssProperty]));
        } else {
          classCache.set(cssProperty, (piece as any)[cssProperty]);
        }
      }
    }
  }
  return classCache;
}

type ClassKey = {key: string; property: string; value: any};

function processStyle<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>,
  classes: (TViewsKeys | TTextsKeys | TBaseClassesKeys | ClassKey)[],
  classCache: Map<string, Map<string, any>>,
  styleCache: Map<string, ViewStyle> | Map<string, TextStyle>,
  debugStyle: boolean
) {
  const key = classes.map((e) => (typeof e === 'string' ? e : (e as ClassKey).key)).join(',');

  if (!styleCache.has(key)) {
    let style = new Map();
    for (const c of classes) {
      if (typeof c === 'string') {
        if (baseClassCache.has(c)) {
          baseClassCache.get(c)!.forEach((value, key) => {
            style.set(key, value);
          });
        } else if (classCache.has(c)) {
          classCache.get(c)!.forEach((value, key) => {
            style.set(key, value);
          });
        } else {
          console.warn('class not found', c);
        }
      } else {
        const bespoke = c as ClassKey;
        if (transformKeys.has(bespoke.property)) {
          const cssKey = transformPropertyKey[bespoke.property] || bespoke.property;
          style.set(cssKey, transformProperty[bespoke.property](theme, bespoke.value));
        } else {
          style.set(bespoke.property, bespoke.value);
        }
      }
    }
    styleCache.set(key, mapToObj(style));
  }
  return styleCache.get(key)!;
}

function mapToObj<T>(map: Map<string, T>): {[key: string]: T} {
  return fromEntries(map.entries());
}

let functionCache: any;

export function useSafeStyle<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>
): {
  spacing: (spacing: TSpacing) => number | string;
  color: (color: TColors) => string;

  text: (classes: (TTextsKeys | TBaseClassesKeys | ClassKey)[], debugStyle?: boolean) => TextStyle;
  view: (classes: (TViewsKeys | TBaseClassesKeys | ClassKey)[], debugStyle?: boolean) => ViewStyle;
} {
  if (!vClassCache) {
    buildClassCache(theme);
  }
  return (
    functionCache ??
    (functionCache = {
      view: function (classes: (TViewsKeys | TBaseClassesKeys | ClassKey)[], debugStyle?: boolean): ViewStyle {
        return processStyle(
          theme,
          theme.defaultClasses.view ? [...theme.defaultClasses.view, ...classes] : classes,
          vClassCache,
          vStyleCache,
          !!debugStyle
        );
      },
      text: function (classes: (TTextsKeys | TBaseClassesKeys | ClassKey)[], debugStyle?: boolean): TextStyle {
        return processStyle(
          theme,
          theme.defaultClasses.text ? [...theme.defaultClasses.text, ...classes] : classes,
          tClassCache,
          tStyleCache,
          !!debugStyle
        );
      },
      color: function (color: TColors): string {
        return theme.colors[color];
      },
      spacing: function (spacing: TSpacing): number | string {
        return theme.spacing[spacing];
      },
    })
  );
}
export function SafeStyleProvider({children, theme}: any) {
  useEffect(() => {
    theme.clearCache();
  }, [theme]);
  return children;
}
function assertType<T>(assertion: any): asserts assertion is T {}

export type SafeStyleProps<
  TSafeStyleKeys extends string,
  TColor extends string,
  TSpacing extends string,
  TBorderRadii extends string
> = {
  [key in TSafeStyleKeys]?: boolean;
} &
  {
    [key in keyof AllProps<TColor, TSpacing, TBorderRadii>]?: AllProps<TColor, TSpacing, TBorderRadii>[key];
  };
export type SafeStylePropsNoBespoke<
  TSafeStyleKeys extends string,
  TColor extends string,
  TSpacing extends string,
  TBorderRadii extends string
> = {
  [key in TSafeStyleKeys]?: boolean;
} /*&
  {
    [key in keyof AllProps<TColor, TSpacing, TBorderRadii>]?: AllProps<
      TColor,
      TSpacing,
      TBorderRadii
    >[key];
  }*/;

export type SafeStylePropsPrefix<
  TPrefix extends string,
  TSafeStyleKeys extends string,
  TColor extends string,
  TSpacing extends string,
  TBorderRadii extends string
> = {
  [key in TSafeStyleKeys as `${TPrefix}${TSafeStyleKeys}`]?: boolean;
} &
  {
    [key in keyof AllProps<TColor, TSpacing, TBorderRadii> as `${TPrefix}${key}`]?: AllProps<
      TColor,
      TSpacing,
      TBorderRadii
    >[key];
  };

export function makeTextProps<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>
): SafeStyleProps<TTextsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii> {
  return undefined as any;
}
export function makeViewPropsPrefix<
  TPrefix extends string,
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>,
  prefix: TPrefix
): SafeStylePropsPrefix<TPrefix, TViewsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii> {
  return undefined as any;
}
export function makeTextPropsPrefix<
  TPrefix extends string,
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>,
  prefix: TPrefix
): SafeStylePropsPrefix<TPrefix, TTextsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii> {
  return undefined as any;
}
export function makeViewProps<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>
): SafeStyleProps<TViewsKeys | TBaseClassesKeys, TColors, TSpacing, TBorderRadii> {
  return undefined as any;
}

export function extractSafeStyleProps<
  T extends {[key: string]: any},
  TType extends 'view' | 'text',
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  safeStyle: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>,
  props: T,
  type: TType,
  prefix?: string
) {
  type KeyType = [TType] extends ['view'] ? TViewsKeys | TBaseClassesKeys : TTextsKeys | TBaseClassesKeys;
  let newProps = {...props};
  let keys: KeyType[] = [];
  let classKeys: ClassKey[] = [];
  const allKeys = safeStyle.allKeys;
  for (const key of Object.keys(props)) {
    if (prefix && key.indexOf(prefix) !== 0) continue;

    let testKey = prefix ? key.slice(prefix.length) : key;

    if (allKeys.has(testKey)) {
      delete newProps[key];
      if (props[key] === true) {
        keys.push(testKey as KeyType);
      }
    }
    if (allProperties.has(testKey)) {
      delete newProps[key];
      classKeys.push({property: testKey, value: props[key], key: `${key}=${props[key]}`});
    }
  }
  return {newProps, keys: classKeys.length > 0 ? [...keys, ...classKeys] : keys};
}

export function makeUseBespokeStyle<
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string,
  TBespokeClasses extends string
>(theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>) {
  return <TBespokeStyles extends string>(
    classes: {
      [key in TBespokeStyles]: StyleStructure<TColors, TSpacing, TBorderRadii, TBaseClassesKeys>;
    }
  ) => {
    return safeEntries(classes).reduce((accumulator, currentValue) => {
      const classes = Array.isArray(currentValue[1]) ? currentValue[1] : [currentValue[1]];
      let classMap = mergeArrayObjects(classes.map((e) => (typeof e === 'string' ? {[e as TBespokeStyles]: true} : e)));
      accumulator[currentValue[0]] = classMap as ({[e in TBespokeStyles]: true} &
        AllProps<TColors, TSpacing, TBorderRadii>)[];
      return accumulator;
    }, {} as {[key in TBespokeStyles]: ({[e in TBespokeStyles]: true} & AllProps<TColors, TSpacing, TBorderRadii>)[]});
  };
}
function flatMap<T>(items: (T[] | T)[]): T[] {
  const result: T[] = [];
  for (const item of items) {
    if (Array.isArray(item)) result.push(...item);
    else {
      result.push(item);
    }
  }
  return result;
}
function mergeArrayObjects<T>(items: T[]): {[key in keyof T]: T[key]} {
  const result: {[key in keyof T]?: T[key]} = {};
  for (const item of items) {
    for (const itemKey in item) {
      result[itemKey] = item[itemKey];
    }
  }
  return result as {[key in keyof T]: T[key]};
}
