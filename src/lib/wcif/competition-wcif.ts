import { wcaApiFetch } from '../utils';
import type { CompetitionWCIF } from './types';

export async function getCompetitionWCIF(competitionId: string) {
  const path = `/api/v0/competitions/${competitionId}/wcif`;

  const data = await wcaApiFetch(path);

  return data as CompetitionWCIF;
}
