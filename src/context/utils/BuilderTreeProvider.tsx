import React from 'react';
import { AppContextProvider } from '../AppContext';
import { ScanContextProvider } from '../ScanContext';

const BuildProviderTree = (providers: Array<any>): any => {
  if (providers.length === 1) {
    return providers[0];
  }
  const A = providers.shift();
  const B = providers.shift();
  return BuildProviderTree([
    ({ children }: { children: any }) => (
      <A>
        <B>{children}</B>
      </A>
    ),
    ...providers,
  ]);
};

export const BuilderProviders = BuildProviderTree([
  AppContextProvider,
  ScanContextProvider,
]);
