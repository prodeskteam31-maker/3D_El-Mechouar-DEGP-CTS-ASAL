/// <reference types="vite/client" />

declare module 'react' {
  export function useState<T>(init: T | (() => T)): [T, (v: T | ((p: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T = any>(init?: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T;
  export function useMemo<T>(fn: () => T, deps: any[]): T;
  export type ReactNode = any;
  export type MouseEvent<T = Element> = any;
  export const Fragment: any;
  export default any;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: string | number | null): any;
  export function jsxs(type: any, props: any, key?: string | number | null): any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  type Element = any;
  interface ElementClass {
    render(): any;
  }
}
