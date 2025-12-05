declare module 'envalid' {
  export function cleanEnv<T extends Record<string, any>>(
    env: NodeJS.ProcessEnv,
    specs: T
  ): { [K in keyof T]: any };
  
  export function str(options?: { choices?: string[]; default?: string; devDefault?: string; desc?: string }): any;
  export function num(options?: { default?: number; devDefault?: number; desc?: string }): any;
  export function url(options?: { default?: string; desc?: string }): any;
  export function bool(options?: { default?: boolean; desc?: string }): any;
  export function host(options?: { default?: string; desc?: string }): any;
  export function port(options?: { default?: number; desc?: string }): any;
}
