import clsx from 'clsx';
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
    <div
      className={clsx(
        'bg-white p-1.5 rounded flex flex-col items-center h-16 min-w-[60px] flex-1',
        {
          'border border-gray-400': group,
          'border border-gray-300': !group,
        },
      )}
    >
      <span className="text-sm font-bold text-gray-500 uppercase font-mono">
        {wcaEvents[eventName]?.short}
      </span>
      {hasDistributedAttempts ? (
        group ? (
          <CheckIcon />
        ) : (
          <span className="text-xl font-black text-gray-500 leading-none py-1">
            {'-'}
          </span>
        )
      ) : (
        <span
          className={clsx('text-xl font-black leading-none py-1', {
            'text-gray-800': !!group,
            'text-gray-500': !group,
          })}
        >
          {group ?? '-'}
        </span>
      )}
    </div>
  );
}
