import type { WcaEventIdType } from '../wcif/events';
import type { ActivityWCIF, CompetitionWCIF } from '../wcif/types';

function collectActivities(activities: ActivityWCIF[]): Record<string, string> {
  return activities.reduce<Record<string, string>>((acc, activity) => {
    if (activity.id != null && activity.activityCode != null) {
      acc[activity.id.toString()] = activity.activityCode;
    }
    if (activity.childActivities) {
      Object.assign(acc, collectActivities(activity.childActivities));
    }
    return acc;
  }, {});
}

export function getAllActivities(compData: CompetitionWCIF) {
  return (compData.schedule?.venues ?? []).reduce<Record<string, string>>(
    (acc, venue) => {
      (venue.rooms ?? []).forEach((room) => {
        Object.assign(acc, collectActivities(room.activities ?? []));
      });
      return acc;
    },
    {},
  );
}

export function getCompetitionEvents(compData: CompetitionWCIF) {
  return compData.events?.map((event) => event.id);
}

export function placeEventsAtEnd(
  events: WcaEventIdType[],
  competitionEvents: WcaEventIdType[] = [],
) {
  return [
    ...competitionEvents.filter((e) => !events.includes(e)),
    ...competitionEvents.filter((e) => events.includes(e)),
  ];
}
