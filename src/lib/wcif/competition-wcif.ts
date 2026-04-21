import { wcaApiFetch } from '../utils';
import type { CompetitionWCIF } from './types';
import { setCompData } from '#/stores/competitions';

export async function getCompetitionWCIF(competitionId: string) {
  const path = `/api/v0/competitions/${competitionId}/wcif`;

  const data = (await wcaApiFetch(path)) as CompetitionWCIF;
  setCompData(data);

  return data;
}
