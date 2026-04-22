export const WcaEventIds = [
  '333',
  '222',
  '444',
  '555',
  '666',
  '777',
  '333bf',
  '333fm',
  '333oh',
  'clock',
  'minx',
  'pyram',
  'skewb',
  'sq1',
  '444bf',
  '555bf',
  '333mbf',
  '333ft',
  'magic',
  'mmagic',
  '333mbo',
] as const;

export type WcaEventIdType = (typeof WcaEventIds)[number];

type EventType = {
  [key in WcaEventIdType]: {
    short?: string;
    full?: string;
    customName?: string;
  };
};

export const wcaEvents: Partial<EventType> = {
  '333': { short: '3x3' },
  '222': { short: '2x2' },
  '444': { short: '4x4' },
  '555': { short: '5x5' },
  '666': { short: '6x6' },
  '777': { short: '7x7' },
  '333oh': { short: 'OH' },
  clock: { short: 'Clock' },
  minx: { short: 'Mega' },
  pyram: { short: 'Pyra' },
  skewb: { short: 'Skewb' },
  sq1: { short: 'SQ-1' },
  '333bf': { short: '3BLD' },
  '444bf': { short: '4BLD' },
  '555bf': { short: '5BLD' },
  '333mbf': { short: 'MBLD' },
  '333fm': { short: 'FMC' },
};
