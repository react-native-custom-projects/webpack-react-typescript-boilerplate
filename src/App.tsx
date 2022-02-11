import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './ts/generic/ErrorBoundaryFallback';
//components
import LoadingIcon from './ts/components/shared/LoadingIcon';
const TestComponent = lazy(() => import('./ts/containers/testComponent/TestComponent'));

const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => {
      //Reset the state of your app so the error doesn't happen again
      console.log('Try again clicked');
    }}
  >
    <Suspense
      fallback={
        <div className="loader-wrapper">
          <LoadingIcon />
        </div>
      }
    >
      <h1 style={{ textAlign: 'center' }}>Webpack react boilerplate</h1>
      <TestComponent />
    </Suspense>
  </ErrorBoundary>
);

export default hot(App);
