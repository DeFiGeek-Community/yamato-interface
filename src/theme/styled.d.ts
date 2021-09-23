import {
  FlattenSimpleInterpolation,
  ThemedCssFunction,
} from 'styled-components';

export type Color = string;
export interface Colors {
  // text
  text0: Color;
  text1: Color;
  text2: Color;
  text3: Color;

  // backgrounds
  bg0: Color;
  bg1: Color;
  bg2: Color;

  error: Color;
  success: Color;
  warning: Color;
}

export interface Grids {
  sm: number;
  md: number;
  lg: number;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: Grids;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>;
      upToSmall: ThemedCssFunction<DefaultTheme>;
      upToMedium: ThemedCssFunction<DefaultTheme>;
      upToLarge: ThemedCssFunction<DefaultTheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
