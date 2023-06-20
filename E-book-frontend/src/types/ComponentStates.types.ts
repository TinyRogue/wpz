import { TypeFromConstObject } from './Types';

export const ComponentStates = {
  ERROR: 'error',
  DEFAULT: 'default',
} as const;

export type ComponentState = TypeFromConstObject<typeof ComponentStates>;
