import { wcaApiFetch } from '../utils';
import type { CompetitionWCIF } from './types';
import { setCompData, setWcaLiveQRCodeURLBlob } from '#/stores/competitions';

export async function getCompetitionWCIF(competitionId: string) {
  const path = `/api/v0/competitions/${competitionId}/wcif`;

  const data = (await wcaApiFetch(path)) as CompetitionWCIF;
  setCompData(data);

  await getWCALiveQRCode(competitionId);
  return data;
}

async function getWCALiveQRCode(competitionId: string) {
  const data = `https://live.worldcubeassociation.org/link/competitions/${competitionId}`;
  const params = new URLSearchParams({
    size: '150x150',
    data,
  });
  const url = `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  const res = await fetch(url);
  const blobUrl = URL.createObjectURL(await res.blob());
  setWcaLiveQRCodeURLBlob(blobUrl);
}
