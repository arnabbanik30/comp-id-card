import { OnlyGroupCell } from './OnlyGroupCell';
import type { PersonWCIF } from '#/lib/wcif/types';
import type { WcaEventIdType } from '#/lib/wcif/events';
import { wcaEvents } from '#/lib/wcif/events';

type props = {
  personInfo: Pick<PersonWCIF, 'assignments'>;
  allActivities: Record<string, string>;
};
export function GroupInfo({ personInfo, allActivities }: props) {
  const events = Object.keys(wcaEvents);

  const getGroupForEvent = (event: string) => {
    const assignments = personInfo.assignments;
    if (!assignments) {
      return null;
    }

    for (const assignment of assignments) {
      const activityCode = allActivities[assignment.activityId!];
      const tokens = activityCode.split('-');
      if (tokens.length !== 3) {
        continue;
      }

      if (event === tokens[0]) {
        return tokens[2];
      }
    }
    return null;
  };

  return (
    <>
      <div className="flex-grow p-2 grid grid-cols-4 gap-1.5">
        {events.slice(0, 12).map((event) => (
          <OnlyGroupCell
            key={event}
            eventName={event as WcaEventIdType}
            groupString={getGroupForEvent(event)}
          />
        ))}
      </div>
      <div className="flex-grow px-2 grid grid-cols-5 gap-1.5">
        {events.slice(-5).map((event) => (
          <OnlyGroupCell
            key={event}
            eventName={event as WcaEventIdType}
            groupString={getGroupForEvent(event)}
          />
        ))}
      </div>
    </>
  );
}
