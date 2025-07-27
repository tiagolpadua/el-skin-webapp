import 'styled-components';
import { ThemeV2 } from './theme-v2';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeV2 {}
}