import { shallow, ShallowWrapper } from 'enzyme';

/**
 * Duplicated enzyme's ShallowRendererProps
 *
 * @internal
 */
export interface IShallowRendererProps {
  lifecycleExperimental?: boolean;
  disableLifecycleMethods?: boolean;
}

/**
 * ShallowUntilTarget Interface
 *
 * @internal
 */
export interface IShallowUntilTarget {
  maxTries: number;
  shallowOptions: IShallowRendererProps;
}

/**
 * An extention of enzyme's shallow function which will fail to work
 * with decorated components and/or components using the styled() function.
 * This function allows you to pass a 'target' component (e.g. ComponentBase)
 * and keep running shallow on each child component till a match is found.
 *
 * @public
 */
export function shallowUntilTarget<P, S>(
  componentInstance: React.ReactElement<P>,
  TargetComponent: string,
  options: IShallowUntilTarget = {
    maxTries: 10,
    shallowOptions: {}
  }
): ShallowWrapper {
  const { maxTries, shallowOptions } = options;

  let root: ShallowWrapper<any,any> = shallow<P, S>(componentInstance, shallowOptions);

  if (
    typeof root.type() === 'string' || root.type().toString().indexOf(TargetComponent) > 0
    // root
    //   .type()
    //   .toString()
    //   .includes(TargetComponent)
  ) {
    // Default shallow()
    // If type() is a string then it's a DOM Node.
    // If it were wrapped, it would be a React component.
    return root;
  }

  for (let tries = 1; tries <= maxTries; tries++) {
    // Check for target as a string to avoid conflicts
    // with decoratored components name
    if (
      root.type().toString().indexOf(TargetComponent) > 0
        // .type()
        // .toString()
        // .includes(TargetComponent)
    ) {
      // Now that we found the target component, render it.
      return root.first().shallow(shallowOptions);
    }
    // Unwrap the next component in the hierarchy.
    root = root.first().shallow(shallowOptions);
  }

  throw new Error(
    `Could not find ${TargetComponent} in React instance: ${componentInstance};
    gave up after ${maxTries} tries`
  );
}
