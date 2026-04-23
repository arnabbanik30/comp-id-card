import { OnlyGroupCell } from './OnlyGroupCell';
import type { PersonWCIF } from '#/lib/wcif/types';
import type { WcaEventIdType } from '#/lib/wcif/events';

function getRowSizes(total: number): number[] {
  if (total < 4) {
    return [total];
  }
  if (total === 4) {
    return [2, 2];
  }
  if (total === 5) {
    return [3, 2];
  }
  if (total === 6) {
    return [2, 2, 2];
  }
  if (total === 8) {
    return [2, 2, 2, 2];
  }
  if (total === 9) {
    return [3, 3, 3];
  }

  const remainder = total % 4;
  const fullRows = Math.floor(total / 4);

  if (remainder === 0) {
    return Array(fullRows).fill(4);
  }
  if (remainder === 1) {
    return [...Array(fullRows - 1).fill(4), 5];
  }
  return [...Array(fullRows).fill(4), remainder];
}

function EventRows({
  events,
  getGroupForEvent,
}: {
  events: Array<WcaEventIdType>;
  getGroupForEvent: (event: string) => string | null;
}) {
  const rowSizes = getRowSizes(events.length);
  let offset = 0;
  return (
    <div className="flex-grow p-2 flex flex-col gap-1">
      {rowSizes.map((size, rowIndex) => {
        const chunk = events.slice(offset, offset + size);
        offset += size;
        return (
          <div
            key={rowIndex}
            className="flex gap-1"
          >
            {chunk.map((event) => (
              <OnlyGroupCell
                key={event}
                eventName={event}
                groupString={getGroupForEvent(event)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

type props = {
  personInfo: Pick<PersonWCIF, 'assignments'>;
  eventsInfo: Array<WcaEventIdType>;
  allActivities: Record<string, string>;
};
export function GroupInfo({ personInfo, eventsInfo, allActivities }: props) {
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
    <EventRows
      events={eventsInfo}
      getGroupForEvent={getGroupForEvent}
    />
  );
}
