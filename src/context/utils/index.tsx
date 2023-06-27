/* eslint-disable @typescript-eslint/ban-types */
export * from './BuilderTreeProvider'

/**
 * @template P The type of the action's payload.
 * @template T the type used for the action type.
 * @template M The type of the action's metadata (optional)
 * @template E The type of the action's error (optional)
 *
 * @public
 */
export declare type PayloadAction<P = void, T extends string = string, M = never, E = never> = {
  payload: P;
  type: T;
} & ([M] extends [never] ? {} : {
  meta: M;
}) & ([E] extends [never] ? {} : {
  error: E;
});

