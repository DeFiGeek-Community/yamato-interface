import React, { useMemo } from 'react';
import { Text, TextProps } from 'rebass';
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import { Colors } from './styled';

export * from './components';

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = '#FFFFFF';
const black = '#000000';

export function colors(): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: '#000000',
    text2: '#565A69',
    text3: '#888D9B',
    text4: '#C3C5CB',
    text5: '#EDEEF2',

    // backgrounds / greys
    bg0: '#FFF',
    bg1: '#F7F8FA',
    bg2: '#EDEEF2',
    bg3: '#CED0D9',
    bg4: '#888D9B',
    bg5: '#888D9B',
    bg6: '#6C7284',

    //specialty colors
    modalBG: 'rgba(0,0,0,0.3)',
    advancedBG: 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: '#ff007a',
    primary2: '#FF8CC3',
    primary3: '#FF99C9',
    primary4: '#F6DDE8',
    primary5: '#FDEAF1',

    // color text
    primaryText1: '#ff007a',

    // secondary colors
    secondary1: '#ff007a',
    secondary2: '#F6DDE8',
    secondary3: '#FDEAF1',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#e3a507',
    yellow2: '#ff8f00',
    yellow3: '#F3B71E',
    blue1: '#2172E5',
    blue2: '#5199FF',

    error: '#FD4040',
    success: '#27AE60',
    warning: '#ff8f00',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  };
}

export function theme(): DefaultTheme {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeObject = useMemo(() => theme(), []);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />;
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />;
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />;
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />;
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />;
  },
  body(props: TextProps) {
    return (
      <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
    );
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />;
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />;
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />;
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />;
  },
  italic(props: TextProps) {
    return (
      <TextWrapper
        fontWeight={500}
        fontSize={12}
        fontStyle={'italic'}
        color={'text2'}
        {...props}
      />
    );
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return (
      <TextWrapper
        fontWeight={500}
        color={error ? 'red1' : 'text2'}
        {...props}
      />
    );
  },
};

export const ThemedBackground = styled.div<{
  backgroundColor?: string | undefined;
}>`
  position: fixed;
  top: 0;
  left: calc(-100vw / 2);
  right: 0;
  pointer-events: none;
  /* max-width: 100vw !important; */
  width: 200vw;
  height: 200vh;
  mix-blend-mode: color;
  background: ${({ backgroundColor }) =>
    `radial-gradient(50% 50% at 50% 50%, ${
      backgroundColor ? backgroundColor : '#fc077d10'
    } 0%, rgba(255, 255, 255, 0) 100%)`};
  transform: translateY(-100vh);
  will-change: background;
  transition: background 450ms ease;
`;

export const ThemedGlobalStyle = createGlobalStyle`
/* html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1};
} */

html,
body {
  margin: 0;
  padding: 0;
}

html {
	font-size: 62.5%; // 10px
}

@media screen and (max-width:1200px) {
  html {
    font-size: 56.25%; // 9px
  }
}

@media screen and (max-width:768px) {
  html {
    font-size: 50%; // 8px
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-display: fallback;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;
