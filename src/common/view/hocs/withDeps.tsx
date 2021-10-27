import React from "react";

/**
 * Lets you do dependency injection through props into React components.
 * Compatible with function and class components.
 * @example export default withModule(Component)(module)
 */
export function withDeps<T>(WrappedComponent: React.ComponentType<T>) {
  return function <U extends object>(module: U) {
    // eslint-disable-next-line react/display-name
    return (props: Omit<T, keyof U>) => (
      <WrappedComponent {...({ ...props, ...module } as T & U)} />
    );
  };
}
