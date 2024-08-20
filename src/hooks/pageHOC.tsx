import {ComponentType, Suspense} from 'react';

export const routeHOC =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    return (
      <Suspense fallback={'loading...'}>
        <Component {...props} />
      </Suspense>
    );
  };
