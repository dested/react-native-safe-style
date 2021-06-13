import {ComponentType, ComponentProps, ReactNode, memo, JSXElementConstructor, PropsWithChildren} from 'react';
import React, {forwardRef} from 'react';
import {SafeStyleProps, SafeStyleSchema, extractSafeStyleProps, useSafeStyle} from './index';

export function makeView<
  T,
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>,
  Comp: ComponentType<T>
) {
  let forwardRefExoticComponent = forwardRef<
    ComponentType<T>,
    ComponentProps<typeof Comp> &
      SafeStyleProps<TBaseClassesKeys | TViewsKeys, TColors, TSpacing, TBorderRadii> & {debugStyle?: boolean}
  >(({children, ...rest}, ref) => {
    const {view} = useSafeStyle(theme);
    const {newProps, keys} = extractSafeStyleProps(theme, rest, 'view');
    let viewStyle = view(keys, rest.debugStyle);
    if (rest.debugStyle) {
      // console.log(keys, newProps, viewStyle);
      console.log('TRIGGER');
    }
    const FinalComp = Comp as any; // todo i cannot fix this
    return (
      <FinalComp ref={ref} {...newProps} style={'style' in newProps ? [newProps['style'], viewStyle] : viewStyle}>
        {children}
      </FinalComp>
    );
  });
  forwardRefExoticComponent.displayName = `SafeStyle.${Comp?.displayName ?? 'NoNameComponent'}`;
  return forwardRefExoticComponent;
}
export function makeText<
  T,
  TColors extends string,
  TSpacing extends string,
  TBorderRadii extends string,
  TBaseClassesKeys extends string,
  TViewsKeys extends string,
  TTextsKeys extends string
>(
  theme: SafeStyleSchema<TColors, TSpacing, TBorderRadii, TBaseClassesKeys, TViewsKeys, TTextsKeys>,
  Comp: ComponentType<T>
) {
  const forwardRefExoticComponent = forwardRef<
    ComponentType<T>,
    ComponentProps<typeof Comp> &
      SafeStyleProps<TBaseClassesKeys | TTextsKeys, TColors, TSpacing, TBorderRadii> & {
        debugStyle?: boolean;
      }
  >(({children, ...rest}, ref) => {
    const {text} = useSafeStyle(theme);
    const {newProps, keys} = extractSafeStyleProps(theme, rest, 'text');
    let textStyle = text(keys, rest.debugStyle);
    if (rest.debugStyle) {
      console.log(keys, newProps, textStyle);
    }
    const FinalComp = Comp as any; // todo i cannot fix this
    return (
      <FinalComp ref={ref} {...newProps} style={'style' in newProps ? [newProps['style'], textStyle] : textStyle}>
        {children}
      </FinalComp>
    );
  });
  forwardRefExoticComponent.displayName = `SafeStyle.${Comp?.displayName ?? 'NoNameComponent'}`;
  return forwardRefExoticComponent;
}
