import { Store } from '@tanstack/store';
import { createStorageHelper } from './utils';
import type { CompetitionType } from '#/lib/competitions/types';
import type { CompetitionWCIF } from '#/lib/wcif/types';

type CompetitionsStoreType = {
  competitions?: Array<CompetitionType> | null;
  selectedCompId?: string | null;
  compDataWCIF?: CompetitionWCIF | null;
  wcaLiveQRCodeUrlBlob?: string | null;
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
  competitionsStore.setState(() => ({}));
}

export function setSelectedCompId(selectedCompId: string) {
  competitionsStore.setState((state) => ({ ...state, selectedCompId }));
}

export function setCompData(compDataWCIF: CompetitionWCIF) {
  competitionsStore.setState((state) => ({ ...state, compDataWCIF }));
}

export function setWcaLiveQRCodeURLBlob(wcaLiveQRCodeUrlBlob: string) {
  competitionsStore.setState((state) => ({ ...state, wcaLiveQRCodeUrlBlob }));
}
