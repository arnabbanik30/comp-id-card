import { CheckIcon } from 'lucide-react';
import type { WcaEventIdType } from '#/lib/wcif/events';
import { wcaEvents } from '#/lib/wcif/events';

type props = {
  eventName: WcaEventIdType;
  groupString: string | null;
};

export function OnlyGroupCell({ eventName, groupString }: props) {
  const group = groupString?.replace('g', '');
  const hasDistributedAttempts = ['333mbf', '333fm'].includes(eventName);
  return (
    <div className="bg-white border border-gray-200 p-1.5 rounded flex flex-col items-center h-16">
      <span className="text-sm font-bold text-gray-500 uppercase font-mono">
        {wcaEvents[eventName]?.short}
      </span>
      {hasDistributedAttempts ? (
        group ? (
          <CheckIcon />
        ) : (
          <span className="text-xl font-black text-gray-800 leading-none py-1">
            {'-'}
          </span>
        )
      ) : (
        <span className="text-xl font-black text-gray-800 leading-none py-1">
          {group ?? '-'}
        </span>
      )}
    </div>
  );
}
