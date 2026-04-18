// all api routes: https://github.com/thewca/worldcubeassociation.org/blob/805d6ddbff5d55bd8ec67f8477efc579b8212de5/WcaOnRails/config/routes.rb#L176-L200
// competitions controller(api): https://github.com/thewca/worldcubeassociation.org/blob/805d6ddbff5d55bd8ec67f8477efc579b8212de5/WcaOnRails/app/controllers/api/v0/competitions_controller.rb

import { wcaApiFetch } from '../utils';
import type { CompetitionType } from './types';
import {
  resetCompetitionsStore,
  setCompetitionsStore,
} from '#/stores/competitions';

export async function fetchMyManagedCompetitions() {
  const params = new URLSearchParams({
    managed_by_me: 'true',
  });

  const path = `/api/v0/competitions?${params.toString()}`;
  const data = await wcaApiFetch(path);

  return data as Array<CompetitionType>;
}

export async function setCompetitions() {
  const competitions = await fetchMyManagedCompetitions();
  setCompetitionsStore(competitions);
}
export function resetCompetitions() {
  resetCompetitionsStore();
}
