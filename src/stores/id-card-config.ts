import { createStore } from '@tanstack/react-store';

export type IdCardConfigStoreType = {
  header?: {
    compDate?: string;
    venueName?: string;
  };
};

export const idCardConfigStore = createStore<IdCardConfigStoreType>({});
