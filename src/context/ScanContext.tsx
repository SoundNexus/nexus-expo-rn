import React, { useMemo } from 'react';
import {createContext, useContext, useReducer} from 'react';
import update from 'immutability-helper';
import {PayloadAction} from './utils';
import { Accounts } from '../api/apiTypes';

export interface ScanContextState {
  packageId?: string;
  tokenId?: string;
  contractAddress?: string;
  originalMetadata?: string;
  collectionName?: string;
  originalNFT?: any;
  previewNFT?: any;
  termsURI?: string;
}

export type ScanContextAction = 'scan.update' | 'scan.reset';

export interface ScanContextType {
  value: ScanContextState;
  dispatch: (
    payload: Partial<
      PayloadAction<Partial<ScanContextState>, ScanContextAction>
    >,
  ) => void;
}

const initialState: ScanContextState = {
  packageId: undefined,
  tokenId: undefined,
  contractAddress: undefined,
  collectionName: undefined,
  originalMetadata: undefined,
  originalNFT: undefined,
  previewNFT: undefined,
  termsURI: undefined,
};

const reducer = (
  state: ScanContextState,
  payload: Partial<
    PayloadAction<Partial<ScanContextState>, ScanContextAction>
  >,
) => {
  switch (payload.type) {
    case 'scan.update':
      if (payload.payload) {
        return update(state, {
          $merge: payload.payload,
        });
      }
      return;
    case 'scan.reset':
      return update(state, {
        $merge: initialState,
      });
    default:
      return state;
  }
};

const ScanContext = createContext<ScanContextType>({
  value: initialState,
  dispatch: () => {},
});

export const useScanContext = () => {
  const context = useContext<ScanContextType>(ScanContext);
  if (!context) {
    throw new Error(
      'useScanContext must be used within a ScanContextProvider',
    );
  }
  return context;
};

export const ScanContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [value, dispatch] = useReducer(
    reducer,
    initialState,
    initialize => initialize,
  );

  return (
    <ScanContext.Provider
      value={{
        value,
        dispatch,
      }}>
      {children}
    </ScanContext.Provider>
  );
};
