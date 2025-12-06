declare module "winston" {
  export interface Logger {
    info(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
  }

  export interface Format {
    combine(...formats: any[]): any;
    timestamp(): any;
    errors(options?: { stack?: boolean }): any;
    json(): any;
    colorize(): any;
    printf(template: (info: any) => string): any;
  }

  export const format: Format;

  export class transports {
    static Console(options?: any): any;
  }

  export function createLogger(options: {
    level?: string;
    format?: any;
    defaultMeta?: any;
    transports?: any[];
  }): Logger;
}
