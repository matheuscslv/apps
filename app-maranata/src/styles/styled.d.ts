import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secundary: string;
      success: string;
      danger: string;

      border: string;
      background: string;

      title: string;
      subtitle: string;

      transparent: string;
      darkTransparent: string;
      whiteTransparent: string;

      white: string;
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
      black: string;
    };

    fonts: {
      light: string;
      regular: string;
      medium: string;
      bold: string;
      semibold: string;
    };

    screen: {
      width: number;
      height: number;
    };
  }
}
