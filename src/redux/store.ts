import { LayoutLanguage } from '@/models/common';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth_slice';
import drawerReducer from './drawer_slice';
import coreReducer from './core/core-slice';
import legalEntitesSlice from './legal-entites-slice';

const savedLayoutLanguage = localStorage.getItem('currentLayoutLanguage');
const initialLayoutLanguage = savedLayoutLanguage
  ? (savedLayoutLanguage as LayoutLanguage)
  : LayoutLanguage.Azerbaijani;

const preloadedState = {
  core: {
    currentLayoutLanguage: initialLayoutLanguage
  }
};

export const store = configureStore({
  reducer: {
    user: authReducer,
    drawer: drawerReducer,
    core: coreReducer,
    legalEntites: legalEntitesSlice
  },
  preloadedState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
store.subscribe(() => {
  // Get the current state
  const state = store.getState();
  // Save the current layout language to localStorage
  localStorage.setItem(
    'currentLayoutLanguage',
    state?.core?.currentLayoutLanguage
  );
});
