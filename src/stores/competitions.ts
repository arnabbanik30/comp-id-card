import { Store } from '@tanstack/store';
import { createStorageHelper } from './utils';
import type { CompetitionType } from '#/lib/competitions/types';

type CompetitionsStoreType = {
  competitions?: Array<CompetitionType> | null;
  selectedCompId?: string | null;
};

const getCompetitionsStorageKey = (key: keyof CompetitionsStoreType) =>
  `comp-id-card-competitions-${key}`;

const getFromStorage = createStorageHelper<CompetitionsStoreType>(
  getCompetitionsStorageKey,
);

export const competitionsStore = new Store<CompetitionsStoreType>({
  competitions: getFromStorage(
    'competitions',
    null,
    true,
  ) as Array<CompetitionType>,
});

export function setCompetitionsStore(
  competitions: Array<CompetitionType> | null,
) {
  if (typeof window === 'undefined') {
    return null;
  }
  localStorage.setItem(
    getCompetitionsStorageKey('competitions'),
    JSON.stringify(competitions),
  );
  competitionsStore.setState((state) => ({ ...state, competitions }));
}
export function resetCompetitionsStore() {
  if (typeof window === 'undefined') {
    return null;
  }
  localStorage.removeItem(getCompetitionsStorageKey('competitions'));
  competitionsStore.setState((state) => ({ ...state, competitions: null }));
}

export function setSelectedCompId(selectedCompId: string) {
  competitionsStore.setState((state) => ({ ...state, selectedCompId }));
}
