import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return undefined;
  }
};

const saveToLocalStorage = (state: unknown) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
};

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
