import React, { useMemo } from 'react';
import {createContext, useContext, useReducer} from 'react';
import update from 'immutability-helper';
import {PayloadAction} from './utils';

export interface AppContextState {
  currentStack: 'home' | 'scanner' | 'claim' | 'settings';
  user?: Partial<any>;
  loading?: boolean;
}

export type AppContextAction = 'app.update' | 'app.reset';

export interface AppContextType {
  value: AppContextState;
  dispatch: (
    payload: Partial<
      PayloadAction<Partial<AppContextState>, AppContextAction>
    >,
  ) => void;
  currentStack: 'home' | 'scanner' | 'claim' | 'settings',
  isAuthorized: boolean;
}

const initialState: AppContextState = {
  currentStack: 'home',
  user: undefined,
  loading: true,
};

const reducer = (
  state: AppContextState,
  payload: Partial<
    PayloadAction<Partial<AppContextState>, AppContextAction>
  >,
) => {
  switch (payload.type) {
    case 'app.update':
      console.log("🚀 ~ file: AppContext.tsx:36 ~ payload.type:", payload.type)
      if (payload.payload) {
        console.log("🚀 ~ file: AppContext.tsx:38 ~ payload.payload:", payload.payload)
        return update(state, {
          $merge: payload.payload,
        });
      }
      return;
    case 'app.reset':
      return update(state, {
        $merge: initialState,
      });
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType>({
  value: initialState,
  dispatch: () => {},
  currentStack: 'home',
  isAuthorized: false,
});

export const useAppContext = () => {
  const context = useContext<AppContextType>(AppContext);
  if (!context) {
    throw new Error(
      'useAppContext must be used within a AppContextProvider',
    );
  }
  return context;
};

export const AppContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [value, dispatch] = useReducer(
    reducer,
    initialState,
    initialize => initialize,
  );

  const currentStack = useMemo(() => {
    if (!value.currentStack) return 'home';
    return value.currentStack;
  }, [value.currentStack]);

  const isAuthorized = useMemo(() => {
    if (!!value.user) return true;
    return false;
  }, [value.user])

  return (
    <AppContext.Provider
      value={{
        value,
        dispatch,
        currentStack,
        isAuthorized,
      }}>
      {children}
    </AppContext.Provider>
  );
};